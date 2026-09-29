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
 const {Director}=boot(),time=clock();let allowed=true,active=false,played=0,cleared=0,painted=0;const waits=[];
 const director=new Director({clock:time,random:random(),allowed:()=>allowed,
  select:()=>{assert(!active,'Events cannot overlap');active=true;played++;return {id:'test',duration:800};},
  paint:()=>{assert(active);painted++;},clear:()=>{active=false;cleared++;},publish:s=>{if(s.state==='waiting')waits.push(s.delay);}});
 director.sync();director.sync();assert.equal(time.tasks.size,1,'Repeated state sync must not duplicate timers');
 time.advance(8100);assert(played>0&&painted>0);assert(!active);assert.equal(time.tasks.size,1,'Only a quiet timeout between events');
 assert(waits[0]>=4000&&waits[0]<=8000);assert(waits[1]>=14000&&waits[1]<=30000);
 allowed=false;director.sync();assert.equal(time.tasks.size,0);const stopped=played;time.advance(60000);assert.equal(played,stopped);
 allowed=true;director.sync();time.advance(4000);assert.equal(played,stopped,'Return begins with a fresh wait');time.advance(4000);allowed=false;director.sync();assert(!active);assert.equal(time.tasks.size,0);
 allowed=true;director.sync();time.advance(180000);assert(played>5);assert(cleared>=played-1);director.stop();assert.equal(time.tasks.size,0);
 console.log('PASS: one finite event, quiet gaps, cancellation without stale timers, and fresh waits after returning.');
}
async function testIntegration({failGuests=false,failAnimations=false}={}){
 const time=clock(),els=new Map(),get=id=>{if(!els.has(id))els.set(id,new Element());return els.get(id);};
 const document=new Element();document.baseURI='http://preview/';document.hidden=false;document.documentElement={lang:'en'};
 let entered=true;document.body=new Element();document.body.classList={contains:()=>entered};document.body.dataset.view='room';
 document.querySelector=id=>id==='dialog[open]'?null:get(id);document.querySelectorAll=()=>[];document.createElement=()=>new Element();
 const media=new Element();media.matches=false;const window=Object.assign(new Element(),time);const storage=new Map(),observations=[];
 get('#remote').hidden=true;
 let spot=null;const visits=[],renderStates=[],overrides=new Map();
 const renderer={data:placements,motionData:{animations:clips},render:(s,state)=>{spot=s.id;visits.push(s.id);renderStates.push(state);},clear:()=>{spot=null;}};
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
 time.advance(360000);if(!failGuests){assert(visits.length>0);assert(!visits.includes('painter'),'Painter only appears on artwork opening');assert(renderStates.some(s=>s.frame>0));assert(renderStates.some(s=>s.glow>0));}
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
