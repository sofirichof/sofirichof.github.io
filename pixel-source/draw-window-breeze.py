"""A staggered breeze through six leaf clusters, with repaired sky underneath.

This edits only registered animation frames. The frozen room and extracted
source layer remain unchanged. Coordinates describe the 640 x 400 room grid.
"""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/room-animation'
OUT.mkdir(exist_ok=True)
grid = Image.open(ROOT / 'pixel-source/room-grid.png').convert('RGBA')
source = Image.open(ROOT / 'assets/room-layers/outside-night.png').convert('RGBA')
origin = (524, 0)

# Deliberate silhouettes: leave the joining stems at y=88 and y=86 anchored.
left_rows = {81:(599,599), 82:(598,599), 83:(597,599), 84:(597,599),
             85:(598,599), 86:(595,599), 87:(596,599)}
right_rows = {80:(604,604), 81:(604,604), 82:(603,603), 83:(603,603),
              84:(602,603), 85:(601,602)}
def points(rows):
    return [(x,y) for y,(first,last) in rows.items() for x in range(first,last+1)]
def dark_points(rows):
    return [p for p in points(rows) if grid.getpixel(p)[2]<70 and grid.getpixel(p)[1]<45]
leaves = [
    {'name':'Lower left tip','points':points(left_rows),'tip':'above','line':84,'anchor':(598,88),'delay':2},
    {'name':'Lower right tip','points':points(right_rows),'tip':'above','line':83,'anchor':(601,86),'delay':3},
    {'name':'Upper hanging leaves','points':dark_points({8:(593,597),9:(593,597),10:(592,594)}),'tip':'below','line':9,'anchor':(595,7),'delay':0},
    {'name':'Middle hanging leaves','points':dark_points({39:(592,594),40:(592,594),41:(592,594),42:(593,594),43:(593,594)}),'tip':'below','line':41,'anchor':(593,38),'delay':1},
    {'name':'Lower hanging leaves','points':dark_points({56:(609,612),57:(609,612),58:(609,612),59:(608,612),60:(608,609),61:(608,608)}),'tip':'below','line':58,'anchor':(611,55),'delay':2},
    {'name':'Left pane leaves','points':dark_points({85:(556,560),86:(556,560),87:(556,560),88:(557,560),89:(557,559)}),'tip':'below','line':87,'anchor':(558,84),'delay':4},
]
all_points = {p for leaf in leaves for p in leaf['points']}

# Reconstruct the hidden sky from nearby sky samples in the same pane, never
# from a dark branch or a window-frame pixel. The repair stays under the leaf.
sky = [(x,y) for y in range(0,104) for x in [*range(527,570),*range(588,628)]
       if (x,y) not in all_points and grid.getpixel((x,y))[2] > 80
       and grid.getpixel((x,y))[1] > 30]
under = source.copy()
for x,y in all_points:
    same_pane=[p for p in sky if (p[0]<575)==(x<575) and (p[1]<65)==(y<65)]
    sample = min(same_pane, key=lambda p: (p[0]-x)**2 + 2*(p[1]-y)**2)
    under.putpixel((x-origin[0],y-origin[1]),grid.getpixel(sample))
under.save(OUT / 'window-breeze-underpainting.png')

# Poses gradually flex from the anchored stems; the six clusters respond at
# different moments. Partial bends move the furthest tips first.
wave=[0,1,2,2,1,0,1,0]
poses=[[wave[i-leaf['delay']] if 0<=i-leaf['delay']<len(wave) else 0 for leaf in leaves] for i in range(13)]
durations=[380,170,190,240,250,230,240,210,200,240,250,260,400]
names=['Still','Upper leaves catch','Breeze moves down','Several clusters stir','Through the window',
       'Left pane catches','A soft gust','Upper leaves settle','Lower leaves follow',
       'Last little stir','Left pane settles','Quiet again','Still again']
frames, records = [], []
allowed = all_points | {(x+1,y) for x,y in all_points}
for i,bends in enumerate(poses):
    frame = source.copy() if not any(bends) else under.copy()
    if any(bends):
        for leaf,bend in zip(leaves,bends):
            for x,y in leaf['points']:
                tip = y<=leaf['line'] if leaf['tip']=='above' else y>=leaf['line']
                dx = 1 if bend == 2 or (bend == 1 and tip) else 0
                frame.putpixel((x-origin[0]+dx,y-origin[1]),grid.getpixel((x,y)))
    assert frame.getchannel('A').tobytes() == source.getchannel('A').tobytes()
    changes = [(j%source.width,j//source.width) for j,(p,q) in enumerate(zip(frame.getdata(),source.getdata())) if p!=q]
    assert all((x+origin[0],y) in allowed for x,y in changes)
    for leaf in leaves:
        x,y=leaf['anchor'];assert frame.getpixel((x-origin[0],y))==source.getpixel((x-origin[0],y))
    frames.append(frame)
    records.append({'name':names[i], 'duration':durations[i], 'changedPixels':len(changes)})
assert frames[0].tobytes() == frames[-1].tobytes() == source.tobytes()
sheet = Image.new('RGBA',(source.width*len(frames),source.height))
for i,frame in enumerate(frames):sheet.paste(frame,(i*source.width,0))
sheet.save(OUT/'window-breeze.png')
(OUT/'window-breeze.json').write_text(json.dumps({
    'layer':'outside-night','sheet':'window-breeze.png',
    'width':source.width,'height':source.height,'frames':records,
    'detail':{'x':524,'y':0,'width':116,'height':108},'detailScale':2,
    'duration':sum(durations),'sourceUnchanged':True,
    'underpainting':'window-breeze-underpainting.png',
    'maximumTipDisplacement':1,'anchoredStems':[leaf['anchor'] for leaf in leaves],
    'clusters':[{'name':leaf['name'],'points':leaf['points'],'anchor':leaf['anchor']} for leaf in leaves],
},indent=2)+'\n')
print(f'{len(frames)} frames · {sum(durations)} ms · changed pixels: {[r["changedPixels"] for r in records]}')
