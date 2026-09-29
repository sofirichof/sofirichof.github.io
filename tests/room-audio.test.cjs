const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
function harness(saved=null){
 const timers=new Map(),events=[],listeners={};let timerId=0,contexts=0;
 const param=()=>({value:0,setTargetAtTime(value){this.value=value;}});
 const context={currentTime:0,state:'suspended',resume:async function(){this.state='running';},suspend:async function(){this.state='suspended';},addEventListener(){}};
 const music={enabled:false,context:null,timer:null,setup(){contexts++;this.context=context;this.music={gain:param()};},duck(value){this.ducked=value;},schedule(){}};
 class Textures{
  constructor(){this.effectCache=new Map();this.effectCount=0;}
  setup(_,shared){this.context=shared;this.master={gain:param()};}
  levels(){}
  syncOutside(){this.scheduled=this.ambient&&this.outsideMode!=='off'&&this.outsideLevel>0;}
  setOutsideMode(mode){this.outsideMode=mode;}
  async effectBuffer(){return{buffer:{},peak:.16};}
 }
 const document={hidden:false,dispatchEvent(event){events.push(event);}};
 const window={nocheSound:music,NocheRoomTextures:Textures,addEventListener(name,fn){listeners[name]=fn;}};
 const storage={value:saved,getItem(){return this.value;},setItem(_,value){this.value=value;}};
 const sandbox={window,document,localStorage:storage,CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},console,
  setTimeout(fn,delay){timers.set(++timerId,{fn,delay});return timerId;},clearTimeout(id){timers.delete(id);},
  setInterval(fn,delay){timers.set(++timerId,{fn,delay,interval:true});return timerId;},clearInterval(id){timers.delete(id);}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'room-audio.js'),'utf8'),sandbox);
 return{sound:window.nocheSound,music,context,document,events,storage,listeners,timers,contexts:()=>contexts};
}
test('fresh visits never autoplay; saved values are validated',()=>{
 const h=harness('{"music":9,"outside":-3,"profile":"broken","enabled":true}');
 assert.equal(h.contexts(),0);assert.equal(h.sound.enabled,false);assert.equal(h.sound.settings.music,1);assert.equal(h.sound.settings.outside,0);assert.equal(h.sound.settings.profile,'both');
});
test('one shared context; independent film/record reasons cannot unmute each other',async()=>{
 const h=harness();await h.sound.enable(true);await h.sound.enable(true);
 assert.equal(h.contexts(),1);assert.equal(h.sound.textures.context,h.context);assert.ok(h.music.timer);assert.equal(h.sound.textures.ambient,true);
 h.sound.duck(true,'film');h.sound.duck(true,'record');h.sound.duck(false,'film');
 assert.equal(h.sound.ducked,true);assert.equal(h.music.timer,null);assert.equal(h.sound.textures.ambient,false);
 h.sound.duck(false,'record');assert.equal(h.sound.ducked,false);assert.ok(h.music.timer);assert.equal(h.sound.textures.ambient,true);
});
test('music at zero stops its scheduler while the night continues',async()=>{
 const h=harness();await h.sound.enable(true);h.sound.setLevel('music',0);
 assert.equal(h.music.timer,null);assert.equal(h.sound.textures.ambient,true);assert.equal(h.sound.textures.scheduled,true);
 h.sound.setProfile('off');assert.equal(h.sound.textures.scheduled,false);
 h.sound.setLevel('music',.6);assert.ok(h.music.timer);
});
test('tab hiding cancels ambience/music and suspension is cancellable on return',async()=>{
 const h=harness();await h.sound.enable(true);h.document.hidden=true;h.sound.level();
 assert.equal(h.music.timer,null);assert.equal(h.sound.textures.ambient,false);
 const pending=[...h.timers.values()].find(t=>t.delay===320);assert.ok(pending);
 await pending.fn();assert.equal(h.context.state,'suspended');
 h.document.hidden=false;h.sound.level();await Promise.resolve();await Promise.resolve();
 assert.equal(h.context.state,'running');assert.ok(h.music.timer);assert.equal(h.sound.textures.ambient,true);
});
test('a mute during pending permission wins over the old enable request',async()=>{
 const h=harness();let resume;h.context.resume=()=>new Promise(resolve=>{resume=()=>{h.context.state='running';resolve();};});
 const enabling=h.sound.enable(true);await h.sound.enable(false);resume();await enabling;
 assert.equal(h.sound.enabled,false);assert.equal(h.music.enabled,false);assert.equal(h.music.timer,null);
});
test('mute persists through media close, and stored mix does not grant autoplay',async()=>{
 const h=harness();await h.sound.enable(true);h.sound.duck(true,'film');await h.sound.enable(false);h.sound.duck(false,'film');
 assert.equal(h.sound.enabled,false);assert.equal(h.music.timer,null);assert.equal(h.sound.textures.ambient,false);
 h.sound.setLevel('horns',.25);h.sound.setProfile('night');const fresh=harness(h.storage.value);
 assert.equal(fresh.sound.settings.horns,.25);assert.equal(fresh.sound.settings.profile,'night');assert.equal(fresh.sound.enabled,false);assert.equal(fresh.contexts(),0);
});
test('late object rendering cannot play after muting',async()=>{
 const h=harness();await h.sound.enable(true);let resolveBuffer;
 h.sound.textures.effectBuffer=()=>new Promise(resolve=>{resolveBuffer=resolve;});
 let attempts=0;h.context.createBufferSource=()=>{attempts++;throw Error('A muted effect attempted to play');};
 const pending=h.sound.effect('album');await h.sound.enable(false);resolveBuffer({buffer:{},peak:.16});await pending;
 assert.equal(h.sound.objects.size,0);assert.equal(attempts,0);
});
test('ambient shuffle bags cover all variations without adjacent repeats',()=>{
 const window={};vm.runInNewContext(fs.readFileSync(path.join(root,'room-textures.js'),'utf8'),{window});
 const textures=new window.NocheRoomTextures();textures.live=true;
 const sequence=Array.from({length:60},()=>textures.nextClip('traffic',3));
 for(let i=1;i<sequence.length;i++)assert.notEqual(sequence[i],sequence[i-1]);
 for(let i=0;i<sequence.length;i+=3)assert.equal(new Set(sequence.slice(i,i+3)).size,3);
});
