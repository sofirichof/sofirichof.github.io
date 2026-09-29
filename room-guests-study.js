/* Optional transparent visitors. The underlying room canvas is never written. */
(() => {
 window.NocheGuestsStudy={async create(room){
  const canvas=document.querySelector('#room-guests'),ctx=canvas.getContext('2d');
  const panel=document.querySelector('#smiski-study'),status=document.querySelector('#smiski-status');
  const find=document.querySelector('#smiski-find'),hide=document.querySelector('#smiski-hide');
  const random=document.querySelector('#smiski-random'),picker=document.querySelector('#smiski-picker');
  const glowButton=document.querySelector('#smiski-glow'),randomGlow=document.querySelector('#smiski-random-glow');
  const moveButton=document.querySelector('#smiski-move'),autoMove=document.querySelector('#smiski-auto-move');
  const moveSlider=document.querySelector('#smiski-frame'),moveCaption=document.querySelector('#smiski-frame-caption'),slowMove=document.querySelector('#smiski-slow');
  const detail=document.querySelector('#smiski-detail'),details=document.querySelector('#smiski-details');
  const lighting=document.querySelector('#smiski-lighting'),mapButton=document.querySelector('#smiski-light-map-toggle');
  const lightMap=document.querySelector('#room-light-map'),lightNote=document.querySelector('#smiski-light-note');
  const areaPicker=document.querySelector('#smiski-area'),stage=document.querySelector('#room-study-stage'),artCanvas=document.querySelector('#room-study-art');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const renderer=await NocheGuestPixels.create(room,canvas),{data,motionData}=renderer;
  canvas.width=room.data.width;canvas.height=room.data.height;
  lightMap.width=canvas.width;lightMap.height=canvas.height;
  artCanvas.width=canvas.width;artCanvas.height=canvas.height;
  let area='room';
  let visible=null,last=null,appearTimer=0,leaveTimer=0,request=0,view=room.mode;
  let glowTimer=0,glowRequest=0,glowing=false,glowLevel=0,appearance=1;
  let moveTimer=0,moveRequest=0,moving=false,moveFrame=0,departAt=0;
  const GLOW_STEPS=8;
  const animation=spot=>motionData.animations[spot.sprite];
  for(const placement of data.placements){const option=document.createElement('option');option.value=placement.id;option.textContent=placement.label;picker.append(option);}
  const movementControls=()=>{
   const spot=visible||data.placements.find(p=>p.id===last)||data.placements[0],clip=animation(spot);
   moveSlider.max=String(clip.timeline.length-1);moveSlider.value=String(moveFrame);moveSlider.disabled=!visible;
   moveButton.disabled=!visible||motion.matches;moveButton.textContent=moving?'Stop movement':'Replay movement';
   moveButton.setAttribute('aria-pressed',String(moving));slowMove.disabled=motion.matches;
   moveCaption.textContent=clip.label+' · '+(moveFrame+1)+' / '+clip.timeline.length+(motion.matches?' · still-frame inspection':'');
   panel.dataset.movementFrame=String(moveFrame);panel.dataset.movementPose=String(clip.timeline[moveFrame].pose);
  };
  const cancelMove=()=>{
   clearTimeout(moveTimer);cancelAnimationFrame(moveRequest);moveTimer=moveRequest=0;moving=false;moveFrame=0;
   panel.dataset.movement='still';delete panel.dataset.nextMovement;movementControls();
  };
  const cancelGlow=()=>{
   clearTimeout(glowTimer);cancelAnimationFrame(glowRequest);glowTimer=glowRequest=0;glowing=false;glowLevel=0;
   panel.dataset.glow='still';panel.dataset.glowLevel='0';delete panel.dataset.nextGlow;
   glowButton.textContent='Preview glow';glowButton.setAttribute('aria-pressed','false');
  };
  const cancel=()=>{clearTimeout(appearTimer);clearTimeout(leaveTimer);cancelAnimationFrame(request);appearTimer=leaveTimer=request=departAt=0;delete panel.dataset.nextVisit;delete panel.dataset.stay;cancelGlow();cancelMove();};
  const updateLightMap=()=>{
   const c=lightMap.getContext('2d');c.clearRect(0,0,lightMap.width,lightMap.height);
   const spot=visible||data.placements.find(p=>p.id===last);
   lightNote.textContent=spot?(lighting.checked?spot.lighting.note:'Original flat palette · room lighting is off.'):'Warm lantern, cool window light, and deeper shelf/bowl shade.';
   if(lightMap.hidden||view!=='layered')return;
   const line=(x0,y0,x1,y1,color)=>{
    const steps=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));c.fillStyle=color;
    for(let i=0;i<=steps;i++)if(i%9<4)c.fillRect(Math.round(x0+(x1-x0)*i/steps),Math.round(y0+(y1-y0)*i/steps),1,1);
   };
   for(const source of data.lighting.sources){
    const color=source.id==='lantern'?'#f5be71':'#90b9f2';
    if(spot){const rows=data.sprites[spot.sprite],anchor=spot.lightAnchor||[Math.floor(rows[0].length/2),Math.floor(rows.length/2)];line(source.x,source.y,spot.x+anchor[0],spot.y+anchor[1],color);}
    c.fillStyle=color;c.fillRect(source.x-4,source.y-4,9,9);c.clearRect(source.x-2,source.y-2,5,5);c.fillRect(source.x,source.y,1,1);
   }
   for(const place of data.placements){
    const rows=data.sprites[place.sprite],anchor=place.lightAnchor||[Math.floor(rows[0].length/2),Math.floor(rows.length/2)],x=place.x+anchor[0],y=place.y+anchor[1];
    c.fillStyle=place===spot?'#eef5b7':'#b4bfa777';c.fillRect(x-1,y-1,3,3);
   }
  };
  const updateDetail=()=>{
   const spot=visible||data.placements.find(p=>p.id===last)||data.placements[0],crop=spot.detail;
   detail.width=crop.width;detail.height=crop.height;
   detail.style.width=crop.width*crop.scale+'px';detail.style.height=crop.height*crop.scale+'px';
   const d=detail.getContext('2d');d.imageSmoothingEnabled=false;
   d.drawImage(room.canvas,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
   if(area==='art')d.drawImage(artCanvas,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
   d.drawImage(canvas,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
   document.querySelector('#smiski-caption').textContent=visible?spot.label:'Original room · visitor layer is empty';
   updateLightMap();
   movementControls();
  };
  const clear=()=>{
   ctx.clearRect(0,0,canvas.width,canvas.height);visible=null;
   canvas.dataset.visible='none';canvas.dataset.visiblePixels='0';panel.dataset.state='empty';hide.disabled=glowButton.disabled=true;updateDetail();
  };
  const paint=()=>{
   if(!visible)return;
   renderer.render(visible,{frame:moveFrame,glow:glowLevel,opacity:appearance,lit:lighting.checked});
   const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let count=0;
   for(let i=3;i<pixels.length;i+=4)if(pixels[i])count++;
   canvas.dataset.visiblePixels=String(count);panel.dataset.glowLevel=String(glowLevel);updateDetail();
  };
  const scheduleDeparture=stay=>{
   clearTimeout(leaveTimer);departAt=performance.now()+stay;panel.dataset.stay=String(Math.round(stay));
   leaveTimer=setTimeout(()=>{cancel();clear();schedule();},stay);
  };
  const scheduleMovement=(first=false)=>{
   if(!visible||!autoMove.checked||document.hidden||motion.matches||view!=='layered')return;
   const delay=first?600+Math.floor(Math.random()*5400):14000+Math.floor(Math.random()*20000);
   panel.dataset.movement='waiting';panel.dataset.nextMovement=String(delay);
   moveTimer=setTimeout(()=>startMovement(false),delay);
  };
  const startMovement=(manual=true)=>{
   if(!visible||document.hidden||motion.matches||view!=='layered')return;
   cancelMove();moving=true;panel.dataset.movement='playing';
   const clip=animation(visible),speed=manual&&slowMove.checked?2.5:1,total=clip.timeline.reduce((sum,frame)=>sum+frame.duration,0)*speed;
   if(manual&&departAt&&departAt-performance.now()<total+600)scheduleDeparture(total+600);
   movementControls();paint();let start;
   const tick=time=>{
    if(start===undefined)start=time;
    const elapsed=(time-start)/speed;let duration=0,next=clip.timeline.length-1;
    for(let i=0;i<clip.timeline.length;i++){duration+=clip.timeline[i].duration;if(elapsed<duration){next=i;break;}}
    if(next!==moveFrame){moveFrame=next;paint();}
    if(time-start<total)moveRequest=requestAnimationFrame(tick);
    else{cancelMove();paint();scheduleMovement();}
   };
   moveRequest=requestAnimationFrame(tick);
  };
  const scheduleGlow=(first=false)=>{
   if(!visible||!randomGlow.checked||document.hidden||motion.matches||view!=='layered')return;
   const delay=first?600+Math.floor(Math.random()*5400):14000+Math.floor(Math.random()*20000);
   panel.dataset.glow='waiting';panel.dataset.nextGlow=String(delay);
   glowTimer=setTimeout(()=>startGlow(false),delay);
  };
  const startGlow=(manual=true)=>{
   if(!visible||document.hidden||view!=='layered')return;
   let duration=3800+Math.floor(Math.random()*2800);
   if(departAt){
    const remaining=departAt-performance.now();
    if(manual&&remaining<duration+500)scheduleDeparture(duration+500);
    else if(!manual){if(remaining<3000){cancelGlow();return;}duration=Math.min(duration,remaining-300);}
   }
   const peak=motion.matches?8:5+Math.floor(Math.random()*4),rise=duration*(.24+Math.random()*.12),hold=duration*(.08+Math.random()*.10),fade=duration-rise-hold;
   cancelGlow();glowing=true;panel.dataset.glow='glowing';
   panel.dataset.glowPeak=String(peak);panel.dataset.glowDuration=String(duration);
   glowButton.textContent='Stop glow';glowButton.setAttribute('aria-pressed','true');
   status.textContent=visible.label+' · a little glow in the dark';
   if(motion.matches){glowLevel=GLOW_STEPS;paint();return;}
   let start;
   const tick=time=>{
    if(start===undefined)start=time;
    const elapsed=time-start;
    // Each visit has a different gentle rise, hold, fade and brightness.
    const amount=elapsed<rise?elapsed/rise:elapsed<rise+hold?1:Math.max(0,1-(elapsed-rise-hold)/fade);
    const next=Math.round(amount*peak);
    if(next!==glowLevel){glowLevel=next;paint();}
    if(elapsed<duration)glowRequest=requestAnimationFrame(tick);
    else{cancelGlow();paint();status.textContent=visible.label+' · a little company';scheduleGlow();}
   };
   glowRequest=requestAnimationFrame(tick);
  };
  const applyArea=next=>{
   area=next;areaPicker.value=next;stage.dataset.area=next;panel.dataset.area=next;
   artCanvas.hidden=next!=='art';
  };
  const eligible=spot=>!spot.onlyArea||spot.onlyArea===area;
  const choose=(randomize=false)=>{
   if(!randomize&&picker.value!=='random')return data.placements.find(p=>p.id===picker.value);
   const options=data.placements.filter(p=>p.id!==last&&eligible(p));
   return options[Math.floor(Math.random()*options.length)];
  };
  const schedule=(first=false)=>{
   if(!random.checked||document.hidden||motion.matches||view!=='layered')return;
   const delay=first?5000+Math.floor(Math.random()*4000):22000+Math.floor(Math.random()*18000);
   panel.dataset.state='waiting';panel.dataset.nextVisit=String(delay);
   status.textContent=first?'A little visitor will stop by soon.':'Quiet room · another visitor in '+Math.round(delay/1000)+' seconds';
   appearTimer=setTimeout(()=>show(false),delay);
  };
  const show=(manual=true)=>{
   cancel();
   if(view!=='layered'){status.textContent='Choose Room view to meet a visitor.';return;}
   const spot=choose(!manual);
   if(manual&&spot.previewArea)applyArea(spot.previewArea);
   else if(manual&&!spot.previewArea&&area!=='room')applyArea('room');
   visible=spot;last=spot.id;appearance=1;
   canvas.dataset.visible=spot.id;panel.dataset.state='visiting';delete panel.dataset.nextVisit;
   hide.disabled=glowButton.disabled=false;status.textContent=spot.label+' · a little company';
   if(manual)details.open=true;
   if(manual||motion.matches)paint();else{
    let start,step=-1;
    const tick=time=>{
     if(start===undefined)start=time;const next=Math.min(6,Math.floor((time-start)/55)+1);
     if(next!==step){step=next;appearance=step/6;paint();}
     if(step<6)request=requestAnimationFrame(tick);
    };request=requestAnimationFrame(tick);
   }
   // Separate draws: either effect may start first, overlap, or skip this visit.
   if(Math.random()<.68)scheduleGlow(true);else if(manual)scheduleGlow();
   if(Math.random()<.86)scheduleMovement(true);else if(manual)scheduleMovement();
   if(random.checked&&!motion.matches){
    scheduleDeparture(11000+Math.floor(Math.random()*5000));
   }
  };
  find.addEventListener('click',()=>show(true));
  hide.addEventListener('click',()=>{random.checked=false;cancel();clear();status.textContent='All tucked away · the room underneath is untouched';});
  picker.addEventListener('change',()=>show(true));
  areaPicker.addEventListener('change',()=>{
   cancel();clear();applyArea(areaPicker.value);updateDetail();
   status.textContent=area==='art'?'Art wall · painter pose preview':area==='mirror'?'Mirror · look for a little sitter on the reflected doorway':'Room · visitors ready';
   schedule(true);
  });
  moveButton.addEventListener('click',()=>{
   if(moving){cancelMove();paint();scheduleMovement();}else startMovement();
  });
  autoMove.addEventListener('change',()=>{cancelMove();paint();if(autoMove.checked)scheduleMovement(true);});
  slowMove.addEventListener('change',()=>{if(moving)startMovement();});
  moveSlider.addEventListener('input',()=>{
   if(!visible)return;
   // Frame inspection holds this visitor and stops automatic effects until replayed.
   const frame=Number(moveSlider.value);cancel();random.checked=autoMove.checked=false;
   moveFrame=frame;panel.dataset.movement='inspecting';appearance=1;paint();
  });
  glowButton.addEventListener('click',()=>{
   if(glowing){cancelGlow();paint();status.textContent=visible.label+' · a little company';scheduleGlow();}
   else startGlow();
  });
  randomGlow.addEventListener('change',()=>{cancelGlow();paint();if(visible)status.textContent=visible.label+' · a little company';if(randomGlow.checked)scheduleGlow(true);});
  lighting.addEventListener('change',()=>{paint();panel.dataset.lighting=lighting.checked?'room':'flat';updateLightMap();});
  mapButton.addEventListener('click',()=>{
   lightMap.hidden=!lightMap.hidden;mapButton.textContent=lightMap.hidden?'Show light map':'Hide light map';
   mapButton.setAttribute('aria-pressed',String(!lightMap.hidden));updateLightMap();
  });
  random.addEventListener('change',()=>{cancel();clear();if(random.checked)schedule(true);else status.textContent='Random visits off · summon one whenever you like';});
  const onViewChange=mode=>{
   if(mode===view)return;view=mode;cancel();clear();
   find.disabled=mode!=='layered';picker.disabled=mode!=='layered';
   areaPicker.disabled=mode!=='layered';
   if(mode!=='layered')applyArea('room');
   status.textContent=mode==='layered'?'Visitors ready · on their own transparent layer':'Visitors paused during layer inspection';
   if(mode==='layered')schedule(true);
  };
  document.addEventListener('visibilitychange',()=>{
   cancel();clear();status.textContent='Visitors ready · on their own transparent layer';
   if(!document.hidden)schedule(true);
  });
  const syncMotion=()=>{
   cancel();clear();random.disabled=randomGlow.disabled=autoMove.disabled=motion.matches;
   if(motion.matches){random.checked=randomGlow.checked=autoMove.checked=false;status.textContent='Reduced motion · still frames and a steady manual glow are available';}
   else status.textContent='Visitors ready · on their own transparent layer';
  };
  motion.addEventListener('change',syncMotion);
  for(const button of [find,picker,areaPicker])button.disabled=false;
  applyArea('room');
  random.disabled=randomGlow.disabled=autoMove.disabled=motion.matches;if(motion.matches)randomGlow.checked=autoMove.checked=false;
  cancelGlow();cancelMove();clear();status.textContent='Visitors ready · on their own transparent layer';
  panel.dataset.ready='true';
  panel.dataset.placements=String(data.placements.length);
  panel.dataset.lighting=lighting.checked?'room':'flat';
  // Read the same artwork files and placements as the portfolio into a preview-only layer.
  const artContext=artCanvas.getContext('2d');artContext.imageSmoothingEnabled=false;
  for(const artwork of window.NOCHE_ARTWORKS||[]){
   const image=new Image();
   image.addEventListener('load',()=>{
    const {box}=artwork,x=Math.round(box.x*canvas.width),y=Math.round(box.y*canvas.height),w=Math.round(box.w*canvas.width),h=Math.round(box.h*canvas.height);
    artContext.fillStyle='#191c17';artContext.fillRect(x,y,w,h);
    artContext.fillStyle=artwork.frame==='dark'?'#303128':'#735535';artContext.fillRect(x+1,y+1,w-2,h-2);
    artContext.drawImage(image,x+3,y+3,w-6,h-6);
    artContext.fillStyle='#2c291b24';artContext.fillRect(x+3,y+3,w-6,h-6);
    if(area==='art')updateDetail();
   },{once:true});image.src=artwork.src;
  }
  const requestedArea=new URLSearchParams(location.search).get('area');
  if(['room','art','mirror'].includes(requestedArea))applyArea(requestedArea);
  const requestedValue=new URLSearchParams(location.search).get('guest'),requested=requestedValue==='dali'?'painter':requestedValue;
  if(data.placements.some(spot=>spot.id===requested)){picker.value=requested;show(true);if(new URLSearchParams(location.search).get('move')==='1')startMovement();}
  return {onViewChange};
 }};
})();
