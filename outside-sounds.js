/* Original synthesized exterior sounds, shared by the portfolio and study. */
(() => {
 function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
 function finish(context,channels,peakTarget){
  let peak=0,energy=0;
  for(const data of channels)for(const sample of data)peak=Math.max(peak,Math.abs(sample));
  if(!Number.isFinite(peak)||peak<.000001)throw new Error('Exterior sound was silent');
  const buffer=context.createBuffer(channels.length,channels[0].length,context.sampleRate),gain=peakTarget/peak;
  for(let channel=0;channel<channels.length;channel++){
   const output=buffer.getChannelData(channel);
   for(let i=0;i<output.length;i++){output[i]=channels[channel][i]*gain;energy+=output[i]*output[i];}
  }
  return{buffer,peak:peakTarget,rms:Math.sqrt(energy/(channels.length*channels[0].length))};
 }
 function cricket(context,variant){
  const rate=context.sampleRate,rand=random(4421+variant*233),duration=.65,output=new Float32Array(Math.ceil(rate*duration));
  const pitch=[4200,4690,4460][variant],pulses=[4,3,5][variant];
  for(let pulse=0;pulse<pulses;pulse++){
   const start=.07+pulse*(.073+variant*.004),length=.034+rand()*.012,strength=.72+rand()*.28;
   for(let i=Math.floor(start*rate);i<Math.min(output.length,Math.ceil((start+length)*rate));i++){
    const t=i/rate-start,position=t/length,envelope=Math.sin(Math.PI*position)**2;
    const chirpPhase=2*Math.PI*(pitch*t+34*t*t/length);
    output[i]+=envelope*strength*(Math.sin(chirpPhase)+.08*Math.sin(chirpPhase*2))*(.9+.1*rand());
   }
  }
  return finish(context,[output],.105);
 }
 function car(context,variant){
  const rate=context.sampleRate,duration=[3.4,4.2,3.7][variant],count=Math.ceil(rate*duration),rand=random(9199+variant*157);
  const left=new Float32Array(count),right=new Float32Array(count);let road=0,phase=0;
  const cutoff=1-Math.exp(-2*Math.PI*620/rate);
  for(let i=0;i<count;i++){
   const t=i/rate,p=t/duration;
   const edge=Math.min(1,t/.32,(duration-t)/.75),distance=1/(1+((p-.43)*5)**2);
   const envelope=Math.sin(edge*Math.PI/2)**2*distance;
   // Motor harmonics carry the identity. Tire noise is just a trace, avoiding
   // the long noise swells that made the previous version resemble surf.
   const rev=p<.42?p/.42:1-(p-.42)/.58;
   const pitch=[87,69,103][variant]+rev*25-19/(1+Math.exp(-(p-.48)*26));
   phase+=2*Math.PI*pitch/rate;
   const motor=Math.sin(phase)+.5*Math.sin(phase*2)+.3*Math.sin(phase*3)+.16*Math.sin(phase*5);
   const firing=.86+.14*Math.sin(phase*.5),engine=motor*firing;
   road+=cutoff*(rand()*2-1-road);
   const texture=engine+road*.035;
   const pan=(variant%2?-1:1)*(.55-1.1*p),angle=(pan+1)*Math.PI/4;
   left[i]=texture*envelope*Math.cos(angle);right[i]=texture*envelope*Math.sin(angle);
  }
  return finish(context,[left,right],.14);
 }
 function horn(context,variant){
  const rate=context.sampleRate,output=new Float32Array(Math.ceil(rate*1.6));
  const notes=variant===1?[[.06,.43]]:[[.06,.17],[.36,.25]];
  const pitches=[[349,440],[330,415],[370,466]][variant];
  for(const [start,length] of notes){
   for(let i=Math.ceil(start*rate);i<Math.ceil((start+length)*rate);i++){
    const t=i/rate-start,edge=Math.min(1,t/.024,(length-t)/.065);
    const envelope=Math.sin(edge*Math.PI/2)**2;
    let sample=0;
    for(const frequency of pitches){
     const phase=2*Math.PI*(frequency*t+Math.sin(t*2*Math.PI*4)*.045);
     // Two softened pulse tones give a car horn its characteristic interval.
     sample+=Math.sin(phase)+.23*Math.sin(3*phase)+.06*Math.sin(5*phase);
    }
    output[i]+=sample*envelope;
   }
  }
  const dry=output.slice();
  for(let i=Math.ceil(rate*.095);i<output.length;i++)output[i]+=dry[i-Math.ceil(rate*.095)]*.12;
  return finish(context,[output],.15);
 }
 function chatter(context,variant){
  const rate=context.sampleRate,duration=4.6,rand=random(7853+variant*451);
  const left=new Float32Array(Math.ceil(rate*duration)),right=new Float32Array(left.length);
  const vowels=[[560,1150],[380,950],[470,1500],[320,1800]];
  // Wordless, original game-voice murmurs: two voices trading uneven phrases.
  // Formant-shaped harmonics suggest speech without actual words or accents.
  for(let speaker=0;speaker<2;speaker++){
   let cursor=.15+speaker*1.24;
   const fundamental=[126,172][speaker]+variant*7,pan=speaker?-.22:.25,angle=(pan+1)*Math.PI/4;
   for(let syllable=0;syllable<9;syllable++){
    const length=.12+rand()*.12,pitch=fundamental*(.9+rand()*.22);
    const vowel=vowels[Math.floor(rand()*vowels.length)],strength=.65+rand()*.3;
    const harmonics=Array.from({length:15},(_,h)=>{
     const frequency=(h+1)*pitch;
     const formant=.9*Math.exp(-(((frequency-vowel[0])/190)**2))+.5*Math.exp(-(((frequency-vowel[1])/290)**2));
     return(.06+formant)/(1+h*.38);
    });
    const table=new Float32Array(257);
    for(let point=0;point<=256;point++)for(let h=1;h<=harmonics.length;h++)table[point]+=Math.sin(2*Math.PI*point/256*h)*harmonics[h-1];
    for(let i=Math.ceil(cursor*rate);i<Math.min(left.length,Math.ceil((cursor+length)*rate));i++){
     const t=i/rate-cursor,p=t/length,envelope=Math.sin(Math.PI*p)**1.4;
     const position=(pitch*(t-.045*t*t/length)%1)*256,point=Math.floor(position),blend=position-point;
     let sample=table[point]*(1-blend)+table[point+1]*blend;
     sample*=envelope*strength;
     left[i]+=sample*Math.cos(angle);right[i]+=sample*Math.sin(angle);
    }
    cursor+=length+.045+rand()*.06+(syllable===3?.33:0);
   }
  }
  // Muffle the voices as though they are outside the room, not beside you.
  const cutoff=1-Math.exp(-2*Math.PI*1250/rate);
  for(const data of [left,right]){let smooth=0;for(let i=0;i<data.length;i++){smooth+=cutoff*(data[i]-smooth);data[i]=smooth;}}
  return finish(context,[left,right],.16);
 }
 window.NocheOutside={create(context){return{
  crickets:[0,1,2].map(i=>cricket(context,i)),traffic:[0,1,2].map(i=>car(context,i)),
  horns:[0,1,2].map(i=>horn(context,i)),chatter:[0,1,2].map(i=>chatter(context,i))
 };}};
})();
