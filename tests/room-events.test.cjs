const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'room-events.js'),'utf8');
const clips=JSON.parse(fs.readFileSync(path.join(root,'assets/room-guests/smiski-motions.json'))).animations;
const placements=JSON.parse(fs.readFileSync(path.join(root,'assets/room-guests/smiskis.json')));
function random(seed=17){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function clock(){
 let now=0,id=0;const tasks=new Map();
 const later=(fn,delay)=>{tasks.set(++id,{fn,at:now+delay});return id;};
 return {tasks,setTimeout:later,clearTimeout:id=>tasks.delete(id),requestAnimationFrame:fn=>later(fn,16),cancelAnimationFrame:id=>tasks.delete(id),
 advance(ms){const end=now+ms;let count=0;while(true){let next;for(const t of tasks)if(t[1].at<=end&&(!next||t[1].at<next[1].at))next=t;if(!next)break;assert(++count<200000,'No timer runaway');now=next[1].at;tasks.delete(next[0]);next[1].fn(now);}now=end;}};
}
class Element{
 constructor(){this.dataset={};this.listeners={};this.attributes={};this.hidden=false;}
 addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
 fire(type){for(const fn of this.listeners[type]||[])fn();}
 setAttribute(key,value){this.attributes[key]=value;}
 getBoundingClientRect(){return {left:0,top:0,width:640,height:400};}
 getContext(){return {drawImage(){}};}
}
function boot(){const window={};vm.runInNewContext(source,{window});return window.NocheRoomEvents;}
function testPlans(){
 const {visitorPlan,visitorFrame}=boot(),rng=random(),outcomes=new Set();
 for(const clip of Object.values(clips))for(let i=0;i<1000;i++){
  const plan=visitorPlan(clip,rng),{move,glow,duration}=plan;
  assert(duration>=11000&&duration<=16000);
  outcomes.add(move?(glow?'both':'movement only'):(glow?'glow only':'neither'));
  for(const effect of [move,glow].filter(Boolean)){assert(effect.start>=600);assert(effect.start+effect.duration<=duration-700+.001);}
  if(move&&glow){outcomes.add(move.start<glow.start?'move first':'glow first');if(Math.max(move.start,glow.start)<Math.min(move.start+move.duration,glow.start+glow.duration))outcomes.add('overlap');}
  assert.equal(visitorFrame(plan,clip,0).opacity,0);
  assert.equal(visitorFrame(plan,clip,duration).opacity,0);
  assert.equal(visitorFrame(plan,clip,duration-600).frame,0);
  assert.equal(visitorFrame(plan,clip,duration-600).glow,0);
  if(move){for(let t=0;t<move.duration;t+=97){const state=visitorFrame(plan,clip,move.start+t);assert(state.frame>=0&&state.frame<clip.timeline.length);}}
  if(glow){const peak=visitorFrame(plan,clip,glow.start+glow.duration*(glow.rise+glow.hold/2));assert.equal(peak.glow,glow.peak);assert(glow.peak>=5&&glow.peak<=8);}
 }
 for(const outcome of ['movement only','glow only','neither','both','move first','glow first','overlap'])assert(outcomes.has(outcome),outcome);
 console.log('PASS: all 14 poses support independently randomized effects, either order, overlap, skipped effects, and clean resting ends.');
}
function testDirector(){
 const {Director,LANES}=boot(),time=clock();let allowed=true,played=0,cleared=0,painted=0,maxActive=0;const active=new Set(),samples=[];
 assert.equal(LANES.length,3);
 const director=new Director({clock:time,random:random(),allowed:()=>allowed,
  select:list=>{assert.deepEqual(new Set(list.map(e=>e.id)),active,'Director reports the events already sharing the room');const event={id:'e'+(++played),duration:5000};active.add(event.id);return event;},
  paint:frames=>{painted++;assert.equal(frames.length,active.size,'Every active event is painted each frame');maxActive=Math.max(maxActive,frames.length);},
  clear:e=>{active.delete(e.id);cleared++;}});
 director.sync();director.sync();assert.equal(time.tasks.size,3,'One timer per lane; repeated state sync must not duplicate timers');
 time.advance(6000);assert(active.size>=2,'Two events share the room shortly after entering');assert(painted>0);
 for(let t=0;t<180000;t+=250){time.advance(250);samples.push(active.size);}
 const under=samples.filter(n=>n<2).length/samples.length;
 assert(under<.25,'At least two events are active nearly all the time, got '+under.toFixed(2)+' below');
 assert(samples.some(n=>n===3),'A third occasional event joins');assert.equal(maxActive,3);assert(!samples.some(n=>n>3));
 allowed=false;director.sync();assert.equal(time.tasks.size,0);assert.equal(active.size,0,'Stopping clears every active event');const stopped=played;time.advance(60000);assert.equal(played,stopped);
 allowed=true;director.sync();time.advance(1000);assert.equal(played,stopped,'Return begins with a short fresh wait');time.advance(6000);assert(active.size>=2);allowed=false;director.sync();assert.equal(active.size,0);assert.equal(time.tasks.size,0);
 allowed=true;director.sync();time.advance(30000);director.stop();assert.equal(time.tasks.size,0);assert.equal(active.size,0);assert.equal(cleared,played);
 console.log('PASS: three lanes keep at least two finite events running, a third joins occasionally, painting covers every active event, and stopping leaves no stale timers or visitors.');
}
async function testIntegration({failGuests=false,failAnimations=false}={}){
 const time=clock(),els=new Map(),get=id=>{if(!els.has(id))els.set(id,new Element());return els.get(id);};
 const document=new Element();document.baseURI='http://preview/';document.hidden=false;document.documentElement={lang:'en'};
 let entered=true;document.body=new Element();document.body.classList={contains:()=>entered};document.body.dataset.view='room';
 document.querySelector=id=>id==='dialog[open]'?null:get(id);document.querySelectorAll=()=>[];document.createElement=()=>new Element();
 const media=new Element();media.matches=false;const window=Object.assign(new Element(),time);const storage=new Map(),observations=[];
 get('#remote').hidden=true;
 let spot=null;const visits=[],renderStates=[],overrides=new Map();
 let concurrent=0;const box=s=>({x:s.x,y:s.y,w:placements.sprites[s.sprite][0].length,h:placements.sprites[s.sprite].length});
 const apart=(a,b)=>a.x+a.w+4<=b.x||b.x+b.w+4<=a.x||a.y+a.h+4<=b.y||b.y+b.h+4<=a.y;
 const renderAll=entries=>{concurrent=Math.max(concurrent,entries.length);for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++){assert.notEqual(entries[i].spot.id,entries[j].spot.id);assert(apart(box(entries[i].spot),box(entries[j].spot)),'Visitors never touch: '+entries[i].spot.id+' & '+entries[j].spot.id);}
  spot=entries.at(-1)?.spot.id??null;for(const {spot:s,state} of entries){visits.push(s.id);renderStates.push(state);}};
 const renderer={data:placements,motionData:{animations:clips},renderAll,render:(s,state)=>renderAll([{spot:s,state}]),clear:()=>{spot=null;}};
 const context={window,document,innerWidth:640,innerHeight:400,URL,Math:Object.assign(Object.create(Math),{random:random()}),matchMedia:()=>media,
  NocheGuestPixels:{create:async()=>{if(failGuests)throw Error('Missing visitors');return renderer;}},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
  Image:class{decode(){return Promise.resolve();}},MutationObserver:class{constructor(fn){observations.push(fn);}observe(){}},
  fetch:async url=>{if(failAnimations)throw Error('Missing animation');return {ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,new URL(url).pathname)))}}};
 window.NOCHE_COPY=Object.fromEntries(['roomLifeOn','roomLifeOff','roomLifeReduced','roomLifeUnavailable'].map(k=>[k,[k+' ES',k+' EN']]));
 const layers=JSON.parse(fs.readFileSync(path.join(root,'assets/room-layers/manifest.json'))).layers;
 const room={layers,setLayerFrame:(id,frame)=>{if(frame)overrides.set(id,frame);else overrides.delete(id);}};
 vm.runInNewContext(source,context);await window.NocheRoomEvents.create(room);
 const state=get('#room-events').dataset,toggle=get('#room-life-toggle'),changed=()=>observations.forEach(fn=>fn());
 if(failGuests&&failAnimations){assert(toggle.disabled);assert.equal(state.state,'unavailable');assert.equal(time.tasks.size,0);return;}
 assert.equal(state.state,'waiting');assert(!toggle.disabled);
 time.advance(360000);if(!failGuests){assert(visits.length>0);assert(concurrent>=2,'Two visitors appear together');assert(!visits.includes('painter'),'Painter only appears on artwork opening');assert(renderStates.some(s=>s.frame>0));assert(renderStates.some(s=>s.glow>0));}
 for(const view of ['art','tv','album','mirror','poster']){document.body.dataset.view=view;changed();assert.equal(time.tasks.size,0);assert.equal(spot,null);assert.equal(overrides.size,0);document.body.dataset.view='room';changed();assert.equal(state.state,'waiting');}
 get('#remote').hidden=false;changed();assert.equal(state.state,'paused');toggle.fire('click');assert.equal(storage.get('noche-room-life-v1'),'off');get('#remote').hidden=true;changed();time.advance(60000);assert.equal(time.tasks.size,0);
 toggle.fire('click');assert.equal(storage.get('noche-room-life-v1'),'on');assert.equal(state.state,'waiting');
 document.hidden=true;document.fire('visibilitychange');assert.equal(time.tasks.size,0);document.hidden=false;document.fire('visibilitychange');assert.equal(state.state,'waiting');
 media.matches=true;media.fire('change');assert(toggle.disabled);assert.equal(time.tasks.size,0);assert.equal(overrides.size,0);media.matches=false;media.fire('change');assert(!toggle.disabled);
 document.documentElement.lang='es';document.fire('noche:language');assert.equal(toggle.textContent,'roomLifeOn ES');
 window.fire('pagehide');assert.equal(time.tasks.size,0);window.fire('pageshow');assert.equal(state.state,'waiting');
 entered=false;changed();assert.equal(time.tasks.size,0);assert.equal(spot,null);assert.equal(overrides.size,0);
}
(async()=>{testPlans();testDirector();await testIntegration();await testIntegration({failGuests:true});await testIntegration({failAnimations:true});await testIntegration({failGuests:true,failAnimations:true});console.log('PASS: room/view/tab lifecycle, saved toggle, translation, reduced motion, painter exclusion, partial asset failures, and cleared layers.');})().catch(error=>{console.error(error);process.exitCode=1;});
