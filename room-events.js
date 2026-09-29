/* Ambient room life. Three lanes share the room: two stay busy so at least two events run at once, and a third joins now and then. A visitor's movement and glow have independent clocks. */
(() => {
 'use strict';
 const between=(random,min,max)=>min+random()*(max-min);
 const shuffle=(items,random)=>{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;};
 const LANES=[{first:[1500,3000],gap:[200,900]},{first:[3000,5500],gap:[200,900]},{first:[9000,16000],gap:[14000,30000]}];
 function visitorPlan(clip,random=Math.random){
  const duration=between(random,11000,16000),moveDuration=clip.timeline.reduce((sum,frame)=>sum+frame.duration,0);
  const move=random()<.86?{start:between(random,600,duration-moveDuration-700),duration:moveDuration}:null;
  const glowDuration=between(random,3800,6600);
  const glow=random()<.68?{start:between(random,600,duration-glowDuration-700),duration:glowDuration,peak:5+Math.floor(random()*4),rise:between(random,.24,.36),hold:between(random,.08,.18)}:null;
  return {duration,move,glow};
 }
 function visitorFrame(plan,clip,elapsed){
  const opacity=Math.max(0,Math.min(1,Math.ceil(elapsed/80)/6,Math.ceil((plan.duration-elapsed)/80)/6));
  let frame=0,glow=0;
  if(plan.move){const age=elapsed-plan.move.start;if(age>=0&&age<plan.move.duration){let end=0;for(let i=0;i<clip.timeline.length;i++){end+=clip.timeline[i].duration;if(age<end){frame=i;break;}}}}
  if(plan.glow){const g=plan.glow,age=(elapsed-g.start)/g.duration;if(age>=0&&age<1){const value=age<g.rise?age/g.rise:age<g.rise+g.hold?1:(1-age)/(1-g.rise-g.hold);glow=Math.round(value*g.peak);}}
  return {frame,glow,opacity};
 }
 class Director {
  constructor({allowed,select,paint,clear,publish=()=>{},random=Math.random,clock=window,lanes=LANES}){
   Object.assign(this,{allowed,select,paint,clear,publish,random,clock,lanes});
   this.timers=new Map();this.pending=new Map();this.active=new Map();this.request=0;this.running=false;this.revision=0;
  }
  get events(){return [...this.active.values()].map(slot=>slot.event);}
  sync(){
   if(!this.allowed()){if(this.running||this.timers.size||this.active.size)this.stop();return;}
   if(!this.running){this.running=true;this.lanes.forEach((_,lane)=>this.wait(lane,true));}
  }
  stop(){
   this.revision++;for(const id of this.timers.values())this.clock.clearTimeout(id);this.timers.clear();this.pending.clear();
   this.clock.cancelAnimationFrame(this.request);this.request=0;this.running=false;
   const events=this.events;this.active.clear();for(const event of events)this.clear(event);
   this.publish({state:'paused',events:[]});
  }
  schedule(lane,delay){
   this.pending.set(lane,Math.round(delay));
   this.timers.set(lane,this.clock.setTimeout(()=>{this.timers.delete(lane);this.pending.delete(lane);this.play(lane);},delay));
   this.announce();
  }
  wait(lane,first=false){
   if(!this.running||!this.allowed()){this.stop();return;}
   const [min,max]=first?this.lanes[lane].first:this.lanes[lane].gap;
   this.schedule(lane,between(this.random,min,max));
  }
  play(lane){
   if(!this.allowed()){this.stop();return;}
   const event=this.select(this.events);
   if(!event){this.schedule(lane,between(this.random,1500,3000));return;}
   this.active.set(lane,{event,start:undefined});this.announce();
   if(!this.request)this.request=this.clock.requestAnimationFrame(this.tick.bind(this,this.revision));
  }
  tick(revision,time){
   if(revision!==this.revision)return;
   if(!this.allowed()){this.stop();return;}
   const frames=[],finished=[];
   for(const [lane,slot] of this.active){
    if(slot.start===undefined)slot.start=time;
    const elapsed=time-slot.start;
    if(elapsed>=slot.event.duration)finished.push(lane);else frames.push({event:slot.event,elapsed});
   }
   for(const lane of finished){const {event}=this.active.get(lane);this.active.delete(lane);this.clear(event);}
   this.paint(frames);
   if(finished.length){this.announce();for(const lane of finished){this.wait(lane);if(revision!==this.revision)return;}}
   this.request=this.active.size?this.clock.requestAnimationFrame(this.tick.bind(this,revision)):0;
  }
  announce(){
   const events=this.events,delays=[...this.pending.values()];
   this.publish({state:events.length?'playing':'waiting',events,delay:delays.length?Math.min(...delays):undefined});
  }
 }
 window.NocheRoomEvents={Director,visitorPlan,visitorFrame,LANES,async create(room){
  const canvas=document.querySelector('#room-events'),toggle=document.querySelector('#room-life-toggle'),scene=document.querySelector('#scene');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),key='noche-room-life-v1';
  let enabled=true,pageHidden=false;
  try{enabled=localStorage.getItem(key)!=='off';}catch{}
  const loadAnimation=async file=>{
   const url=new URL('assets/room-animation/'+file+'.json?v=room-events-1',document.baseURI),response=await fetch(url);
   if(!response.ok)throw new Error('Room animation unavailable');
   const data=await response.json(),image=new Image();image.src=new URL(data.sheet,url).href;await image.decode();
   const frames=data.frames.map((_,index)=>{const c=document.createElement('canvas');c.width=data.width;c.height=data.height;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(image,index*data.width,0,data.width,data.height,0,0,data.width,data.height);return c;});
   return {id:file,kind:'room',data,frames,duration:data.duration,lastPaint:''};
  };
  const loaded=await Promise.allSettled([NocheGuestPixels.create(room,canvas),loadAnimation('window-breeze'),loadAnimation('heart-reflection')]);
  const guests=loaded[0].status==='fulfilled'?loaded[0].value:null;
  const animations=loaded.slice(1).filter(result=>result.status==='fulfilled').map(result=>result.value);
  let bag=[],visitorBag=[],lastVisitor=null,lastKind=null,lastPaint='';
  const visibleInRoom=box=>{
   const r=scene.getBoundingClientRect(),left=r.left+box.x/640*r.width,top=r.top+box.y/400*r.height,w=box.width/640*r.width,h=box.height/400*r.height;
   const visible=Math.max(0,Math.min(innerWidth,left+w)-Math.max(0,left))*Math.max(0,Math.min(innerHeight,top+h)-Math.max(0,top));
   return w>0&&h>0&&visible/(w*h)>.75;
  };
  const box=spot=>({x:spot.x,y:spot.y,width:guests.data.sprites[spot.sprite][0].length,height:guests.data.sprites[spot.sprite].length});
  // Two visitors never share a spot, a drawing, or touching space (the TV pair and the lotus/ship pair overlap on the wall).
  const apart=(a,b,margin=4)=>a.x+a.width+margin<=b.x||b.x+b.width+margin<=a.x||a.y+a.height+margin<=b.y||b.y+b.height+margin<=a.y;
  const guestAvailable=(active=[])=>guests?guests.data.placements.filter(spot=>!spot.onlyArea&&!active.some(event=>event.spot.id===spot.id||event.spot.sprite===spot.sprite||!apart(box(spot),box(event.spot)))&&visibleInRoom(box(spot))):[];
  const chooseGuest=active=>{
   const options=guestAvailable(active),ids=new Set(options.map(spot=>spot.id));visitorBag=visitorBag.filter(spot=>ids.has(spot.id));
   if(!visitorBag.length)visitorBag=shuffle(options,Math.random);
   if(visitorBag.length>1&&visitorBag.at(-1).id===lastVisitor)[visitorBag[0],visitorBag[visitorBag.length-1]]=[visitorBag.at(-1),visitorBag[0]];
   const spot=visitorBag.pop();if(!spot)return null;lastVisitor=spot.id;
   const clip=guests.motionData.animations[spot.sprite],plan=visitorPlan(clip);
   return {kind:'guest',id:spot.id,spot,clip,plan,duration:plan.duration};
  };
  const select=(active=[])=>{
   const activeIds=new Set(active.map(event=>event.id)),activeGuests=active.filter(event=>event.kind==='guest');
   const available=animations.filter(animation=>!activeIds.has(animation.id)&&visibleInRoom(room.layers.find(layer=>layer.id===animation.data.layer))).map(animation=>animation.id);
   if(guestAvailable(activeGuests).length)available.push('guest');
   if(!available.length)return null;
   bag=bag.filter(kind=>available.includes(kind));
   if(!bag.length)bag=shuffle(available.flatMap(kind=>kind==='guest'?[kind,kind]:[kind]),Math.random);
   if(bag.length>1&&bag.at(-1)===lastKind){const different=bag.findIndex(kind=>kind!==lastKind);if(different>=0)[bag[different],bag[bag.length-1]]=[bag.at(-1),bag[different]];}
   const kind=bag.pop();lastKind=kind;
   if(kind==='guest')return chooseGuest(activeGuests);
   const animation=animations.find(animation=>animation.id===kind);animation.lastPaint='';return animation;
  };
  const allowed=()=>enabled&&!motion.matches&&!document.hidden&&!pageHidden&&document.body.classList.contains('entered')&&document.body.dataset.view==='room'&&!document.querySelector('dialog[open]')&&document.querySelector('#remote').hidden;
  const paint=frames=>{
   const visitors=[];
   for(const {event,elapsed} of frames){
    if(event.kind==='guest'){visitors.push({spot:event.spot,state:visitorFrame(event.plan,event.clip,elapsed)});continue;}
    let end=0,index=0;for(;index<event.data.frames.length-1;index++){end+=event.data.frames[index].duration;if(elapsed<end)break;}
    if(index!==event.lastPaint){room.setLayerFrame(event.data.layer,index===0||index===event.frames.length-1?null:event.frames[index]);event.lastPaint=index;}
   }
   const id=visitors.map(({spot,state})=>[spot.id,state.frame,state.glow,state.opacity].join(':')).join('|');
   if(id===lastPaint)return;
   if(visitors.length)guests.renderAll(visitors);else if(lastPaint!=='')guests?.clear();
   lastPaint=id;
  };
  const clear=event=>{if(!event)return;if(event.kind==='guest')guests?.clear();else room.setLayerFrame(event.data.layer,null);lastPaint='';};
  const publish=state=>{
   const events=state.events||[],guest=events.find(event=>event.kind==='guest');
   canvas.dataset.state=state.state;canvas.dataset.event=events.map(event=>event.id).join(' ');canvas.dataset.count=String(events.length);canvas.dataset.next=state.delay?String(state.delay):'';
   canvas.dataset.moveAt=guest?.plan?.move?String(Math.round(guest.plan.move.start)):'';
   canvas.dataset.glowAt=guest?.plan?.glow?String(Math.round(guest.plan.glow.start)):'';
  };
  const director=new Director({allowed,select,paint,clear,publish});
  const available=!!guests||!!animations.length;
  const sync=()=>{
   const label=!available?'roomLifeUnavailable':motion.matches?'roomLifeReduced':enabled?'roomLifeOn':'roomLifeOff';
   toggle.dataset.i18n=label;toggle.textContent=window.NOCHE_COPY[label][document.documentElement.lang==='es'?0:1];
   toggle.setAttribute('aria-pressed',String(enabled&&!motion.matches&&available));toggle.disabled=!available||motion.matches;
   canvas.dataset.enabled=String(enabled);canvas.dataset.reduced=String(motion.matches);
   if(available)director.sync();else{guests?.clear();canvas.dataset.state='unavailable';}
  };
  toggle.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off');}catch{}sync();});
  const observer=new MutationObserver(sync);observer.observe(document.body,{attributes:true,attributeFilter:['data-view','class']});
  observer.observe(document.querySelector('#remote'),{attributes:true,attributeFilter:['hidden']});
  for(const dialog of document.querySelectorAll('dialog'))observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  document.addEventListener('visibilitychange',sync);document.addEventListener('noche:language',sync);motion.addEventListener('change',sync);
  window.addEventListener('pagehide',()=>{pageHidden=true;director.stop();});window.addEventListener('pageshow',()=>{pageHidden=false;sync();});
  canvas.dataset.ready='true';sync();
  return {sync};
 }};
})();
