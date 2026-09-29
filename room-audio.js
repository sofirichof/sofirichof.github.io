/* Game-style room mixer. One AudioContext, separate buses, scene states and
   bounded ambient events. Keeps the existing four compositions intact. */
(() => {
 'use strict';
 const defaults={music:1,room:.22,outside:.4,foley:.55,crickets:.65,traffic:.55,horns:.45,chatter:.38,profile:'both'};
 const profiles=['off','night','traffic','both'],storageKey='noche-room-mix-v1';
 class RoomAudio {
  constructor(music){
   this.musicEngine=music;this.enabled=false;this.scene='room';this.blockers=new Set();
   this.settings={...defaults};this.revision=0;this.effectRevision=0;this.objects=new Set();this.lastEffect={};this.pageHidden=false;
   this.musicPaused=false;this.musicLoading=false;this.musicError=false;this.selectionRevision=0;this.returnTrackId=null;
   this.musicEngine.onTrackChange=()=>this.publish();
   try{const saved=JSON.parse(localStorage.getItem(storageKey));for(const key of Object.keys(defaults)){
    if(key==='profile'){if(profiles.includes(saved?.profile))this.settings.profile=saved.profile;}
    else if(typeof saved?.[key]==='number'&&Number.isFinite(saved[key]))this.settings[key]=Math.max(0,Math.min(1,saved[key]));
   }}catch{}
   // Persist the mix, never permission to start audio on a new visit.
   window.addEventListener('pagehide',()=>{this.pageHidden=true;this.level();});
   window.addEventListener('pageshow',()=>{this.pageHidden=false;this.level();});
  }
  get tracks(){return this.musicEngine.tracks||[];}
  get currentTrack(){return this.tracks[this.musicEngine.trackIndex||0];}
  get musicPlaying(){return this.audible&&!this.musicPaused&&!this.musicLoading&&this.settings.music>0&&this.context?.state==='running'&&!!this.musicEngine.timer;}
  get context(){return this.musicEngine.context;}
  get ducked(){return this.blockers.size>0;}
  get hidden(){return document.hidden||this.pageHidden;}
  get audible(){return this.enabled&&!this.hidden&&!this.ducked;}
  async enable(value){
   const revision=++this.revision;this.enabled=!!value;
   if(!value){this.selectionRevision++;if(this.musicLoading)this.returnTrackId=null;this.musicLoading=false;this.musicEngine.enabled=false;this.level();return false;}
   try{
    if(!this.context)this.musicEngine.setup();
    // Resume in the click gesture, before generating the reusable short buffers.
    const resumed=this.context.resume();
    if(!this.textures){
     this.textures=new window.NocheRoomTextures();this.textures.live=true;this.textures.setup(null,this.context);
     this.context.addEventListener('statechange',()=>this.level());
    }
    await resumed;
    if(revision!==this.revision)return this.enabled;
    if(this.context.state!=='running')throw new Error('Audio could not start');
    this.musicEngine.enabled=true;this.level();
    if(!this.warmed){this.warmed=true;Promise.allSettled(['remote','tune','album','page'].map(kind=>this.textures.effectBuffer(kind)));}
    return true;
   }catch{
    if(revision===this.revision){this.enabled=false;this.musicEngine.enabled=false;this.level();}
    return this.enabled;
   }
  }
  async chooseSong(id){
   const automatic=id==='auto';
   const index=automatic?(this.currentTrack?.auto===false?0:this.musicEngine.trackIndex||0):this.tracks.findIndex(track=>track.id===id);
   if(index<0)return false;
   const request=++this.selectionRevision;this.returnTrackId=automatic?null:id;
   this.requestedTrackId=id;this.musicLoading=true;this.musicError=false;this.level();
   try{
    const enabled=await this.enable(true);
    if(request!==this.selectionRevision)return false;
    if(!enabled){this.musicLoading=false;this.musicError=true;this.returnTrackId=null;this.publish();return false;}
    await this.musicEngine.loadTrack(index);
    if(!this.enabled||request!==this.selectionRevision)return false;
    this.musicLoading=false;this.musicPaused=false;
    if(this.settings.music===0){this.settings.music=1;this.save();}
    this.musicEngine.selectTrack(index,automatic?'auto':'once');this.level();return true;
   }catch{
    if(request===this.selectionRevision){this.musicLoading=false;this.musicError=true;this.returnTrackId=null;this.level();}
    return false;
   }
  }
  async toggleMusic(){
   if(this.musicPlaying){this.musicPaused=true;this.level();return;}
   this.musicPaused=false;
   if(this.settings.music===0){this.settings.music=1;this.save();}
   await this.enable(true);this.level();
  }
  restartSelectionForRoom(){
   const id=this.returnTrackId;this.returnTrackId=null;
   if(!id||this.musicLoading)return;
   const index=this.tracks.findIndex(track=>track.id===id);
   if(index>=0){this.musicEngine.selectTrack(index,'once');this.level();}
  }
  setLevel(name,value){
   if(name==='profile'||!Object.hasOwn(defaults,name)||!Number.isFinite(value))return;
   this.settings[name]=Math.max(0,Math.min(1,value));this.save();this.level();
  }
  setProfile(profile){
   if(!profiles.includes(profile))return;
   this.settings.profile=profile;this.save();
   if(this.textures)this.textures.setOutsideMode(profile);
   this.level();
  }
  save(){try{localStorage.setItem(storageKey,JSON.stringify(this.settings));}catch{}}
  reset(){this.settings={...defaults};this.save();if(this.textures)this.textures.setOutsideMode(this.settings.profile);this.level();}
  setScene(scene){this.scene=scene;this.level();}
  duck(value,reason='film'){value?this.blockers.add(reason):this.blockers.delete(reason);this.level();}
  stopClock(){if(this.musicEngine.timer){clearInterval(this.musicEngine.timer);this.musicEngine.timer=null;this.musicEngine.pauseTransport?.();}}
  level(){
   const c=this.context,active=this.audible;
   clearTimeout(this.suspendTimer);
   if(!active&&this.wasAudible){this.effectRevision++;for(const source of this.objects){try{source.stop(c.currentTime+.07);}catch{}}}
   this.wasAudible=active;
   if(c){
    this.musicEngine.duck(this.ducked||this.hidden);
    this.musicEngine.music.gain.setTargetAtTime(.6*this.settings.music,c.currentTime,.15);
    if(active&&!this.musicPaused&&!this.musicLoading&&this.settings.music>0&&c.state==='running'){
     if(!this.musicEngine.timer){this.musicEngine.nextBeat=c.currentTime+.12;this.musicEngine.timer=setInterval(()=>this.musicEngine.schedule(),100);}
    }else this.stopClock();
    if(this.textures){
     const textures=this.textures;
     for(const key of Object.keys(defaults))if(!['music','profile'].includes(key))textures[key+'Level']=this.settings[key];
     textures.outsideMode=this.settings.profile;textures.ambient=active&&c.state==='running';
     // Reading is a little quieter; film and record sessions take full priority.
     const reading=['album','art','guide','about'].includes(this.scene);
     textures.master.gain.setTargetAtTime(active?.8:0,c.currentTime,.12);
     textures.outsideLevel*=reading?.8:1;
     textures.levels();textures.syncOutside();
    }
    if(!this.enabled||this.hidden){
     if(c.state==='running')this.suspendTimer=setTimeout(()=>{if(!this.enabled||this.hidden)c.suspend().catch(()=>{});},320);
    }else if(c.state==='suspended'&&!this.resuming){
     this.resuming=c.resume().then(()=>{this.resuming=null;this.level();},()=>{this.resuming=null;this.publish();});
    }
   }
   this.publish();
  }
  publish(){
   document.dispatchEvent(new CustomEvent('noche:audio-state',{detail:{enabled:this.enabled,ducked:this.ducked,hidden:this.hidden,scene:this.scene,profile:this.settings.profile,context:this.context?.state||'not-started',musicRunning:!!this.musicEngine.timer,musicPlaying:this.musicPlaying,track:this.currentTrack?.id||null,mode:this.musicEngine.selectionMode||'auto',settings:{...this.settings}}}));
  }
  async effect(kind){
   if(!this.audible||!this.textures||this.context.state!=='running'||this.settings.foley===0)return;
   const now=this.context.currentTime,cooldown=kind==='album'?.35:kind==='tune'?.18:.08;
   if(now-(this.lastEffect[kind]??-Infinity)<cooldown)return;
   this.lastEffect[kind]=now;const revision=this.effectRevision;
   try{
    const clip=await this.textures.effectBuffer(kind);
    if(revision!==this.effectRevision||!this.audible||this.objects.size>=3||this.settings.foley===0)return;
    const source=this.context.createBufferSource();source.buffer=clip.buffer;source.connect(this.textures.foley);this.objects.add(source);
    source.onended=()=>{source.disconnect();this.objects.delete(source);};source.start(this.context.currentTime+.008);
    document.dispatchEvent(new CustomEvent('noche:object-sound',{detail:{kind,peak:clip.peak*this.settings.foley*.8}}));
   }catch{/* A failed optional effect must not interrupt portfolio navigation. */}
  }
  click(){return this.effect('remote');}
  tune(){return this.effect('tune');}
 }
 window.NocheRoomAudio=RoomAudio;
 window.nocheSound=new RoomAudio(window.nocheSound);
})();
