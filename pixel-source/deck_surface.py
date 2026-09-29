"""Restore the inset deck without painting over the walnut frame.

Lighting coefficients are fitted to unobstructed patches of the approved source.
Grain is copied from its clear right-hand strip. The source image is never edited.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageChops

# Constant, horizontal, vertical, and cross terms, one coefficient per RGB channel.
LIGHT = (
    (32.1511492936, 24.3661139823, 17.8683967682),
    (11.8426803371, 5.9931257370, 1.9482277971),
    (2.3058503273, 1.4596028929, .7029584105),
    (-.2947616701, -.9745648671, -1.4576055413),
)


def lighting(x, y):
    u, v = (x - 210) / 125, (y - 175) / 95
    return tuple(LIGHT[0][c] + LIGHT[1][c]*u + LIGHT[2][c]*v + LIGHT[3][c]*u*v for c in range(3))


def rebuild_deck(source, bearing_source):
    source = source.convert('RGB')
    original = source.load()
    fill = Image.new('RGB', source.size)
    pixels = fill.load()
    for y in range(84, 271):
        for x in range(86, 339):
            # Reflected blocks keep the real grain while avoiding straight tile seams.
            sy = 156 + ((y//16*19 + x//16*13) % 5)*16 + (15-y % 16 if x//16 % 2 else y % 16)
            sx = 319 + (15-x % 16 if y//16 % 2 else x % 16)
            level, donor_level = lighting(x, y), lighting(sx, sy)
            donor = original[sx, sy]
            pixels[x, y] = tuple(int(max(0, min(255, level[c] + donor[c] - donor_level[c]))) for c in range(3))

    hidden = Image.new('L', source.size)
    draw = ImageDraw.Draw(hidden)
    draw.ellipse((77, 72, 292, 278), fill=255)
    draw.line([(307,119),(303,134),(301,170),(300,183),(296,195),(286,208),(269,224),(241,247)], fill=255, width=24)
    draw.polygon([(307,134),(320,176),(319,201),(302,229),(281,248),(256,262),(237,254),(267,223),(288,199),(295,164)], fill=255)
    hidden = hidden.filter(ImageFilter.GaussianBlur(2.2))

    fixtures = Image.new('L', source.size)
    draw = ImageDraw.Draw(fixtures)
    draw.ellipse((283,102,329,147), fill=255)
    draw.polygon([(298,124),(300,100),(302,88),(309,83),(317,85),(319,93),(313,112),(313,124)], fill=255)
    draw.ellipse((85,249,102,269), fill=255)
    draw.rectangle((253,253,284,265), fill=255)
    draw.rectangle((300,252,335,265), fill=255)
    for x, y in [(91,88),(334,88),(87,267),(334,267)]:
        draw.ellipse((x-3,y-3,x+3,y+3), fill=255)
    fixtures = fixtures.filter(ImageFilter.GaussianBlur(1.2))
    shaft = Image.new('L', source.size)
    ImageDraw.Draw(shaft).line([(305,127),(302,138),(301,149)], fill=255, width=9)
    fixtures = ImageChops.subtract(fixtures, shaft)

    interior = Image.new('L', source.size)
    ImageDraw.Draw(interior).rectangle((86,84,338,270), fill=255)
    repair = ImageChops.multiply(ImageChops.subtract(hidden, fixtures), interior)
    base = Image.composite(fill, source, repair)

    # Keep the established repair at the bearing; neither the disc nor arm changes.
    bearing = Image.new('L', source.size)
    draw = ImageDraw.Draw(bearing)
    draw.ellipse((283,102,333,149), fill=255)
    draw.rectangle((296,84,321,111), fill=255)
    bearing = bearing.filter(ImageFilter.GaussianBlur(1))
    bounds = Image.new('L', source.size)
    ImageDraw.Draw(bounds).rectangle((286,84,336,148), fill=255)
    bearing = ImageChops.multiply(bearing, bounds)
    base = Image.composite(bearing_source.convert('RGB'), base, bearing)

    # The old disc projected across these few pixels of the inset border.
    pixels = base.load()
    for y in range(78,84):
        for x in range(138,231):
            pixels[x,y] = original[111 + x % 19, y]
    for y in range(122,227):
        pixels[85,y] = original[85,108 + y % 6]
    base = base.convert('RGBA')
    base.putalpha(bearing_source.getchannel('A'))
    return base
