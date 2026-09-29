/* Four original room themes plus a manually selected pixel-guitar arrangement.
   Electric keys alternate with soft plucked tones, over filtered room tone.
   Starts only after an explicit sound gesture. */
(() => {
  class NocheSound {
    constructor() {
      this.enabled=false; this.ducked=false; this.context=null; this.timer=null; this.nextBeat=0; this.beat=0; this.trackIndex=0;
      this.voices=new Set();this.buffers=new Map();this.loads=new Map();this.sampleSource=null;this.sampleOffset=0;this.selectionMode='auto';
      this.tracks=[
        {id:'night-channel',title:'Night Channel',bpm:72,beats:64,description:'The original electric-key theme, with suspended chords, bass, and quiet room tone.'},
        {id:'after-the-credits',title:'After the Credits',bpm:64,beats:64,description:'Warm plucked synth tones, a slower melody, and a little more room between the notes.'},
        {id:'window-lights',title:'Window Lights',bpm:76,beats:64,description:'A brighter little melody, gently moving keys, and soft bell-like answers.'},
        {id:'one-more-page',title:'One More Page',bpm:66,beats:72,description:'A slow three-beat sway, low warm keys, and a melody that gradually opens up.'},
        {id:'guitar-pulse',title:'A medias de la noche - the inspo',labelKey:'guitarAccompaniment',src:'assets/audio/a-medias-de-la-noche-8bit.mp3?v=melody-1',auto:false,description:'A pixel lead follows the sung melody, with soft guitar strums and space between phrases.'}
      ];
    }
    async enable(value) {
      if (!value) { this.enabled=false; this.level(); return false; }
      try { if (!this.context) this.setup(); await this.context.resume(); this.enabled=true; this.level(); return true; }
      catch { this.enabled=false; return false; }
    }
    setup(renderContext=null) {
      const AudioContext=window.AudioContext||window.webkitAudioContext;
      if (!AudioContext&&!renderContext) throw new Error('Audio unavailable');
      const c=this.context=renderContext||new AudioContext();
      this.master=c.createGain(); this.master.gain.value=0;
      const limiter=c.createDynamicsCompressor(); limiter.threshold.value=-20; limiter.knee.value=18; limiter.ratio.value=4; limiter.attack.value=.01; limiter.release.value=.3;
      this.master.connect(limiter); limiter.connect(c.destination);
      this.music=c.createGain(); this.music.gain.value=.6; this.music.connect(this.master);
      this.effect=c.createGain(); this.effect.gain.value=.42; this.effect.connect(this.master);
      const delay=c.createDelay(2); delay.delayTime.value=.4167;
      const feedback=c.createGain(); feedback.gain.value=.22;
      const filter=c.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=1500;
      const wet=c.createGain(); wet.gain.value=.19;
      delay.connect(filter); filter.connect(feedback); feedback.connect(delay); filter.connect(wet); wet.connect(this.music); this.echo=delay;
      const buffer=c.createBuffer(1,c.sampleRate*4,c.sampleRate),samples=buffer.getChannelData(0);
      let previous=0; for(let i=0;i<samples.length;i++){previous=(previous+Math.random()*.04-.02)/1.018;samples[i]=previous;}
      this.noise=buffer;
      const room=c.createBufferSource(); room.buffer=buffer; room.loop=true;
      const low=c.createBiquadFilter(); low.type='lowpass'; low.frequency.value=400;
      const air=c.createGain(); air.gain.value=.055; room.connect(low); low.connect(air); air.connect(this.music); room.start();
      const hum=c.createOscillator(), humGain=c.createGain(); hum.frequency.value=58; humGain.gain.value=.0025; hum.connect(humGain); humGain.connect(this.music); hum.start();
      if(!renderContext){this.nextBeat=c.currentTime+.12; this.timer=setInterval(()=>this.schedule(),100); this.schedule();}
    }
    level() {
      if(!this.context)return;
      this.master.gain.setTargetAtTime(this.enabled && !this.ducked && !document.hidden ? .55 : 0,this.context.currentTime,.18);
    }
    duck(value) { this.ducked=value; this.level(); }
    note(midi,time,length,volume=.06,type='sine',pan=0,attack=.028) {
      const c=this.context, osc=c.createOscillator(), gain=c.createGain(), low=c.createBiquadFilter(), stereo=c.createStereoPanner();
      osc.type=type; osc.frequency.value=440*Math.pow(2,(midi-69)/12); low.type='lowpass';low.frequency.value=type==='triangle'?900:2400;
      gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+attack);gain.gain.exponentialRampToValueAtTime(.001,time+length);
      stereo.pan.value=pan;osc.connect(low);low.connect(gain);gain.connect(stereo);stereo.connect(this.music);stereo.connect(this.echo);osc.start(time);osc.stop(time+length+.05);
      const voice={osc,gain};this.voices.add(voice);
      osc.onended=()=>{this.voices.delete(voice);osc.disconnect();low.disconnect();gain.disconnect();stereo.disconnect();};
    }
    pluck(midi,time,length,volume=.045,pan=0) {
      this.note(midi,time,length,volume,'triangle',pan,.012);
      this.note(midi+12,time,length*.35,volume*.15,'sine',pan,.006);
      this.note(midi+19,time,length*.2,volume*.05,'sine',pan,.006);
    }
    playBeat(track,step,time,beatLength) {
      if(track===2){this.windowLights(step,time,beatLength);return;}
      if(track===3){this.oneMorePage(step,time,beatLength);return;}
      const bar=Math.floor(step/8),local=step%8;
      if(track===0){
        const harmony=[[45,57,60,64,71],[41,57,60,64,67],[38,57,60,64,69],[40,56,59,62,67]][Math.floor(bar/2)];
        if(local===0){this.note(harmony[0],time,beatLength*5,.07,'triangle');harmony.slice(1).forEach((n,i)=>this.note(n,time+i*.032,beatLength*6,.027,'sine',(i-1.5)*.23));}
        const phrase=[76,null,71,72,null,69,67,null,72,null,76,74,null,71,69,null];
        const melody=phrase[step%16];
        if(melody&&step%2===0)this.note(melody+(bar>3?-12:0),time,beatLength*2.9,.038,'sine',Math.sin(step)*.32);
        if(local===3||local===7)this.note(harmony[2]+12,time,beatLength*1.6,.015,'triangle',local===3?-.35:.35);
        return;
      }
      // Eight short phrases: the second half answers the first in a lower register.
      const harmony=[
        [36,55,59,62,64],[45,55,59,60,64],[41,57,60,64,67],[43,53,57,60,64],
        [40,55,59,62,64],[45,55,59,60,64],[38,57,60,64,65],[43,55,57,60,62]
      ][bar];
      const phrases=[
        [[1,76,1.6],[3.5,74,1],[5,71,2]],
        [[.5,72,1.4],[2,71,1.2],[4.5,67,2.2]],
        [[1,69,1.8],[3.5,72,1.1],[5.5,76,1.6]],
        [[.5,74,1.8],[3,72,1.2],[5,69,2]],
        [[1,67,1.4],[3,71,1.5],[5.5,64,1.8]],
        [[.5,67,1.4],[2.5,64,1.3],[5,60,2]],
        [[1,65,1.4],[3.5,64,1],[5,62,2]],
        [[.5,67,1.4],[3,62,2.4]]
      ][bar];
      if(local===0){
        this.note(harmony[0],time,beatLength*6,.06,'sine',0,.08);
        harmony.slice(1).forEach((n,i)=>this.note(n,time+i*.055,beatLength*6.6,.021,'sine',(i-1.5)*.24,.28));
      }
      for(const [beat,note,length] of phrases)if(Math.floor(beat)===local)this.pluck(note,time+(beat-local)*beatLength,length*beatLength,.042,bar%2?-.18:.18);
      if(local===2||local===6)this.pluck(harmony[local===2?2:3],time+.06,beatLength*1.5,.012,local===2?-.38:.38);
    }
    windowLights(step,time,beatLength){
      const bar=Math.floor(step/8),local=step%8;
      const harmony=[
        [41,57,60,64,67],[38,57,60,64,65],[45,55,59,60,64],[36,55,59,62,64],
        [41,57,60,64,67],[43,55,57,60,64],[40,55,59,62,67],[45,55,59,60,64]
      ][bar];
      const melody=[
        [[.5,72,1.3],[2,76,1.5],[4.5,79,1],[6,76,1.2]],
        [[1,77,1.5],[3,76,1.1],[5,72,2]],
        [[.5,71,1.1],[2,72,1.4],[4.5,76,1.6]],
        [[1,74,1.4],[3.5,71,1.3],[6,67,1.4]],
        [[.5,69,1.2],[2,72,1.4],[4.5,76,1],[6,72,1.4]],
        [[1,74,1.7],[3.5,72,1.2],[5.5,69,1.5]],
        [[.5,67,1.4],[2.5,71,1.3],[5,74,1.8]],
        [[1,72,1.7],[4,71,2.5]]
      ][bar];
      if(local===0){
        this.note(harmony[0],time,beatLength*5.5,.062,'sine',0,.045);
        harmony.slice(1).forEach((note,i)=>this.note(note,time+i*.03,beatLength*5.7,.022,'sine',(i-1.5)*.2,.16));
      }
      if(local===1||local===3||local===5)this.pluck(harmony[1+(local-1)/2],time,beatLength*1.4,.015,local===3?.3:-.25);
      for(const [beat,note,length] of melody)if(Math.floor(beat)===local){
        const at=time+(beat-local)*beatLength;
        this.note(note,at,length*beatLength,.036,'sine',bar%2?-.2:.2,.018);
        this.note(note+12,at,length*beatLength*.35,.0035,'sine',bar%2?-.2:.2,.008);
      }
    }
    oneMorePage(step,time,beatLength){
      const bar=Math.floor(step/3),local=step%3,phrase=bar%8,pass=Math.floor(bar/8);
      const harmony=[
        [45,57,60,64],[41,57,60,64],[36,55,59,64],[43,55,59,62],
        [38,57,60,65],[45,55,60,64],[41,57,60,64],[40,56,59,62]
      ][phrase];
      const melody=[
        [64,67,69,67,65,64,60,62],
        [72,71,67,69,65,67,64,62],
        [64,60,64,62,65,64,60,59]
      ][pass];
      if(local===0){
        this.note(harmony[0],time,beatLength*2.7,.048,'sine',0,.07);
        harmony.slice(1).forEach((note,i)=>this.note(note,time+i*.035,beatLength*2.9,.018,'sine',(i-1)*.24,.12));
        if(phrase!==7||pass===1)this.note(melody[phrase],time+beatLength*.38,beatLength*2.1,.039,'sine',phrase%2?.15:-.15,.045);
      }
      if(local===1)this.pluck(harmony[2],time+.035,beatLength*1.4,.014,-.3);
      if(local===2&&phrase%2===0)this.pluck(harmony[3],time+.06,beatLength*1.2,.011,.28);
      if(local===2&&pass===1&&phrase===6)this.note(67,time,beatLength*1.6,.024,'sine',.1);
    }
    async loadTrack(index) {
      const track=this.tracks[index];if(!track)throw new Error('Unknown room song');
      if(!track.src||this.buffers.has(index))return;
      if(!this.loads.has(index))this.loads.set(index,(async()=>{
        const response=await fetch(track.src);if(!response.ok)throw new Error('Song unavailable');
        const buffer=await this.context.decodeAudioData(await response.arrayBuffer());
        this.buffers.set(index,buffer);
      })().finally(()=>this.loads.delete(index)));
      return this.loads.get(index);
    }
    selectTrack(index,mode='once') {
      if(!this.tracks[index]||(this.tracks[index].src&&!this.buffers.has(index)))return false;
      this.pauseTransport();this.sampleOffset=0;this.trackIndex=index;this.beat=0;
      this.nextBeat=(this.context?.currentTime||0)+.12;this.selectionMode=mode;
      this.onTrackChange?.();return true;
    }
    advanceTrack() {
      do{this.trackIndex=(this.trackIndex+1)%this.tracks.length;}while(this.tracks[this.trackIndex].auto===false);
      this.beat=0;this.sampleOffset=0;this.selectionMode='auto';this.onTrackChange?.();
    }
    pauseTransport() {
      if(!this.context)return;
      const now=this.context.currentTime;
      for(const {osc,gain} of this.voices){
        gain.gain.cancelScheduledValues(now);gain.gain.setTargetAtTime(.00001,now,.018);
        try{osc.stop(now+.07);}catch{}
      }
      this.voices.clear();
      if(this.sampleSource){
        const source=this.sampleSource;this.sampleSource=null;
        this.sampleOffset=Math.min(source.buffer.duration,this.sampleOffset+Math.max(0,now-this.sampleStart));
        this.sampleGain.gain.setTargetAtTime(0,now,.018);
        try{source.stop(now+.07);}catch{}
      }
    }
    scheduleSample() {
      if(this.sampleSource)return;
      const c=this.context,buffer=this.buffers.get(this.trackIndex);if(!buffer)return;
      if(this.sampleOffset>=buffer.duration-.01){this.advanceTrack();this.nextBeat=c.currentTime+.12;return;}
      const source=c.createBufferSource(),gain=c.createGain();source.buffer=buffer;
      source.connect(gain);gain.connect(this.music);gain.gain.setValueAtTime(0,c.currentTime);gain.gain.linearRampToValueAtTime(1,c.currentTime+.06);
      this.sampleSource=source;this.sampleGain=gain;this.sampleStart=c.currentTime+.02;
      source.onended=()=>{
        source.disconnect();gain.disconnect();
        if(this.sampleSource!==source)return;
        this.sampleSource=null;this.advanceTrack();this.nextBeat=c.currentTime+.12;
      };
      source.start(this.sampleStart,this.sampleOffset);
    }
    schedule() {
      const c=this.context;
      if(this.tracks[this.trackIndex].src){this.scheduleSample();return;}
      if(this.nextBeat<c.currentTime-.5)this.nextBeat=c.currentTime+.1;
      while(this.nextBeat<c.currentTime+.25){
        const track=this.tracks[this.trackIndex],beatLength=60/track.bpm;
        this.playBeat(this.trackIndex,this.beat,this.nextBeat,beatLength);
        this.nextBeat+=beatLength;this.beat++;
        if(this.beat===track.beats)this.advanceTrack();
      }
    }
    async renderPreview(index=1) {
      const track=this.tracks[index];if(!track)throw new Error('Unknown sound study');
      const Offline=window.OfflineAudioContext||window.webkitOfflineAudioContext;
      if(!Offline)throw new Error('Audio preview unavailable');
      const duration=track.beats*60/track.bpm,rate=24000,c=new Offline(2,Math.ceil((duration+3.2)*rate),rate),preview=new NocheSound();
      preview.setup(c);preview.master.gain.setValueAtTime(.55,0);
      preview.master.gain.setValueAtTime(.55,duration);preview.master.gain.linearRampToValueAtTime(0,duration+3);
      for(let step=0;step<track.beats;step++)preview.playBeat(index,step,.12+step*60/track.bpm,60/track.bpm);
      return c.startRendering();
    }
    click() {
      if(!this.enabled||!this.context||this.ducked)return;
      const c=this.context,osc=c.createOscillator(),g=c.createGain();osc.type='triangle';osc.frequency.setValueAtTime(380,c.currentTime);osc.frequency.exponentialRampToValueAtTime(100,c.currentTime+.035);g.gain.setValueAtTime(.13,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.045);osc.connect(g);g.connect(this.effect);osc.start();osc.stop(c.currentTime+.06);osc.onended=()=>{osc.disconnect();g.disconnect();};
    }
    tune() {
      if(!this.enabled||!this.context||this.ducked)return;
      const c=this.context,src=c.createBufferSource(),filter=c.createBiquadFilter(),g=c.createGain();src.buffer=this.noise;filter.type='bandpass';filter.frequency.value=1600;filter.Q.value=.4;g.gain.setValueAtTime(.01,c.currentTime);g.gain.linearRampToValueAtTime(.6,c.currentTime+.04);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.21);src.connect(filter);filter.connect(g);g.connect(this.effect);src.start();src.stop(c.currentTime+.23);src.onended=()=>{src.disconnect();filter.disconnect();g.disconnect();};
    }
  }
  window.nocheSound=new NocheSound();
  document.addEventListener('visibilitychange',()=>window.nocheSound.level());
})();
