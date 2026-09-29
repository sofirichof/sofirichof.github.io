"""Trace the approved close-up into editable pixel layers; source artwork stays intact.
Masks are defined on the same 640x400 grid used by the website.
The exposed deck and grooves beneath the arm are reconstructed from nearby pixels.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math,json
from deck_surface import rebuild_deck
root=Path(__file__).resolve().parent.parent
im=Image.open(root/'assets/vinyl-closeup-clean.png').convert('RGB').resize((640,400),Image.Resampling.NEAREST)
w,h=im.size; src=im.load()
def mask(points):
 m=Image.new('1',(w,h));ImageDraw.Draw(m).polygon(points,fill=1);return m
# Original occlusion footprint; keep this repair area stable when refining the
# moving silhouette so the reconstructed deck and record do not change.
arm=Image.new('1',(w,h));ad=ImageDraw.Draw(arm)
ad.line([(307,117),(303,130),(301,140),(300,153),(300,170),(298,182),(294,191),(286,199),(273,209),(260,217)],fill=1,width=10)
ad.polygon([(258,212),(266,218),(260,229),(244,244),(234,244),(229,236),(233,229),(247,218)],fill=1)
repair_image=arm.convert('L').filter(ImageFilter.MaxFilter(7))
# Remove the original cast shadow too, so it cannot remain as a second arm.
ImageDraw.Draw(repair_image).polygon([(306,142),(312,165),(309,191),(296,213),(277,230),(252,252),(234,258),(230,243),(251,221),(278,204),(292,185),(296,158)],fill=255)
repair=repair_image.load()
# The moving cutout follows the actual metal shaft and headshell. The old broad
# diagonal trace also captured the vinyl's gold rim/reflection above the shaft.
moving_arm=arm.copy();md=ImageDraw.Draw(moving_arm)
md.rectangle((0,180,w-1,h-1),fill=0)
md.line([(300,178),(300,183),(298,190),(295,195),(292,199),(287,204),(280,209),(275,213),(270,216),(264,219)],fill=1,width=7)
md.polygon([(260,216),(265,220),(263,225),(260,228),(254,232),(250,236),(246,238),(243,242),(240,244),(237,243),(234,240),(231,236),(233,233),(236,231),(239,232),(242,229),(247,226),(253,221),(257,219)],fill=1)
lid=mask([(49,19),(370,19),(370,33),(352,70),(75,71),(49,32)])
body=mask([(72,73),(353,73),(353,289),(75,291),(70,282)])
# Include original hinge pieces in the static body, keeping their silhouette exact.
ImageDraw.Draw(body).rectangle((93,62,112,80),fill=1);ImageDraw.Draw(body).rectangle((312,61,334,80),fill=1)
cx,cy,rx,ry=184,174,101,96
record=Image.new('1',(w,h));dr=ImageDraw.Draw(record);dr.ellipse((cx-rx,cy-ry,cx+rx,cy+ry),fill=1)
# The gold reflection crosses both opposing sectors of the record. Borrow exact
# source pixels from the unobstructed opposite side to continue the grooves
# beneath the arm without averaging away their grain or turning them into a smear.
# Only the outer repair boundary is feathered; the interior keeps source pixels.
repair_soft=repair_image.filter(ImageFilter.GaussianBlur(1.2)).load()
def record_under_arm(x,y):
 return src[2*cx-x,2*cy-y]

a,l,b,r=moving_arm.load(),lid.load(),body.load(),record.load()
scene=Image.new('RGBA',(w,h));fixed=Image.new('RGBA',(w,h));cover=Image.new('RGBA',(w,h));disc=Image.new('RGBA',(w,h));light=Image.new('RGBA',(w,h));needle=Image.new('RGBA',(w,h))
out=[v.load() for v in [scene,fixed,cover,disc,light,needle]]
for y in range(h):
 for x in range(w):
  color=src[x,y];opaque=(*color,255)
  if l[x,y]: out[2][x,y]=opaque
  elif b[x,y]: out[1][x,y]=opaque
  else: out[0][x,y]=opaque
  if a[x,y]:
   out[5][x,y]=opaque
  if repair[x,y]:
   # Borrow adjacent deck pixels from the same horizontal band, preserving its
   # gradual shading. The narrow trace avoids lifting the bearing or its shadow.
   dx=322+(x*7+y*3)%8;dy=y
   if (x-307)**2+(y-117)**2<22**2:
    dx=round(307+abs(x-307)+10)
   edge=cx+rx*math.sqrt(max(0,1-((y-cy)/ry)**2))
   shade=.86+.14*max(0,min(1,(x-edge)/max(1,330-edge)))
   out[1][x,y]=(*(round(c*shade) for c in src[dx,dy]),255)
  if r[x,y]:
   radius=math.sqrt(((x-cx)/rx)**2+((y-cy)/ry)**2)
   # Quiet upper sector follows the actual concentric grooves at the same radius.
   samples=[]
   for deg in [-105,-96,-87,-78]:
    angle=math.radians(deg)
    sx=round(cx+radius*rx*math.cos(angle));sy=round(cy+radius*ry*math.sin(angle))
    samples.append(src[max(0,min(w-1,sx)),max(0,min(h-1,sy))])
   quiet=tuple(sorted(v[i] for v in samples)[1] for i in range(3))
   weight=max(repair[x,y],repair_soft[x,y])/255
   if weight:
    rebuilt=record_under_arm(x,y)
    color=tuple(round(color[i]*(1-weight)+rebuilt[i]*weight) for i in range(3))
   # Keep light reflections stationary as the record and paper label turn beneath.
   # Rim detail belongs entirely to the moving record, not its lighting layer.
   if .32<radius<.965:
    base=tuple(min(color[i],quiet[i]) for i in range(3));glint=tuple(color[i]-base[i] for i in range(3))
    out[3][x,y]=(*base,255);out[4][x,y]=(*glint,255)
   else:out[3][x,y]=(*color,255)
# Metal spindle belongs to the stationary light/deck layer, not the rotating paper.
for y in range(170,178):
 for x in range(180,188):
  if ((x-183.5)/3.3)**2+((y-173.5)/4)**2<1:
   out[4][x,y]=(0,0,0,0)
spindle=Image.new('RGBA',(w,h));sp=spindle.load()
for y in range(170,178):
 for x in range(180,188):
  if ((x-183.5)/3.3)**2+((y-173.5)/4)**2<1:sp[x,y]=(*src[x,y],255)
# Restore the real inset border and source texture only after tracing the objects.
fixed=rebuild_deck(im,fixed)
layers=[];directory=root/'assets/turntable';directory.mkdir(exist_ok=True)
for name,image,mode in [('surroundings',scene,'source-over'),('plinth-and-deck',fixed,'source-over'),('dust-cover',cover,'source-over'),('record',disc,'source-over'),('fixed-reflections',light,'lighter'),('spindle',spindle,'source-over'),('tonearm',needle,'source-over')]:
 box=image.getbbox();small=image.crop(box);small.save(directory/(name+'.png'),optimize=True)
 layers.append({'id':name,'x':box[0],'y':box[1],'width':small.width,'height':small.height,'composite':mode,'src':name+'.png'})
data={'width':w,'height':h,'source':'vinyl-closeup-clean.png','recordPivot':[cx,cy],'recordAspect':ry/rx,'armPivot':[307,117],'parkAngle':-29,'layers':layers}
(directory/'manifest.json').write_text(json.dumps(data,indent=2)+'\n')
print(len(layers),'editable transparent PNG layers;',sum(p.stat().st_size for p in directory.iterdir())//1024,'KB')
