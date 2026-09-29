"""Author a tiny, registered tin reflection using only the heart's own palette.

Coordinates below are deliberately selected metal ridges, in the 23 x 35 sprite.
Nothing is resampled, translated or painted outside the existing silhouette.
Run from any directory with Python + Pillow. The approved source is read-only.
"""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/room-animation'
OUT.mkdir(exist_ok=True)
source = Image.open(ROOT / 'assets/room-layers/heart-large.png').convert('RGBA')

# Follow the raised left lobe toward the lower central ridge. Dark engraved
# recesses between these groups are intentionally untouched.
ridges = [
    [(5, 13), (6, 13), (7, 13), (4, 14), (5, 14), (6, 14), (7, 14)],
    [(5, 15), (6, 15), (7, 15), (4, 16), (5, 16), (6, 16), (7, 16), (8, 16)],
    [(5, 17), (6, 17), (7, 17), (7, 18), (8, 18), (7, 19), (8, 19)],
    [(8, 20), (9, 20), (10, 20), (9, 21), (10, 21), (10, 22)],
    [(9, 23), (10, 23), (11, 23), (10, 24), (11, 24), (10, 25), (11, 25)],
    [(10, 26), (11, 26), (10, 27), (11, 27), (11, 28), (12, 28)],
]
weights = [
    [0, 0, 0, 0, 0, 0],
    [.65, .15, 0, 0, 0, 0],
    [.4, 1, .2, 0, 0, 0],
    [.1, .45, 1, .2, 0, 0],
    [0, .1, .45, 1, .2, 0],
    [0, 0, .1, .4, .85, .25],
    [0, 0, 0, .1, .3, .55],
    [0, 0, 0, 0, .1, .15],
    [0, 0, 0, 0, 0, 0],
]
durations = [260, 160, 140, 160, 180, 180, 220, 240, 260]
names = ['Still', 'Light catches', 'Upper ridge', 'Left lobe', 'Across the metal',
         'Lower ridge', 'Softens', 'Fades', 'Still again']
palette = sorted(set(p[:3] for p in source.getdata() if p[3] and max(p[:3])-min(p[:3]) < 65))
frames, records = [], []
for index, strengths in enumerate(weights):
    frame = source.copy()
    for points, strength in zip(ridges, strengths):
        if not strength:
            continue
        for point in points:
            r, g, b, a = source.getpixel(point)
            assert a == 255, point
            # Preserve dark engraving and cap changes to warm, existing metal.
            if (r + g + b) / 3 < 42:
                continue
            lift = 58 * strength
            target = (min(231, r + lift), min(224, g + lift * .94), min(207, b + lift * .83))
            color = min(palette, key=lambda p: sum((p[c]-target[c])**2 for c in range(3)))
            frame.putpixel(point, (*color, a))
    changed = sum(a != b for a, b in zip(source.getdata(), frame.getdata()))
    assert frame.getchannel('A').tobytes() == source.getchannel('A').tobytes()
    frames.append(frame)
    records.append({'name': names[index], 'duration': durations[index], 'changedPixels': changed})

assert frames[0].tobytes() == frames[-1].tobytes() == source.tobytes()
sheet = Image.new('RGBA', (source.width * len(frames), source.height))
for index, frame in enumerate(frames):
    sheet.paste(frame, (index * source.width, 0))
sheet.save(OUT / 'heart-reflection.png')
(OUT / 'heart-reflection.json').write_text(json.dumps({
    'layer': 'heart-large', 'sheet': 'heart-reflection.png',
    'width': source.width, 'height': source.height, 'frames': records,
    'detail': {'x': 351, 'y': 24, 'width': 36, 'height': 46},
    'duration': sum(durations), 'sourceUnchanged': True,
}, indent=2) + '\n')
print(f'{len(frames)} frames · {sum(durations)} ms · changed pixels: {[r["changedPixels"] for r in records]}')
