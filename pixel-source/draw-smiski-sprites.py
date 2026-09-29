"""Author small, editable pixel drawings for optional Smiski room guests.

The deliverable is a palette and literal pixel rows consumed by Canvas. No
room image is modified. Pose references: https://smiski.com/e/products/series-1/
"""
from pathlib import Path
import json
import math
from contextlib import contextmanager

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/room-guests'
OUT.mkdir(exist_ok=True)
PALETTE={'.':'#00000000','o':'#5c7049','s':'#879a60','g':'#b0c582',
         'l':'#d1dfa1','h':'#e3eac0','e':'#46543b','c':'#28302755',
         'p':'#77984e','q':'#a1bf71','r':'#506f40'}

class Pixels:
    def __init__(self,w,h):
        self.w=w;self.h=h;self.rows=[['.']*w for _ in range(h)]
        self.normals=[[[0,0,4] for _ in range(w)] for _ in range(h)]
        self.offset=(0,0)
    def dot(self,x,y,color,normal=None):
        x+=self.offset[0];y+=self.offset[1]
        if 0<=x<self.w and 0<=y<self.h:
            self.rows[y][x]=color
            if normal is not None:self.normals[y][x]=[round(n*4) for n in normal]
    @contextmanager
    def at(self,x=0,y=0):
        previous=self.offset;self.offset=(previous[0]+x,previous[1]+y)
        try:yield self
        finally:self.offset=previous
    def oval(self,box,light=True,color=None):
        x0,y0,x1,y1=box;cx=(x0+x1)/2;cy=(y0+y1)/2;rx=(x1-x0+1)/2;ry=(y1-y0+1)/2
        for y in range(y0,y1+1):
            for x in range(x0,x1+1):
                dx=(x-cx)/rx;dy=(y-cy)/ry;r=dx*dx+dy*dy
                if r<=1:
                    shade='o' if r>.82 and (dx>.1 or dy>.3) else ('s' if dx>.4 or dy>.65 else ('h' if light and dx<.15 and dy<-.48 else ('l' if light and dx<.35 and dy<.2 else 'g')))
                    self.dot(x,y,color or shade,(dx,dy,math.sqrt(max(0,1-r))))
    def limb(self,a,b,width=3):
        steps=max(abs(b[0]-a[0]),abs(b[1]-a[1]))+1
        for i in range(steps):
            t=i/max(1,steps-1);x=round(a[0]+(b[0]-a[0])*t);y=round(a[1]+(b[1]-a[1])*t)
            self.oval((x-width//2,y-width//2,x+width//2,y+width//2),light=False)
    def stroke(self,a,b,color):
        steps=max(abs(b[0]-a[0]),abs(b[1]-a[1]))+1
        for i in range(steps):
            t=i/max(1,steps-1);self.dot(round(a[0]+(b[0]-a[0])*t),round(a[1]+(b[1]-a[1])*t),color)
    def face(self,eyes,mouth,sleep=False):
        for x,y in eyes:
            self.dot(x,y,'e')
            if sleep:self.dot(x+1,y,'e')
        self.dot(*mouth,'e');self.dot(mouth[0]+1,mouth[1],'s')
    def polygon(self,vertices,color):
        # Integer scan-line fill: no softened edges or resizing.
        for y in range(min(p[1] for p in vertices),max(p[1] for p in vertices)+1):
            crossings=[]
            for a,b in zip(vertices,vertices[1:]+vertices[:1]):
                if min(a[1],b[1])<=y<max(a[1],b[1]):
                    crossings.append(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))
            crossings.sort()
            for left,right in zip(crossings[::2],crossings[1::2]):
                for x in range(round(left),round(right)+1):self.dot(x,y,color)
    def export(self):return [''.join(row) for row in self.rows]

def draw_sitting(swing=0,blink=False):
    sitting=Pixels(19,27)
    sitting.oval((3,17,16,19),color='c')
    sitting.limb((6,12),(3,19),3);sitting.limb((12,12),(16,19),3)
    sitting.oval((5,11,13,20))
    sitting.limb((7,18),(7+swing,24),3);sitting.limb((12,18),(12-swing,24),3)
    sitting.oval((5+swing,23,8+swing,25));sitting.oval((11-swing,23,14-swing,25))
    sitting.oval((3,0,15,12));sitting.face([(7,7),(12,7)],(10,10),sleep=blink)
    return sitting

def draw_peeking(peek=0,blink=False):
    peeking=Pixels(21,28)
    peeking.oval((6,25,20,27),color='c')
    peeking.limb((10,20),(9,25),3);peeking.limb((15,20),(17,25),3)
    peeking.oval((7,11,16,22));peeking.limb((14,13),(18,16),3)
    peeking.limb((10,14),(5,18),3)
    with peeking.at(peek,0):
        peeking.oval((4,0,17,12));peeking.face([(11,7),(15,7)],(14,10),sleep=blink)
    peeking.oval((17,15,20,18));peeking.dot(18,16,'h')
    return peeking

def draw_lounging(breath=0):
    lounging=Pixels(30,17)
    lounging.oval((1,14,28,16),color='c')
    lounging.oval((10,6-breath,23,14));lounging.limb((21,10),(27,13),3)
    lounging.limb((20,13),(27,14),3);lounging.oval((23,7,27,12))
    lounging.limb((12,11),(17,14),3)
    lounging.oval((1,0,13,12));lounging.face([(4,7),(9,7)],(7,10),sleep=True)
    lounging.limb((3,13),(12,13),3)
    return lounging

def draw_researching(tap=0,nod=0,blink=False):
    researching=Pixels(29,29)
    researching.oval((3,25,25,28),color='c')
    researching.oval((12,12,22,23));researching.limb((16,22),(10,25),3)
    researching.limb((21,22),(17,26),3)
    researching.oval((7,24,12,27));researching.oval((14,25,20,27))
    with researching.at(0,nod):
        researching.oval((10,0,24,13));researching.face([(16,9),(21,9)],(19,12),sleep=blink)
    researching.polygon([(3,21),(17,20),(25,23),(7,24)],'r')
    researching.polygon([(4,21),(17,21),(23,23),(7,23)],'q')
    researching.polygon([(1,11),(15,11),(18,22),(4,22)],'r')
    researching.polygon([(2,12),(14,12),(17,21),(5,21)],'p')
    researching.oval((8,15,10,17),color='l')
    researching.limb((23,17),(20,20-tap),3);researching.oval((17,19-tap,22,21-tap))
    return researching

def draw_sleeping(nod=0):
    sleeping=Pixels(22,31)
    sleeping.oval((3,17,17,19),color='c')
    sleeping.limb((7,20),(7,28),3);sleeping.limb((13,20),(13,28),3)
    sleeping.oval((5,14,15,23))
    with sleeping.at(0,nod):
        sleeping.oval((4,2,17,15))
        sleeping.oval((4,0,17,6),color='p');sleeping.oval((5,1,15,4),color='q')
        for x in range(5,17):sleeping.dot(x,6,'r')
        sleeping.oval((17,3,20,6),color='p')
        sleeping.face([(7,11),(13,11)],(11,14),sleep=True)
    sleeping.oval((3,16,12,19));sleeping.oval((10,16,18,19))
    return sleeping

def draw_upside(turn=0,blink=False):
    upside=Pixels(21,32)
    upside.oval((4,0,17,2),color='c')
    upside.limb((7,2),(8,11),3);upside.limb((13,2),(13,11),3)
    upside.oval((5,0,8,5));upside.oval((12,0,15,5))
    upside.oval((6,8,15,20));upside.limb((7,14),(3,23),3)
    upside.limb((15,14),(18,23),3)
    with upside.at(turn,0):
        upside.oval((3,17,17,31));upside.face([(7,25),(13,25)],(10,22),sleep=blink)
    return upside

def draw_lotus(breath=0):
    lotus=Pixels(27,27)
    lotus.oval((2,23,24,26),color='c')
    lotus.oval((8,12+breath,18,22));lotus.oval((3,20,15,24));lotus.oval((12,20,24,24))
    lotus.limb((9,14),(5,20),3);lotus.limb((17,14),(22,20),3)
    lotus.oval((2,19,6,22));lotus.oval((21,19,25,22))
    lotus.oval((7,22,19,25));lotus.dot(12,23,'s');lotus.dot(13,24,'s')
    with lotus.at(0,breath):
        lotus.oval((6,0,20,14));lotus.face([(9,9),(15,9)],(12,12),sleep=True)
    return lotus

def draw_ship(balance=0,blink=False):
    ship=Pixels(32,28)
    ship.oval((4,24,28,27),color='c')
    ship.limb((12,18),(17,24),5);ship.oval((9,17,19,24))
    ship.limb((17,23),(25,17-balance),4);ship.limb((20,22),(29,13-balance),4)
    ship.oval((24,13-balance,27,18-balance));ship.oval((27,10-balance,31,15-balance))
    ship.limb((9,15),(18,17),3);ship.limb((17,17),(26,13-balance),3)
    with ship.at(-balance,-balance):
        ship.oval((2,1,16,15));ship.face([(7,9),(12,8)],(10,12),sleep=blink)
    return ship

def draw_presenting(point=0,nod=0,blink=False):
    presenting=Pixels(35,36)
    presenting.oval((10,32,30,35),color='c')
    presenting.limb((19,24),(17,31),3);presenting.limb((24,24),(26,31),3)
    presenting.oval((13,30,20,33));presenting.oval((23,30,29,33))
    presenting.oval((16,13,27,26));presenting.limb((18,16),(10,12),3)
    presenting.oval((8,9,12,13));presenting.limb((26,17),(29,23),3)
    presenting.polygon([(23,21),(31,18),(34,28),(26,31)],'r')
    presenting.polygon([(24,22),(30,20),(32,27),(27,29)],'p')
    presenting.stroke((25,23),(29,22),'q');presenting.oval((27,22,31,25))
    with presenting.at(-nod,nod):
        presenting.oval((13,0,28,14));presenting.face([(17,8),(23,8)],(20,11),sleep=blink)
    presenting_wide=Pixels(61,36)
    presenting_wide.stroke((2,point),(38,13),'q')
    for y,row in enumerate(presenting.rows):
        for x,key in enumerate(row):
            if key!='.':presenting_wide.dot(x+26,y,key,[n/4 for n in presenting.normals[y][x]])
    presenting=presenting_wide
    return presenting

def draw_bowl(duck=0,blink=False):
    bowl=Pixels(27,29)
    bowl.oval((7,14+duck,21,28));bowl.limb((9,17+duck),(4,21),3)
    bowl.limb((20,17+duck),(24,21),3)
    with bowl.at(0,duck):
        bowl.oval((5,0,21,15));bowl.face([(10,9),(16,9)],(13,12),sleep=blink)
    bowl.oval((2,21,6,25));bowl.oval((21,21,25,25))
    return bowl

def draw_chair(swing=0,blink=False):
    chair=Pixels(28,35)
    chair.oval((4,23,24,27),color='c');chair.oval((8,12,21,25))
    chair.limb((11,24),(10+swing,30),4);chair.limb((19,24),(20-swing,30),4)
    chair.oval((7+swing,29,13+swing,33));chair.oval((18-swing,29,25-swing,33))
    chair.limb((9,16),(4,25),3);chair.limb((20,16),(24,24),3)
    chair.oval((3,23,7,26));chair.oval((22,22,26,25))
    chair.oval((6,0,21,14));chair.face([(11,8),(17,8)],(14,11),sleep=blink)
    return chair

def draw_looking(turn=0,blink=False):
    looking=Pixels(25,29)
    looking.oval((7,14,20,28));looking.oval((5,1,20,15))
    looking.face([(11+turn,9),(17+turn,9)],(14+turn,12),sleep=blink)
    looking.limb((7,18),(4,10),3);looking.oval((3,6,10,9))
    looking.oval((12,17,23,20))
    return looking

def draw_mirror_sitter(blink=False):
    # A smaller figure seen across the room, seated on the reflected door lintel.
    sitter=Pixels(11,19)
    sitter.oval((2,11,9,12),color='c')
    sitter.oval((3,7,8,13))
    sitter.limb((3,9),(2,12),1);sitter.limb((8,9),(9,12),1)
    sitter.limb((4,12),(4,17),1);sitter.limb((7,12),(7,17),1)
    sitter.oval((3,16,5,18));sitter.oval((6,16,8,18))
    sitter.oval((1,0,9,8));sitter.face([(3,5),(7,5)],(5,7),sleep=blink)
    return sitter

def draw_painter(brush=0,blink=False):
    # Museum Velázquez reference: curled moustache, brush across chest, oval palette.
    painter=Pixels(30,42)
    painter.oval((7,39,24,41),color='c')
    painter.limb((12,28),(11,37),5);painter.limb((19,28),(20,37),5)
    painter.oval((7,36,14,39));painter.oval((17,36,24,39))
    painter.oval((8,15,23,32));painter.limb((9,19),(5,23),3)
    painter.limb((5,23),(13,24-brush),3)
    painter.limb((21,18),(24,23),3)
    painter.oval((5,0,24,18));painter.face([(11,10),(19,10)],(16,15),sleep=blink)
    # Turned-up ends and a split centre keep the moustache readable in pixels.
    for a,b in [((10,12),(12,14)),((12,14),(15,13)),((16,13),(19,14)),((19,14),(21,12))]:painter.stroke(a,b,'r')
    painter.dot(10,11,'p');painter.dot(21,11,'p')
    painter.stroke((4,18-brush),(20,26),'r');painter.stroke((4,17-brush),(7,19-brush),'q')
    painter.oval((10,22-brush,14,25-brush))
    painter.polygon([(22,21),(27,22),(29,25),(28,29),(24,32),(20,32),(17,29),(18,25)],'r')
    painter.oval((20,25,22,27),color='q');painter.oval((24,23,26,25),color='g')
    painter.oval((24,28,26,29),color='p');painter.oval((19,29,21,30),color='l')
    painter.dot(27,26,'e')
    return painter

builders={'sitting':draw_sitting,'peeking':draw_peeking,'lounging':draw_lounging,
          'researching':draw_researching,'sleeping':draw_sleeping,'upside-down':draw_upside,
          'lotus':draw_lotus,'ship':draw_ship,'presenting':draw_presenting,'bowl':draw_bowl,
          'chair':draw_chair,'looking-out':draw_looking,
          'mirror-sitter':draw_mirror_sitter,'painter':draw_painter}
sprites={name:builder() for name,builder in builders.items()}

data={'palette':PALETTE,'reference':'https://smiski.com/e/products/series-1/',
 'additionalReferences':['User-supplied At Work Series reference: Researching and Presenting',
                         'User-supplied Hippers reference: Sleeping, Looking Out and Upside Down',
                         'User-supplied Yoga reference: Lotus and Ship Pose',
                         'User-supplied Museum reference: Velazquez painter, moustache, brush and palette',
                         'Original poses for this room: bowl dweller and chair sitter'],
 'description':'Hand-authored pixel interpretations for this personal portfolio; optional transparent overlays.',
 'sprites':{name:sprite.export() for name,sprite in sprites.items()},
 'normals':{name:sprite.normals for name,sprite in sprites.items()},
 'lighting':{'description':'Art-directed placement lighting, mapped from the approved room. Not a physical 3D simulation.',
  'sources':[{'id':'lantern','label':'Warm paper lantern','x':521,'y':136,'color':[1,.80,.52]},
             {'id':'window','label':'Cool night window','x':594,'y':84,'color':[.48,.64,1]}],
  'bodyAlbedo':[190,207,146]},
 'placements':[
  {'id':'shelf','label':'Sitting on the bookshelf','sprite':'sitting','x':14,'y':60,'occluders':[],
   'detail':{'x':3,'y':49,'width':42,'height':44,'scale':5}},
  {'id':'tv','label':'Peeking around the TV','sprite':'peeking','x':359,'y':173,'occluders':['television','television-glass'],
   'detail':{'x':347,'y':163,'width':45,'height':44,'scale':5}},
  {'id':'album','label':'Lounging beside the album','sprite':'lounging','x':245,'y':338,'occluders':['photo-album','wooden-bowl'],
   'detail':{'x':238,'y':316,'width':46,'height':48,'scale':5}},
  {'id':'researching','label':'Researching on the photo album','sprite':'researching','x':293,'y':311,'occluders':[],
   'detail':{'x':285,'y':282,'width':62,'height':64,'scale':4}},
  {'id':'sleeping','label':'Sleeping Hipper over the TV edge','sprite':'sleeping','x':336,'y':89,'occluders':['television','television-glass'],
   'detail':{'x':325,'y':69,'width':50,'height':58,'scale':4}},
  {'id':'upside-down','label':'Upside-down Hipper under the shelf','sprite':'upside-down','x':33,'y':116,'occluders':['trailing-plant'],
   'revealBelow':134,'detail':{'x':23,'y':121,'width':43,'height':38,'scale':5}},
  {'id':'lotus','label':'Lotus pose on the rug','sprite':'lotus','x':470,'y':300,'occluders':[],
   'detail':{'x':462,'y':294,'width':43,'height':40,'scale':5}},
  {'id':'ship','label':'Ship pose on the rug','sprite':'ship','x':459,'y':302,'occluders':[],
   'detail':{'x':450,'y':293,'width':51,'height':43,'scale':5}},
  {'id':'presenting','label':'Presenting beside the TV','sprite':'presenting','x':333,'y':169,'occluders':[],
   'lightAnchor':[47,18],
   'detail':{'x':326,'y':159,'width':77,'height':53,'scale':3}},
  {'id':'bowl','label':'A little guest inside the bowl','sprite':'bowl','x':195,'y':324,'occluders':[],
   'occlusionRegions':[{'layer':'wooden-bowl','polygon':[[170,340],[180,345],[194,349],[212,350],[228,345],[241,336],[246,375],[168,375]]}],
   'frontParts':[[2,21,5,5],[21,21,5,5]],
   'detail':{'x':178,'y':316,'width':62,'height':57,'scale':4}},
  {'id':'chair','label':'Taking a seat in the armchair','sprite':'chair','x':519,'y':234,'occluders':['plaid-throw'],
   'detail':{'x':508,'y':224,'width':50,'height':53,'scale':4}},
  {'id':'looking-out','label':'Looking-out Hipper over the TV','sprite':'looking-out','x':254,'y':88,'occluders':['television','television-glass'],
   'detail':{'x':245,'y':80,'width':44,'height':44,'scale':5}},
  {'id':'mirror','label':'Sitting on the doorway in the mirror','sprite':'mirror-sitter','x':448,'y':60,'occluders':[],
   'clipTo':'mirror-reflection','opacity':.82,'glowStrength':.55,'previewArea':'mirror',
   'detail':{'x':416,'y':40,'width':48,'height':48,'scale':5}},
  {'id':'painter','label':'Velázquez painter beside the art','sprite':'painter','x':155,'y':97,'occluders':[],
   'onlyArea':'art','previewArea':'art',
   'detail':{'x':148,'y':91,'width':46,'height':53,'scale':4}}
 ]}
# Per-place visibility of the two sources accounts for furniture sheltering a guest.
light_profiles={
 'shelf':(.43,.20,.025,.10,'Deep shelf shade; a faint warm edge from the right.'),
 'tv':(.48,.33,.05,.05,'Warm right edge, with the TV blocking the far side.'),
 'album':(.52,.34,.05,.08,'Soft warm light across the tabletop.'),
 'researching':(.52,.34,.05,.06,'Soft warm light on the head; contact shade under the knees.'),
 'sleeping':(.47,.40,.07,.05,'Lantern light from the right; body tucked behind the TV.'),
 'upside-down':(.37,.18,.02,.08,'Mostly shelf shade; just the face catches the room light.'),
 'lotus':(.48,.51,.11,.06,'Warm lantern edge, cool window fill and a rug contact shadow.'),
 'ship':(.48,.47,.08,.06,'Warm light from the upper right; a small shadow beneath the seated hip.'),
 'presenting':(.49,.43,.08,.06,'The lantern lights the right side; feet meet the console top.'),
 'bowl':(.40,.32,.04,.24,'Sheltered by the bowl: darker below the rim, light across the head.'),
 'chair':(.48,.55,.18,.12,'Warm light above the left shoulder, cooler window light to the right.'),
 'looking-out':(.47,.37,.06,.05,'Head and hands catch warm side light above the TV edge.'),
 'mirror':(.32,.12,.04,.08,'Dim reflected light; seated on the distant door frame, behind the mirror glass.'),
 'painter':(.52,.25,.025,.04,'Soft warm light beside the frame; brush and palette stay a deeper green.')}
for spot in data['placements']:
 ambient,lantern,window,contact,note=light_profiles[spot['id']]
 spot['lighting']={'ambient':ambient,'lantern':lantern,'window':window,'contactShade':contact,'note':note}
for rows in data['sprites'].values():assert len({len(row) for row in rows})==1
(OUT/'smiskis.json').write_text(json.dumps(data,indent=2)+'\n')
print(f'{len(data["sprites"])} optional Smiski poses saved as editable palette + pixel rows.')

# Every variant is redrawn from the same primitives in the original depth order.
# Sparse patches encode the finished pose, never a translated crop with holes.
def gesture(name,label,steps,poster=1):
    base=sprites[name];poses=[[]];timeline=[];known={'{}':0}
    for duration,params in steps:
        key=json.dumps(params,sort_keys=True)
        if key not in known:
            drawn=builders[name](**params);patch=[]
            for y,row in enumerate(drawn.rows):
                for x,color in enumerate(row):
                    normal=drawn.normals[y][x]
                    if color!=base.rows[y][x] or (color!='.' and normal!=base.normals[y][x]):
                        patch.append([x,y,color,*normal])
            known[key]=len(poses);poses.append(patch)
        timeline.append({'duration':duration,'pose':known[key]})
    assert timeline[0]['pose']==timeline[-1]['pose']==0
    return {'label':label,'poster':poster,'poses':poses,'timeline':timeline}

animations={
 'sitting':gesture('sitting','A tiny foot swing',[(450,{}),(200,{'swing':1}),(240,{'swing':2}),(200,{'swing':1}),(260,{}),(200,{'swing':-1}),(240,{'swing':-2}),(200,{'swing':-1}),(220,{}),(100,{'blink':True}),(350,{})],2),
 'peeking':gesture('peeking','A curious peek',[(450,{}),(160,{'peek':1}),(240,{'peek':2}),(500,{'peek':2}),(100,{'peek':2,'blink':True}),(220,{'peek':2}),(180,{'peek':1}),(400,{})],2),
 'lounging':gesture('lounging','A sleepy breath',[(500,{}),(800,{'breath':1}),(650,{}),(900,{'breath':1}),(500,{})]),
 'researching':gesture('researching','Tap, tap… a thought',[(450,{}),(140,{'tap':1}),(140,{}),(140,{'tap':1}),(200,{}),(180,{'nod':1}),(180,{'nod':1}),(400,{'nod':1}),(400,{'nod':1}),(500,{'nod':1}),(140,{'nod':1,'blink':True}),(160,{'nod':1}),(160,{}),(140,{}),(140,{'tap':1}),(140,{}),(140,{'tap':1}),(450,{})],9),
 'sleeping':gesture('sleeping','A sleepy little nod',[(600,{}),(400,{'nod':1}),(700,{'nod':2}),(450,{'nod':1}),(650,{})],2),
 'upside-down':gesture('upside-down','A look around, upside down',[(450,{}),(500,{'turn':1}),(200,{}),(550,{'turn':-1}),(100,{'turn':-1,'blink':True}),(300,{'turn':-1}),(450,{})],3),
 'lotus':gesture('lotus','One slow breath',[(600,{}),(1100,{'breath':1}),(650,{}),(1000,{'breath':1}),(500,{})]),
 'ship':gesture('ship','Just a blink',[(850,{}),(130,{'blink':True}),(800,{})]),
 'presenting':gesture('presenting','A point and a nod',[(400,{}),(180,{'point':1}),(180,{'point':2}),(180,{'point':3}),(400,{'point':4,'nod':1}),(100,{'point':4,'nod':1,'blink':True}),(250,{'point':4,'nod':1}),(180,{'point':3}),(180,{'point':2}),(180,{'point':1}),(450,{})],4),
 'bowl':gesture('bowl','Hide… and peek',[(500,{}),(140,{'duck':5}),(140,{'duck':12}),(140,{'duck':20}),(650,{'duck':26}),(150,{'duck':20}),(170,{'duck':12}),(350,{'duck':5}),(100,{'duck':5,'blink':True}),(150,{'duck':2}),(500,{})],4),
 'chair':gesture('chair','A comfortable foot swing',[(500,{}),(240,{'swing':1}),(340,{'swing':2}),(240,{'swing':1}),(220,{}),(240,{'swing':-1}),(340,{'swing':-2}),(240,{'swing':-1}),(100,{'blink':True}),(450,{})],2),
 'looking-out':gesture('looking-out','Checking both sides',[(450,{}),(650,{'turn':1}),(180,{}),(650,{'turn':-1}),(100,{'turn':-1,'blink':True}),(220,{'turn':-1}),(450,{})],3),
 'mirror-sitter':gesture('mirror-sitter','A blink in the reflection',[(1000,{}),(140,{'blink':True}),(650,{})]),
 'painter':gesture('painter','A little brush greeting',[(400,{}),(220,{'brush':1}),(600,{'brush':2}),(140,{'brush':2,'blink':True}),(300,{'brush':2}),(220,{'brush':1}),(500,{})],2)
}
def with_sleep_marks(clip,anchor):
    """Three staggered pixel Zs share the gesture clock, including its quiet ending."""
    source=clip['timeline'];total=sum(frame['duration'] for frame in source)
    boundaries={0,total};elapsed=0
    for frame in source:
        elapsed+=frame['duration'];boundaries.add(elapsed)
    boundaries.update(range(160,total,160))
    times=sorted(boundaries);timeline=[]
    for start,end in zip(times,times[1:]):
        elapsed=0
        for frame in source:
            elapsed+=frame['duration']
            if start<elapsed:
                pose=frame['pose'];break
        marks=[]
        for birth in (400,900,1400):
            age=start-birth
            if 0<=age<1200:
                progress=age/1200
                opacity=min(1,age/180,(1200-age)/400)*.85
                if opacity>0:
                    marks.append([anchor[0]+round(progress*6),anchor[1]-round(progress*11),round(opacity,2)])
        timeline.append({'duration':end-start,'pose':pose,'sleepMarks':marks})
    clip['timeline']=timeline
    clip['sleepGlyph']=['11111','00010','00100','01000','11111']
    clip['label']+=' · drifting Zzz'
    clip['poster']=next(i for i,frame in enumerate(timeline) if len(frame['sleepMarks'])==3)
    return clip

with_sleep_marks(animations['lounging'],(12,-4))
with_sleep_marks(animations['sleeping'],(17,-4))

# Thought cloud and dotted trail are independent pixels above the original head.
thought=Pixels(23,20)
for box in [(0,3,7,10),(4,0,13,11),(10,1,19,11),(16,3,22,10)]:thought.oval(box,color='o')
for box in [(1,4,7,9),(5,1,12,10),(10,2,18,10),(16,4,21,9)]:thought.oval(box,color='l')
thought.oval((8,13,11,15),color='o');thought.oval((9,14,10,14),color='l')
thought.dot(7,18,'l')
research=animations['researching']
research['thoughtGlyph']={'rows':thought.export(),'palette':{'o':'#69725b','l':'#d5d9b5'},'x':20,'y':-24}
thought_frames=[(0,0)]*5+[(.25,0),(.6,0),(1,1),(1,2),(1,3),(1,3),(.55,3),(.2,3)]+[(0,0)]*5
assert len(thought_frames)==len(research['timeline'])
for frame,(alpha,dots) in zip(research['timeline'],thought_frames):
    if alpha:frame['thoughtBubble']={'alpha':alpha,'dots':dots}
(OUT/'smiski-motions.json').write_text(json.dumps({'animations':animations},separators=(',',':'))+'\n')

# A small standalone, room-lit clip lets the portfolio load only its art companion.
painter_spot=next(spot for spot in data['placements'] if spot['id']=='painter')
painter_clip=animations['painter'];painter_palette=[None];painter_frames=[]
for patch in painter_clip['poses']:
    rows=[row[:] for row in sprites['painter'].rows]
    normals=[[n[:] for n in row] for row in sprites['painter'].normals]
    for x,y,color,*normal in patch:rows[y][x]=color;normals[y][x]=normal
    frame=[]
    for y,row in enumerate(rows):
        pixels=[]
        for x,key in enumerate(row):
            color=None
            if key=='c':color='#18181065'
            elif key!='.':
                normal=normals[y][x];length=math.hypot(*normal) or 1;n=[v/length for v in normal]
                profile=painter_spot['lighting'];energy=[profile['ambient']*v for v in (.95,1,.90)]
                for source in data['lighting']['sources']:
                    direction=[source['x']-painter_spot['x']-x,source['y']-painter_spot['y']-y,180]
                    length=math.hypot(*direction);diffuse=max(0,sum(v*d/length for v,d in zip(n,direction)))
                    for i in range(3):energy[i]+=source['color'][i]*profile[source['id']]*diffuse
                material=data['lighting']['bodyAlbedo'] if key in 'osglh' else [int(PALETTE[key][i:i+2],16) for i in (1,3,5)]
                contact=1-profile['contactShade']*max(0,(y/len(rows)-.65)/.35)
                color='#'+''.join(f'{max(0,min(255,round(v*energy[i]*contact*(.78 if key=="o" else 1)))):02x}' for i,v in enumerate(material))
            if color not in painter_palette:painter_palette.append(color)
            pixels.append(painter_palette.index(color))
        frame.append(pixels)
    painter_frames.append(frame)
(OUT/'art-painter.json').write_text(json.dumps({'width':30,'height':42,'palette':painter_palette,'frames':painter_frames,'timeline':painter_clip['timeline']},separators=(',',':'))+'\n')
print(f'{len(animations)} native-pixel gestures saved; all start and finish at the approved resting pose.')
