"""Split the approved room into registered editable pixel layers.

The parked composition preserves every visible source pixel. Prepared objects
also have reconstructed parent surfaces and separate original contact patches.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops
import json, hashlib
from room_underpainting import PREPARED, prepare_contacts, repair_surfaces
ROOT=Path(__file__).resolve().parent.parent
W,H=640,400
# Freeze the exact grid exported from the existing browser renderer. This avoids
# changing its pixel sampling when splitting the source offline.
source=Image.open(ROOT/'pixel-source/room-grid.png').convert('RGBA')
assert source.size==(W,H),'The source grid must stay 640 x 400'
# Back to front. Later silhouettes take ownership wherever masks overlap.
specs=[]
def region(id,label,group,points,**extra):
 specs.append(dict(id=id,label=label,group=group,polygons=[points],**extra))
def rectangle(id,label,group,box,**extra):
 x0,y0,x1,y1=box;region(id,label,group,[(x0,y0),(x1,y0),(x1,y1),(x0,y1)],**extra)
rectangle('plaster-wall','Plaster wall & existing light','Architecture',(0,0,639,399))
rectangle('wood-floor','Wooden floor','Architecture',(0,256,639,399))
region('wine-rug','Wine-red rug','Textiles',[(62,301),(639,301),(639,399),(0,399),(0,347)])
region('bookcase','Bookcase & shelf objects','Furniture',[(0,0),(68,0),(69,272),(62,286),(0,317)])
rectangle('shelf-upper-books','Upper shelf books','Small objects',(0,0,25,26))
rectangle('shelf-middle-books','Middle shelf books','Small objects',(0,81,44,133))
rectangle('shelf-lower-records','Lower shelf records','Small objects',(0,188,24,245))
region('trailing-plant','Trailing shelf plant','Plants',[(30,2),(58,4),(64,12),(76,26),(73,40),(81,47),(76,68),(82,78),(77,90),(82,101),(75,117),(82,129),(77,137),(80,159),(72,156),(67,133),(64,115),(56,92),(49,73),(39,66),(43,42),(32,38),(32,21),(28,16)])
rectangle('window-woodwork','Window frame','Window',(502,0,639,205))
region('outside-night','Night view & foliage','Window',[(586,0),(639,0),(639,177),(584,177)])
specs[-1]['polygons'] += [[(524,72),(570,72),(570,185),(524,185)]]
rectangle('stained-glass','Stained glass','Window',(524,5,570,65))
# Mullions in front of the night view.
rectangle('window-crossbar','Window crossbar','Window',(585,65,639,72))
rectangle('window-right-mullion','Window right mullion','Window',(630,0,636,177))
region('media-console','Walnut media console','Furniture',[(119,204),(138,196),(466,195),(485,203),(485,269),(474,274),(474,288),(467,288),(465,275),(135,275),(133,289),(127,290),(127,275),(118,272)])
rectangle('console-left-records','Left record collection','Small objects',(125,214,229,262))
rectangle('console-right-records','Right record collection','Small objects',(362,215,476,263))
rectangle('console-cubbies','Console books & keepsakes','Small objects',(241,213,353,234))
region('television','CRT television case','Media',[(229,109),(354,107),(367,111),(368,199),(361,202),(231,200),(228,196)])
rectangle('television-glass','TV glass / live screen position','Media',(239,119,335,186))
region('turntable-plinth','Room-view turntable base','Media',[(137,191),(146,187),(220,186),(223,191),(222,202),(137,202)])
region('turntable-lid','Room-view turntable lid','Media',[(146,158),(215,158),(219,184),(149,184)])
region('turntable-record','Room-view disc & tonearm','Media',[(145,183),(157,181),(198,181),(211,179),(216,181),(218,187),(203,191),(151,191),(144,189)])
region('console-books','Books beside the TV','Small objects',[(379,194),(386,192),(384,187),(426,187),(430,190),(430,203),(379,203)])
region('small-ceramic-bowl','Small ceramic bowl','Small objects',[(393,179),(422,179),(420,185),(413,188),(398,187),(393,182)])
region('blue-vase','Blue vase','Plants',[(439,170),(443,168),(455,168),(458,173),(462,181),(460,203),(438,203),(435,198),(436,180)])
region('vase-branches','Branches in the vase','Plants',[(447,142),(454,141),(455,148),(465,143),(468,147),(467,151),(479,151),(474,158),(481,163),(475,172),(464,170),(459,177),(445,169),(432,171),(430,165),(417,168),(407,164),(412,159),(422,155),(418,148),(430,150),(432,142),(439,146)])
region('heart-large','Large tin heart','Wall objects',[(367,30),(373,35),(373,40),(380,44),(380,54),(371,66),(363,60),(356,49),(359,40),(364,39)])
region('heart-small','Small tin heart','Wall objects',[(385,54),(389,55),(390,61),(394,64),(394,70),(389,79),(382,73),(379,66),(381,61),(384,61)])
region('sun-and-moon','Sun & moon ornament','Wall objects',[(373,79),(382,80),(390,87),(394,98),(391,109),(382,117),(368,116),(358,108),(355,98),(359,87)])
region('heart-lower','Lower tin heart','Wall objects',[(385,122),(389,123),(390,128),(395,130),(395,137),(389,146),(382,141),(378,134),(379,129),(383,129)])
rectangle('mirror-frame','Tin & calla-lily mirror frame','Wall objects',(398,19,485,140))
rectangle('mirror-reflection','Mirror reflection / portrait position','Wall objects',(420,41,459,118))
region('lantern-stand','Lantern stand','Lighting',[(518,164),(522,164),(522,258),(517,258)])
region('paper-lantern','Paper lantern','Lighting',[(515,106),(531,106),(538,110),(544,120),(548,130),(548,143),(543,157),(536,164),(516,167),(506,163),(499,155),(494,145),(493,131),(496,118),(503,110)])
region('plant-stool-books','Plant stool & floor books','Furniture',[(37,266),(76,264),(82,256),(104,254),(112,266),(110,282),(94,287),(81,283),(70,282),(67,303),(62,303),(62,280),(48,279),(47,300),(42,302),(43,277),(37,276)])
region('monstera-leaves','Monstera foliage','Plants',[(72,169),(83,165),(95,167),(106,174),(116,178),(118,189),(112,202),(118,215),(119,229),(115,249),(108,258),(99,253),(103,237),(94,233),(83,240),(79,252),(51,253),(44,244),(32,245),(27,235),(20,232),(25,222),(22,213),(28,207),(31,201),(39,199),(51,203),(48,193),(40,190),(34,193),(32,182),(44,173),(61,173)])
region('monstera-pot','Monstera pot','Plants',[(41,239),(86,240),(84,253),(78,267),(67,271),(48,268),(44,257)])
region('olive-armchair','Olive armchair','Furniture',[(639,174),(603,175),(592,178),(585,189),(570,190),(562,207),(506,217),(504,224),(504,244),(499,246),(497,278),(500,294),(498,326),(495,334),(498,336),(504,334),(511,305),(558,326),(565,364),(576,375),(639,353)])
region('plaid-throw','Plaid chair throw','Textiles',[(594,226),(609,225),(617,230),(639,227),(639,347),(629,344),(620,353),(612,349),(606,357),(603,350),(596,356),(591,351),(585,359),(581,352),(576,356),(570,349),(571,325),(575,303),(576,267),(578,246),(575,242),(581,234)])
region('coffee-table','Coffee table','Furniture',[(157,331),(431,328),(438,335),(466,390),(468,399),(118,399),(119,388)])
region('wooden-bowl','Wooden bowl','Small objects',[(171,334),(184,329),(215,329),(235,335),(242,345),(238,356),(228,365),(211,372),(193,369),(176,360),(171,348)])
region('photo-album','Photography album','Media',[(273,335),(372,330),(381,332),(398,369),(397,380),(280,383),(276,378)])
region('stone-coaster','Stone coaster','Small objects',[(411,359),(423,356),(437,360),(442,364),(441,369),(435,373),(421,373),(410,369),(406,365)])

refinements=json.loads((ROOT/'pixel-source/room-mask-refinements.json').read_text())
for spec in specs:
 if spec['id'] in refinements:spec.update(refinements[spec['id']]);spec['outline']='refined'

masks=[]
for spec in specs:
 mask=Image.new('L',(W,H));d=ImageDraw.Draw(mask)
 if 'rows' in spec:
  for y,left,right in spec['rows']:d.line((left,y,right,y),fill=255)
 else:
  for poly in spec['polygons']:d.polygon(poly,fill=255)
 masks.append(mask)
def ownership(masks):
 covered=Image.new('L',(W,H));owned=[]
 for mask in reversed(masks):
  own=ImageChops.subtract(mask,covered);owned.append(own);covered=ImageChops.lighter(covered,mask)
 return list(reversed(owned))
owned=ownership(masks)
base_owned={s['id']:mask for s,mask in zip(specs,owned)}
patches,distances=prepare_contacts(specs,masks,owned)
repairs=repair_surfaces(source,base_owned,patches,distances)
with_contacts=[];contact_masks=[]
for spec,mask in zip(specs,masks):
 if spec['id'] in PREPARED:
  key=spec['id'];parent,_=PREPARED[key]
  with_contacts.append(dict(id=key+'-contact',label=spec['label']+' · resting shadow',group='Contact patches',companionFor=key,parent=parent))
  contact_masks.append(patches[key])
  spec['underpainting']=dict(parent=parent,companions=[key+'-contact'])
 with_contacts.append(spec);contact_masks.append(mask)
specs=with_contacts;owned=ownership(contact_masks)
folder=ROOT/'assets/room-layers';folder.mkdir(exist_ok=True)
layers=[];composite=Image.new('RGBA',(W,H));coverage=Image.new('L',(W,H))
for spec,mask in zip(specs,owned):
 layer=source.copy();layer.putalpha(mask)
 for key,(parent,_) in PREPARED.items():
  if spec['id']==parent:layer=Image.alpha_composite(layer,repairs[key])
 box=layer.getbbox()
 if not box:continue
 composite=Image.alpha_composite(composite,layer)
 coverage=ImageChops.lighter(coverage,layer.getchannel('A'))
 layer.crop(box).save(folder/(spec['id']+'.png'),optimize=True)
 metadata={k:spec[k] for k in ['id','label','group','outline','underpainting','companionFor','parent'] if k in spec}
 layers.append(metadata|dict(x=box[0],y=box[1],width=box[2]-box[0],height=box[3]-box[1],src=spec['id']+'.png',occludedBackground='reconstructed' if 'underpainting' in spec else 'not-painted',motionReady=False))
assert source.tobytes()==composite.tobytes(),'Layer assembly changed source pixels'
assert coverage.getextrema()==(255,255),'Incomplete canvas coverage'
manifest=dict(width=W,height=H,source='../room-master.png',sourceSha256=hashlib.sha256((ROOT/'assets/room-master.png').read_bytes()).hexdigest(),gridSha256=hashlib.sha256((ROOT/'pixel-source/room-grid.png').read_bytes()).hexdigest(),pixelMatch=True,preparedObjects=list(PREPARED),layers=layers,overlays=['TV screen & controls','Selectable programme guide','Wall artwork frames','Mirror portrait','Album title & pages','Object hover outlines'],ambientEvents=dict(enabled=False,reason='Motion is deferred until individual silhouettes and concealed surfaces are ready.'))
(folder/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'pixel-source/room-regions.json').write_text(json.dumps(specs,indent=2)+'\n')
print(f'{len(layers)} layers; {W*H:,} pixels match the approved room; {sum(p.stat().st_size for p in folder.glob("*.png"))//1024} KB.')
