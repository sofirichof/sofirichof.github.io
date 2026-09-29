/* Opt-in study only. The portfolio never loads this controller or its frames. */
(() => {
 const VERSION='window-breeze-3';
 window.NocheReflectionStudy={async create(room,prepareRoom){
  const panel=document.querySelector('#reflection-study');
  const replay=document.querySelector('#reflection-replay');
  const restore=document.querySelector('#reflection-restore');
  const slider=document.querySelector('#reflection-frame');
  const caption=document.querySelector('#reflection-caption');
  const status=document.querySelector('#reflection-status');
  const detail=document.querySelector('#reflection-detail');
  const slow=document.querySelector('#reflection-slow');
  const picker=document.querySelector('#animation-picker');
  const repeat=document.querySelector('#animation-repeat');
  const sky=document.querySelector('#animation-sky');
  const definitions=[
   {id:'breeze',file:'window-breeze',title:'Just a little breeze.',detail:'The window · close-up',replay:'Replay breeze',label:'Breeze'},
   {id:'heart',file:'heart-reflection',title:'Tin, catching the light.',detail:'The tin heart · close-up',replay:'Replay reflection',label:'Reflection'}
  ];
  const studies=await Promise.all(definitions.map(async definition=>{
   const url=new URL('assets/room-animation/'+definition.file+'.json?v='+VERSION,document.baseURI);
   const response=await fetch(url);if(!response.ok)throw new Error('Animation frames unavailable');
   const data=await response.json(),sheet=new Image();
   sheet.src=new URL(data.sheet+'?v='+VERSION,url).href;await sheet.decode();
   const frames=data.frames.map((frame,index)=>{
    const canvas=document.createElement('canvas');canvas.width=data.width;canvas.height=data.height;
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
    ctx.drawImage(sheet,index*data.width,0,data.width,data.height,0,0,data.width,data.height);
    return canvas;
   });
   let underpainting=null;
   if(data.underpainting){underpainting=new Image();underpainting.src=new URL(data.underpainting+'?v='+VERSION,url).href;await underpainting.decode();}
   return {...definition,data,frames,underpainting};
  }));
  let active=studies[0],data=active.data,frames=active.frames;
  const stillRoom=document.createElement('canvas');stillRoom.width=room.canvas.width;stillRoom.height=room.canvas.height;
  const stillContext=stillRoom.getContext('2d');stillContext.drawImage(room.canvas,0,0);
  const baseline=stillContext.getImageData(0,0,stillRoom.width,stillRoom.height).data;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  detail.width=data.detail.width;detail.height=data.detail.height;
  slider.max=String(frames.length-1);
  let request=0,timer=0,current=-1,playing=false,showingSky=false;
  const updateDetail=()=>{
   // Detail always shows the complete room around the registered object,
   // including while the main study is isolating or removing another object.
   const ctx=detail.getContext('2d'),crop=data.detail;
   ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,detail.width,detail.height);
   ctx.drawImage(stillRoom,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
   const layer=room.layers.find(item=>item.id===data.layer);
   ctx.drawImage(showingSky?active.underpainting:frames[Math.max(0,current)],layer.x-crop.x,layer.y-crop.y);
  };
  const draw=index=>{
   current=index;
   showingSky=false;sky.textContent='Show sky beneath leaves';
   room.setLayerFrame(data.layer,index===0||index===frames.length-1?null:frames[index]);
   panel.dataset.frame=String(index);slider.value=String(index);
   slider.setAttribute('aria-valuetext',data.frames[index].name);
   caption.textContent=`${index+1} / ${frames.length} · ${data.frames[index].name}`;
   updateDetail();
  };
  const verifyStill=()=>{
   const actual=room.context.getImageData(0,0,room.canvas.width,room.canvas.height).data;
   let changed=0;for(let i=0;i<actual.length;i+=4)if(actual[i]!==baseline[i]||actual[i+1]!==baseline[i+1]||actual[i+2]!==baseline[i+2]||actual[i+3]!==baseline[i+3])changed++;
   panel.dataset.restingDifferences=String(changed);
  };
  const cancel=()=>{cancelAnimationFrame(request);clearTimeout(timer);request=0;timer=0;playing=false;delete panel.dataset.pause;};
  const reset=()=>{
   cancel();draw(0);panel.dataset.state='still';restore.disabled=true;
   replay.textContent=active.replay;status.textContent='Still · original artwork';
   if(room.mode==='layered')verifyStill();
  };
  const complete=()=>{
   cancel();draw(frames.length-1);verifyStill();panel.dataset.state='still';
   replay.textContent=active.replay;restore.disabled=true;
   status.textContent='Back to still · original artwork restored';
   if(repeat.checked&&!document.hidden&&!motion.matches){
    const pause=12000+Math.floor(Math.random()*8000);
    panel.dataset.state='resting';panel.dataset.pause=String(pause);restore.disabled=false;
    status.textContent='Quiet pause · next moment in '+Math.round(pause/1000)+' seconds';
    timer=setTimeout(play,pause);
   }
  };
  const play=()=>{
   cancel();prepareRoom(data.layer);
   const speed=slow.checked?3:1;
   // Reduced motion starts with still-frame inspection; the slider remains usable.
   if(motion.matches){draw(3);panel.dataset.state='inspecting';restore.disabled=false;
    status.textContent='Reduced motion · showing one still frame';return;}
   playing=true;panel.dataset.state='playing';restore.disabled=false;
   replay.textContent='Replay from start';status.textContent=active.label+(slow.checked?' · slow preview':' · '+data.duration/1000+' seconds');
   draw(0);let start;
   const tick=time=>{
    if(!playing)return;if(start===undefined)start=time;
    const elapsed=(time-start)/speed;
    if(elapsed>=data.duration){complete();return;}
    let end=0,index=0;
    for(;index<data.frames.length-1;index++){end+=data.frames[index].duration;if(elapsed<end)break;}
    if(index!==current)draw(index);
    request=requestAnimationFrame(tick);
   };
   request=requestAnimationFrame(tick);
  };
  replay.addEventListener('click',play);
  restore.addEventListener('click',reset);
  slider.addEventListener('input',()=>{
   const index=Number(slider.value);cancel();prepareRoom(data.layer);draw(index);
   panel.dataset.state='inspecting';restore.disabled=index===0||index===frames.length-1;
   status.textContent='Paused · inspect each frame';replay.textContent=active.replay;
  });
  const configure=()=>{
   document.querySelector('#reflection-title').textContent=active.title;
   document.querySelector('#reflection-detail-title').textContent=active.detail;
   const scale=data.detailScale||5;
   detail.width=data.detail.width;detail.height=data.detail.height;
   detail.style.width=detail.width*scale+'px';detail.style.height=detail.height*scale+'px';
   detail.setAttribute('aria-label',active.detail);
   document.querySelector('#reflection-detail-scale').textContent='Same pixels, enlarged '+scale+' times.';
   slider.max=String(frames.length-1);sky.hidden=!active.underpainting;
   panel.dataset.duration=String(data.duration);panel.dataset.frames=String(frames.length);panel.dataset.animation=active.id;
  };
  picker.addEventListener('change',()=>{
   reset();active=studies.find(study=>study.id===picker.value);data=active.data;frames=active.frames;
   configure();prepareRoom(data.layer);reset();
  });
  repeat.addEventListener('change',()=>{if(!repeat.checked)reset();});
  sky.addEventListener('click',()=>{
   if(showingSky){reset();return;}
   cancel();prepareRoom(data.layer);showingSky=true;
   room.setLayerFrame(data.layer,active.underpainting);updateDetail();
   panel.dataset.state='underpainting';sky.textContent='Restore leaves';restore.disabled=false;
   status.textContent='Leaves removed · rebuilt sky underneath';
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  motion.addEventListener('change',reset);
  for(const element of [replay,slider,slow,picker,repeat,sky])element.disabled=false;
  configure();
  reset();
  return {reset,updateDetail};
 }};
})();
