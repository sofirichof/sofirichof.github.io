const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
function harness(){
 const timers=new Map(),events=[],contexts=[],listeners={};let resumeFails=false,timerId=0,fetcher=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)});
 const param=()=>({value:0,setValueAtTime(v){this.value=v;},linearRampToValueAtTime(v){this.value=v;},exponentialRampToValueAtTime(v){this.value=v;},setTargetAtTime(v){this.value=v;},cancelScheduledValues(){}});
 const node=()=>({connect(){},disconnect(){},gain:param(),frequency:param(),Q:param(),pan:param(),delayTime:param(),threshold:param(),knee:param(),ratio:param(),attack:param(),release:param()});
 class AudioContext{
  constructor(){this.currentTime=0;this.state='suspended';this.sampleRate=100;this.destination={};this.sources=[];contexts.push(this);}
  async resume(){if(resumeFails)throw Error('Audio start rejected');this.state='running';}async suspend(){this.state='suspended';}addEventListener(){}
  createGain(){return node();}createDynamicsCompressor(){return node();}createDelay(){return node();}createBiquadFilter(){return node();}createStereoPanner(){return node();}
  createOscillator(){return {...node(),start(){},stop(){}};}
  createBuffer(channels,length,rate){return{duration:length/rate,getChannelData:()=>new Float32Array(length)};}
  createBufferSource(){const source={...node(),start(at,offset=0){this.startedAt=at;this.offset=offset;},stop(){this.stopped=true;}};this.sources.push(source);return source;}
  async decodeAudioData(){return{duration:18};}
 }
 class Textures{
  setup(_,context){this.context=context;this.master=node();}
  levels(){}syncOutside(){this.scheduled=this.ambient&&this.outsideMode!=='off'&&this.outsideLevel>0;}
  setOutsideMode(mode){this.outsideMode=mode;}async effectBuffer(){return {buffer:{},peak:.16};}
 }
 const document={hidden:false,addEventListener(){},dispatchEvent(event){events.push(event);}};
 const window={AudioContext,NocheRoomTextures:Textures,addEventListener(name,fn){listeners[name]=fn;}};
 const sandbox=vm.createContext({window,document,console,localStorage:{getItem(){return null;},setItem(){}},fetch:(...a)=>fetcher(...a),
  CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},
  setInterval(fn,delay){timers.set(++timerId,{fn,delay});return timerId;},clearInterval(id){timers.delete(id);},
  setTimeout(fn,delay){timers.set(++timerId,{fn,delay});return timerId;},clearTimeout(id){timers.delete(id);}});
 for(const file of ['soundscape.js','room-audio.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox);
 return{sound:window.nocheSound,contexts,document,events,listeners,failResume(value){resumeFails=value;},setFetch(fn){fetcher=fn;}};
}
test('a selected theme plays once then returns to the four-theme rotation',async()=>{
 const h=harness(),s=h.sound;assert.equal(s.enabled,false);
 assert.equal(await s.chooseSong('one-more-page'),true);
 assert.equal(s.currentTrack.id,'one-more-page');assert.equal(s.musicEngine.selectionMode,'once');assert.equal(s.musicPlaying,true);
 const c=s.context;
 for(let t=0;t<67;t+=.1){c.currentTime=t;s.musicEngine.schedule();}
 assert.equal(s.currentTrack.id,'night-channel');assert.equal(s.musicEngine.selectionMode,'auto');
 assert.ok(h.events.some(e=>e.detail.track==='night-channel'&&e.detail.mode==='auto'));
});
test('return to the room restarts a chosen song exactly once and respects mute',async()=>{
 const s=harness().sound;await s.chooseSong('window-lights');
 s.context.currentTime=9;s.musicEngine.schedule();assert.ok(s.musicEngine.beat>0);
 s.restartSelectionForRoom();assert.equal(s.musicEngine.beat,0);assert.equal(s.returnTrackId,null);assert.equal(s.musicEngine.selectionMode,'once');
 s.musicEngine.beat=6;s.restartSelectionForRoom();assert.equal(s.musicEngine.beat,6);
 await s.chooseSong('after-the-credits');await s.enable(false);s.restartSelectionForRoom();
 assert.equal(s.enabled,false);assert.equal(s.musicPlaying,false);assert.equal(s.musicEngine.timer,null);
});
test('music pause keeps ambience, resumes the same choice, and explicit play restores zero music volume',async()=>{
 const s=harness().sound;await s.chooseSong('night-channel');await s.toggleMusic();
 assert.equal(s.musicPaused,true);assert.equal(s.musicPlaying,false);assert.equal(s.textures.scheduled,true);
 await s.toggleMusic();assert.equal(s.musicPlaying,true);assert.equal(s.currentTrack.id,'night-channel');
 s.setLevel('music',0);assert.equal(s.musicPlaying,false);await s.toggleMusic();assert.equal(s.settings.music,1);assert.equal(s.musicPlaying,true);
});
test('guitar sample pauses at its offset, ignores a stopped source ending, and finishes into rotation',async()=>{
 const s=harness().sound;await s.chooseSong('guitar-pulse');const m=s.musicEngine;m.schedule();
 const first=m.sampleSource;assert.ok(first);s.context.currentTime=5;await s.toggleMusic();
 assert.equal(first.stopped,true);assert.ok(m.sampleOffset>4.9&&m.sampleOffset<5);
 first.onended();assert.equal(s.currentTrack.id,'guitar-pulse');
 await s.toggleMusic();m.schedule();const resumed=m.sampleSource;
 assert.notEqual(resumed,first);assert.ok(resumed.offset>4.9);
 resumed.onended();assert.equal(s.currentTrack.id,'night-channel');assert.equal(m.selectionMode,'auto');
});
test('a later choice or mute cannot be overridden by a slow guitar download',async()=>{
 const h=harness(),s=h.sound;let resolve,started;const fetching=new Promise(r=>started=r);h.setFetch(()=>new Promise(r=>{resolve=r;started();}));
 const pending=s.chooseSong('guitar-pulse');await fetching;
 await s.chooseSong('window-lights');resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)});await pending;
 assert.equal(s.currentTrack.id,'window-lights');assert.equal(s.returnTrackId,'window-lights');
 const h2=harness();let finish,started2;const fetching2=new Promise(r=>started2=r);h2.setFetch(()=>new Promise(r=>{finish=r;started2();}));
 const loading=h2.sound.chooseSong('guitar-pulse');await fetching2;
 await h2.sound.enable(false);finish({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)});await loading;
 assert.equal(h2.sound.returnTrackId,null);assert.equal(h2.sound.enabled,false);assert.equal(h2.sound.musicPlaying,false);assert.equal(h2.sound.currentTrack.id,'night-channel');
});
test('a failed download is recoverable and does not replace the previous song',async()=>{
 const h=harness();await h.sound.chooseSong('window-lights');h.setFetch(async()=>({ok:false}));
 assert.equal(await h.sound.chooseSong('guitar-pulse'),false);assert.equal(h.sound.musicError,true);assert.equal(h.sound.currentTrack.id,'window-lights');assert.equal(h.sound.musicPlaying,true);
 h.setFetch(async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)}));
 assert.equal(await h.sound.chooseSong('guitar-pulse'),true);assert.equal(h.sound.musicError,false);
});

test('page restore keeps a paused selection paused',async()=>{
 const h=harness(),s=h.sound;await s.chooseSong('window-lights');await s.toggleMusic();
 h.listeners.pagehide();h.listeners.pageshow();
 assert.equal(s.musicPaused,true);assert.equal(s.musicPlaying,false);assert.equal(s.returnTrackId,'window-lights');
});
test('an audio activation failure releases loading and permits another choice',async()=>{
 const h=harness();h.failResume(true);
 assert.equal(await h.sound.chooseSong('night-channel'),false);assert.equal(h.sound.musicLoading,false);assert.equal(h.sound.musicError,true);
 h.failResume(false);assert.equal(await h.sound.chooseSong('window-lights'),true);assert.equal(h.sound.musicPlaying,true);
});
