/* Shared room textures and object voices for the site and listening study.
   Original procedural sounds; no external samples. */
(() => {
 class RoomTextures {
  constructor(){this.context=null;this.ambient=false;this.roomLevel=.22;this.outsideLevel=.4;this.cricketsLevel=.65;this.trafficLevel=.55;this.hornsLevel=.45;this.chatterLevel=.38;this.outsideMode='night';this.foleyLevel=.55;this.effectCache=new Map();this.outsideTimer=null;this.outsideSources=new Set();this.outsideCount={crickets:0,traffic:0,horns:0,chatter:0};this.previewVoice=null;}
  async ready(){
   if(!this.context)this.setup();
   await this.context.resume();
   if(this.context.state!=='running')throw new Error('Audio is not running');
  }
  setup(renderContext=null,sharedContext=null){
   const Audio=window.AudioContext||window.webkitAudioContext;
   const c=this.context=renderContext||sharedContext||new Audio();
   this.master=c.createGain();this.master.gain.value=.8;this.master.connect(c.destination);
   this.room=c.createGain();this.room.gain.value=0;this.room.connect(this.master);
   this.outside=c.createGain();this.outside.gain.value=0;this.outside.connect(this.master);
   this.crickets=c.createGain();this.crickets.gain.value=0;this.crickets.connect(this.outside);
   this.traffic=c.createGain();this.traffic.gain.value=0;this.traffic.connect(this.outside);
   this.horns=c.createGain();this.horns.gain.value=0;this.horns.connect(this.outside);
   this.chatter=c.createGain();this.chatter.gain.value=0;this.chatter.connect(this.outside);
   this.foley=c.createGain();this.foley.gain.value=this.foleyLevel;this.foley.connect(this.master);
   // Paper and mechanical transients need high frequencies that the soft room
   // noise deliberately removes. Give them their own broad-spectrum source.
   this.effectNoise=c.createBuffer(1,c.sampleRate*2,c.sampleRate);
   const effectSamples=this.effectNoise.getChannelData(0);let effectSeed=1889;
   for(let i=0;i<effectSamples.length;i++){effectSeed=(1664525*effectSeed+1013904223)>>>0;effectSamples[i]=effectSeed/2147483648-1;}
   if(renderContext){this.master.gain.value=1;this.foley.gain.value=1;return;}
   const blend=Math.floor(c.sampleRate*.5),length=Math.ceil(c.sampleRate*19);
   this.noise=c.createBuffer(2,length-blend,c.sampleRate);
   let seed=7391;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
   for(let channel=0;channel<2;channel++){
    const raw=new Float32Array(length),data=this.noise.getChannelData(channel);let last=0;
    for(let i=0;i<raw.length;i++){last=.96*last+.04*(random()*2-1);raw[i]=last*3;}
    // Fold the end over the beginning. The shortened loop joins adjacent samples.
    data.set(raw.subarray(0,length-blend));
    for(let i=0;i<blend;i++){const weight=.5-.5*Math.cos(Math.PI*i/blend);data[i]=raw[i]*weight+raw[length-blend+i]*(1-weight);}
   }
   const bed=(bus,frequency,type)=>{
    const source=c.createBufferSource(),filter=c.createBiquadFilter();source.buffer=this.noise;source.loop=true;
    filter.type=type;filter.frequency.value=frequency;filter.Q.value=.45;
    source.connect(filter);filter.connect(bus);source.start(0,type==='lowpass'?4:0);
   };
   bed(this.room,380,'lowpass');
   const exteriorAir=c.createGain();exteriorAir.gain.value=.006;exteriorAir.connect(this.outside);bed(exteriorAir,850,'bandpass');
   this.outsideBuffers=window.NocheOutside.create(c);
  }
  levels(){
   if(!this.context)return;
   const t=this.context.currentTime,active=this.ambient&&!document.hidden;
   this.room.gain.setTargetAtTime(active?this.roomLevel*.04:0,t,.4);
   this.outside.gain.setTargetAtTime(active&&this.outsideMode!=='off'?this.outsideLevel:0,t,.6);
   this.crickets.gain.setTargetAtTime(['night','both'].includes(this.outsideMode)?this.cricketsLevel:0,t,.5);
   this.traffic.gain.setTargetAtTime(['traffic','both'].includes(this.outsideMode)?this.trafficLevel:0,t,.5);
   this.horns.gain.setTargetAtTime(['traffic','both'].includes(this.outsideMode)?this.hornsLevel:0,t,.5);
   this.chatter.gain.setTargetAtTime(['traffic','both'].includes(this.outsideMode)?this.chatterLevel:0,t,.5);
   this.foley.gain.setTargetAtTime(document.hidden?0:this.foleyLevel,t,.03);
   if(this.previewVoice){const v=this.previewVoice;v.gain.gain.setTargetAtTime(document.hidden?0:.9*this.outsideLevel*this[v.kind+'Level'],t,.03);}
  }
  async setAmbient(value){this.ambient=value;if(value)await this.ready();this.levels();this.syncOutside();}
  setLevel(name,value){this[name+'Level']=Math.max(0,Math.min(1,value));this.levels();this.syncOutside();}
  setOutsideMode(mode){
   if(!['off','night','traffic','both'].includes(mode))return;
   this.outsideMode=mode;this.levels();this.syncOutside(true);
  }
  outsideState(){
   document.dispatchEvent(new CustomEvent('noche:outside-state',{detail:{mode:this.outsideMode,running:!!this.outsideTimer,active:this.outsideSources.size,...this.outsideCount}}));
  }
  stopOutside(){
   if(this.outsideTimer){clearInterval(this.outsideTimer);this.outsideTimer=null;}
   const t=this.context?.currentTime||0;
   for(const voice of this.outsideSources){voice.gain.gain.cancelScheduledValues(t);voice.gain.gain.setTargetAtTime(0,t,.035);try{voice.source.stop(t+.16);}catch{}}
   this.outsideState();
  }
  syncOutside(reset=false){
   if(!this.context||!this.ambient||document.hidden||this.outsideMode==='off'||this.outsideLevel===0){this.stopOutside();return;}
   if(reset)this.stopOutside();
   if(this.outsideTimer)return;
   this.nextChirp=this.context.currentTime+.35;this.nextCar=this.context.currentTime+.7;
   this.nextHorn=this.context.currentTime+2;this.nextChatter=this.context.currentTime+4.3;
   if(this.live){this.nextCar+=5+Math.random()*6;this.nextHorn+=18+Math.random()*15;this.nextChatter+=7+Math.random()*8;}
   this.outsideTimer=setInterval(()=>this.scheduleOutside(),200);this.outsideState();
  }
  scheduleOutside(){
   if(!this.ambient||document.hidden||this.context.state!=='running'){this.stopOutside();return;}
   const t=this.context.currentTime;
   if(['night','both'].includes(this.outsideMode)&&this.cricketsLevel>0&&t>=this.nextChirp){
    this.exteriorVoice('crickets');this.nextChirp=t+2.1+Math.random()*3.1;
   }
   if(['traffic','both'].includes(this.outsideMode)&&this.trafficLevel>0&&t>=this.nextCar){
    this.exteriorVoice('traffic');this.nextCar=t+18+Math.random()*12;
   }
   if(['traffic','both'].includes(this.outsideMode)&&this.hornsLevel>0&&t>=this.nextHorn){
    this.exteriorVoice('horns');this.nextHorn=t+30+Math.random()*25;
   }
   if(['traffic','both'].includes(this.outsideMode)&&this.chatterLevel>0&&t>=this.nextChatter){
    this.exteriorVoice('chatter');this.nextChatter=t+18+Math.random()*18;
   }
  }
  exteriorVoice(kind,preview=false){
   if(this.live&&(this.outsideSources.size>=4||[...this.outsideSources].some(voice=>voice.kind===kind)))return;
   const c=this.context,clips=this.outsideBuffers[kind],index=this.nextClip(kind,clips.length),clip=clips[index];
   const source=c.createBufferSource(),gain=c.createGain(),pan=c.createStereoPanner(),voice={source,gain,pan,kind};
   const strength=preview?.9*this.outsideLevel*this[kind+'Level']:.78+Math.random()*.22;
   source.buffer=clip.buffer;gain.gain.setValueAtTime(0,c.currentTime);gain.gain.linearRampToValueAtTime(strength,c.currentTime+.025);
   pan.pan.value=kind==='crickets'?[-.3,.23,-.12][index]:kind==='horns'?[-.25,.2,.1][index]:0;
   source.connect(gain);gain.connect(pan);pan.connect(preview?this.master:this[kind]);this.outsideSources.add(voice);this.outsideCount[kind]++;
   source.onended=()=>{source.disconnect();gain.disconnect();pan.disconnect();this.outsideSources.delete(voice);if(this.previewVoice===voice)this.previewVoice=null;this.outsideState();};
   if(preview)this.previewVoice=voice;
   source.start(c.currentTime+.01);this.outsideState();
   return{peak:clip.peak*strength*.8,rms:clip.rms*strength*.8,state:c.state,muted:false};
  }
  nextClip(kind,length){
   if(!this.live)return this.outsideCount[kind]%length;
   this.bags??={};this.lastClip??={};
   if(!this.bags[kind]?.length){
    const bag=Array.from({length},(_,i)=>i);
    for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
    if(length>1&&bag[bag.length-1]===this.lastClip[kind])[bag[0],bag[length-1]]=[bag[length-1],bag[0]];
    this.bags[kind]=bag;
   }
   return this.lastClip[kind]=this.bags[kind].pop();
  }
  async auditionOutside(kind){
   if(!['traffic','horns','chatter'].includes(kind))throw new Error('Unknown street sound');
   await this.ready();if(document.hidden)throw new Error('Return to the study to listen');
   if(this.previewVoice){const old=this.previewVoice,t=this.context.currentTime;old.gain.gain.cancelScheduledValues(t);old.gain.gain.setTargetAtTime(0,t,.02);try{old.source.stop(t+.1);}catch{}this.previewVoice=null;}
   if(!this.outsideLevel||!this[kind+'Level'])return{peak:0,rms:0,state:this.context.state,muted:true};
   return this.exteriorVoice(kind,true);
  }
  burst({delay=0,length=.08,frequency=1800,type='bandpass',volume=.07,pan=0,attack=.006}){
   const c=this.context,start=c.currentTime+delay,source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain(),stereo=c.createStereoPanner();
   source.buffer=this.effectNoise;filter.type=type;filter.frequency.value=frequency;filter.Q.value=.6;stereo.pan.value=pan;
   gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+attack);gain.gain.exponentialRampToValueAtTime(.00001,start+length);
   source.connect(filter);filter.connect(gain);gain.connect(stereo);stereo.connect(this.foley);
   source.start(start,Math.random()*.7);source.stop(start+length+.02);
   source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();stereo.disconnect();};
  }
  tap(frequency=170,volume=.008,length=.09){
   const c=this.context,t=c.currentTime,source=c.createOscillator(),gain=c.createGain();source.type='sine';source.frequency.setValueAtTime(frequency,t);source.frequency.exponentialRampToValueAtTime(frequency*.7,t+length);
   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(volume,t+.003);gain.gain.exponentialRampToValueAtTime(.00001,t+length);
   source.connect(gain);gain.connect(this.foley);source.start(t);source.stop(t+length+.02);source.onended=()=>{source.disconnect();gain.disconnect();};
  }
  perform(kind){
   const variation=.94+Math.random()*.12;
   if(kind==='remote'){
    this.burst({length:.032,frequency:2500*variation,volume:.065,pan:.12});
    this.burst({delay:.045,length:.024,frequency:1700,volume:.032,pan:.12});this.tap(230,.008,.038);
   }else if(kind==='page'){
    this.burst({length:.31,frequency:2600*variation,volume:.055,pan:-.18,attack:.055});
    this.burst({delay:.09,length:.24,frequency:1600,volume:.045,pan:.12,attack:.03});
    this.burst({delay:.28,length:.08,frequency:3400,volume:.025,pan:.18});
   }else if(kind==='album'){
    this.burst({length:.16,frequency:700,volume:.07,pan:-.13,attack:.018});
    this.burst({delay:.14,length:.22,frequency:2100,volume:.027,pan:.08,attack:.035});this.tap(145,.025,.16);
   }else if(kind==='tune'){
    this.burst({length:.16,frequency:1400*variation,volume:.13,pan:.05,attack:.018});
    this.burst({delay:.06,length:.10,frequency:2900,volume:.038,pan:.05});
   }
  }
  async effectBuffer(kind){
   if(!['remote','page','album','tune'].includes(kind))throw new Error('Unknown object sound');
   if(!this.effectCache.has(kind))this.effectCache.set(kind,(async()=>{
    const Offline=window.OfflineAudioContext||window.webkitOfflineAudioContext;
    const context=new Offline(2,Math.ceil(24000*.75),24000),voice=new RoomTextures();voice.setup(context);voice.perform(kind);
    const buffer=await context.startRendering();let peak=0,energy=0;
    for(let c=0;c<buffer.numberOfChannels;c++)for(const sample of buffer.getChannelData(c))peak=Math.max(peak,Math.abs(sample));
    if(!Number.isFinite(peak)||peak<.00001)throw new Error('Object sound was silent');
    // Match each transient's peak before applying the listener's volume slider.
    // At 55%, final peak is .0704, comparable to the music's .06-.07 peaks.
    const gain=.16/peak;
    for(let c=0;c<buffer.numberOfChannels;c++){
     const samples=buffer.getChannelData(c);
     for(let i=0;i<samples.length;i++){samples[i]*=gain;energy+=samples[i]*samples[i];}
    }
    return{buffer,peak:.16,rms:Math.sqrt(energy/(buffer.length*buffer.numberOfChannels))};
   })());
   try{return await this.effectCache.get(kind);}catch(error){this.effectCache.delete(kind);throw error;}
  }
  async play(kind){
   await this.ready();const clip=await this.effectBuffer(kind);this.levels();
   if(this.foleyLevel===0)return{peak:0,rms:0,state:this.context.state,muted:true};
   const source=this.context.createBufferSource();source.buffer=clip.buffer;source.connect(this.foley);source.start(this.context.currentTime+.012);source.onended=()=>source.disconnect();
   return{peak:clip.peak*this.foleyLevel*.8,rms:clip.rms*this.foleyLevel*.8,state:this.context.state,muted:this.foleyLevel===0};
  }
 }
 window.NocheRoomTextures=RoomTextures;
})();
