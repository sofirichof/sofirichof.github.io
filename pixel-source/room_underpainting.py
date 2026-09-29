"""Reconstruct concealed plaster and wood on the room's original pixel grid.

Only prepared object footprints and their contact-shadow margins are repainted.
Original contact patches cover the repairs in the parked composition. These are
texture-backed reconstructions, not claims about unseen parts of the reference.
"""
import numpy as np
from PIL import Image, ImageFilter, ImageChops

PREPARED = {
    'heart-large': ('plaster-wall', 6),
    'heart-small': ('plaster-wall', 5),
    'heart-lower': ('plaster-wall', 5),
    'photo-album': ('coffee-table', 13),
}


def prepare_contacts(specs, masks, owned):
    """Partition nearby contact pixels; never take another object's silhouette."""
    index = {s['id']: i for i, s in enumerate(specs)}
    distance = {}
    for key, (parent, radius) in PREPARED.items():
        silhouette = owned[index[key]]
        permitted = ImageChops.lighter(owned[index[parent]], silhouette)
        steps = np.full((400, 640), 99, dtype=np.uint8)
        for n in range(radius, -1, -1):
            expanded = silhouette.filter(ImageFilter.MaxFilter(2*n+1)) if n else silhouette
            steps[(np.asarray(expanded) > 0) & (np.asarray(permitted) > 0)] = n
        if key == 'photo-album':
            # Stop at the tabletop's front lip, which belongs to the furniture.
            steps[392:] = 99
        distance[key] = steps
    keys = list(PREPARED)
    distances = np.stack([distance[key] for key in keys])
    winner = np.argmin(distances, axis=0)
    patches = {}
    for n, key in enumerate(keys):
        patches[key] = Image.fromarray(((winner == n) & (distances[n] < 99)).astype('uint8')*255)
    return patches, distance


def repair_surfaces(source, owned_by_id, patches, distances):
    rgb = np.asarray(source.convert('RGB')).astype(float)
    blur = np.asarray(source.convert('RGB').filter(ImageFilter.GaussianBlur(2))).astype(float)
    yy, xx = np.indices(rgb.shape[:2])
    all_patches = np.any(np.stack([np.asarray(p) > 0 for p in patches.values()]), axis=0)
    repairs = {}
    for key, patch in patches.items():
        parent, radius = PREPARED[key]
        active = np.asarray(patch) > 0
        x0, y0, x1, y1 = patch.getbbox()
        result = rgb.copy()
        if parent == 'plaster-wall':
            # Fit surrounding visible plaster lighting, then reuse native grain.
            vicinity = (xx >= x0-14) & (xx < x1+14) & (yy >= y0-14) & (yy < y1+14)
            available = vicinity & (np.asarray(owned_by_id[parent]) > 0) & ~all_patches
            design = np.column_stack((np.ones(available.sum()), xx[available]-x0, yy[available]-y0))
            values = rgb[available]
            # Reject dark leftover ornament shadows before estimating the wall.
            coeff = np.linalg.lstsq(design, values, rcond=None)[0]
            residual = np.linalg.norm(values - np.einsum('ij,jk->ik', design, coeff), axis=1)
            keep = residual <= np.quantile(residual, .8)
            coeff = np.linalg.lstsq(design[keep], values[keep], rcond=None)[0]
            field = np.einsum('ijk,kl->ijl', np.stack((np.ones_like(xx), xx-x0, yy-y0), axis=-1), coeff)
            dx = 318 + ((xx-x0) % 25)
            dy = 22 + ((yy-y0) % 51)
            grain = rgb[dy, dx] - blur[dy, dx]
            result[active] = (field + grain*.85)[active]
        else:
            # Wood grain follows the same horizontal rows as the uncovered table.
            # Estimate the broad light gradient without borrowing the coaster's
            # bright rim (which would produce an artificial stripe across wood).
            allowed = (np.asarray(owned_by_id[parent]) > 0) & ~all_patches
            bare = allowed & (xx >= 248) & (xx < 433) & (yy >= 336) & (yy < 389)
            bare &= ~((xx >= 399) & (yy >= 351) & (yy <= 382))
            design = np.column_stack((np.ones(bare.sum()), xx[bare]-x0, yy[bare]-y0))
            coeff = np.linalg.lstsq(design, rgb[bare], rcond=None)[0]
            slope = np.clip(coeff[1], -.12, .12)
            for y in range(y0, y1):
                xs = np.flatnonzero(active[y])
                if not len(xs):
                    continue
                left, right = int(xs[0]), int(xs[-1])
                a = np.flatnonzero(allowed[y] & (xx[y] < left))[-12:]
                b = np.flatnonzero(allowed[y] & (xx[y] > right))[:12]
                if not len(a): a = b
                if not len(b): b = a
                if not len(a):
                    raise ValueError(f'Missing exposed table pixels on row {y}')
                lc = np.median(rgb[y, a], axis=0)
                field = lc[None, :] + (xs-np.mean(a))[:, None]*slope[None, :]
                # Reflect a clean strip of grain to avoid a hard tiled seam.
                strip = np.concatenate((rgb[y, a], rgb[y, a][::-1]))
                grain = strip[(xs-left) % len(strip)] - np.mean(strip, axis=0)
                result[y, xs] = field + grain*.7
        # Feather only the outside contact margin, keeping object pixels absent.
        weight = np.clip((radius + 1 - distances[key].astype(float))/3, 0, 1)
        if key == 'photo-album':
            weight *= np.clip((392-yy)/2, 0, 1)
        result = rgb*(1-weight[..., None]) + result*weight[..., None]
        rgba = np.dstack((np.clip(np.rint(result), 0, 255).astype('uint8'), np.asarray(patch)))
        repairs[key] = Image.fromarray(rgba)
    return repairs
