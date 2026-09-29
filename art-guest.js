/* The painter visits only the selected artwork. It never intercepts a click. */
(() => {
 'use strict';
 const canvas=document.querySelector('#art-guest'),ctx=canvas.getContext('2d');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const width=14/640,height=21/400,gap=2/640;
 let clipPromise=null,clip=null,active=null,request=0,version=0;
 const stop=()=>{cancelAnimationFrame(request);request=0;};
 const draw=(pose=0,opacity=1,rise=0)=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);ctx.globalAlpha=opacity;ctx.imageSmoothingEnabled=false;
  clip.frames[pose].forEach((row,y)=>row.forEach((color,x)=>{if(color){ctx.fillStyle=clip.palette[color];ctx.fillRect(x,y+rise,1,1);}}));
  ctx.globalAlpha=1;canvas.dataset.pose=String(pose);
 };
 const load=()=>clipPromise??=(async()=>{
  const response=await fetch('assets/room-guests/art-painter.json?v=art-painter-1');
  if(!response.ok)throw new Error('Painter unavailable');
  return response.json();
 })().catch(error=>{clipPromise=null;throw error;});
 const placement=box=>({x:box.x+box.w+gap,y:box.y+Math.max(0,box.h-height),w:width,h:height});
 const hide=()=>{active=null;version++;stop();canvas.hidden=true;canvas.dataset.state='hidden';delete canvas.dataset.art;ctx.clearRect(0,0,canvas.width,canvas.height);};
 const show=async art=>{
  stop();const token=++version;active=art;canvas.hidden=true;
  const box=placement(art.box);
  Object.assign(canvas.style,{left:box.x*100+'%',top:box.y*100+'%',width:box.w*100+'%',height:box.h*100+'%'});
  try{clip=await load();}catch{if(token===version)canvas.dataset.state='unavailable';return;}
  if(token!==version||document.hidden||document.body.dataset.view!=='art')return;
  canvas.width=clip.width;canvas.height=clip.height+3;canvas.dataset.art=art.id;canvas.hidden=false;
  if(reduce.matches){draw();canvas.dataset.state='still';return;}
  const entrance=320,total=entrance+clip.timeline.reduce((sum,frame)=>sum+frame.duration,0);let start,last='';
  canvas.dataset.state='greeting';
  const tick=time=>{
   if(start===undefined)start=time;
   const elapsed=time-start,step=Math.min(4,Math.floor(elapsed/80)+1);let pose=0;
   if(elapsed>=entrance){let end=entrance;for(const frame of clip.timeline){end+=frame.duration;if(elapsed<end){pose=frame.pose;break;}}}
   const key=pose+':'+step;
   if(key!==last){draw(pose,step/4,4-step);last=key;}
   if(elapsed<total)request=requestAnimationFrame(tick);
   else{stop();draw();canvas.dataset.state='still';}
  };
  request=requestAnimationFrame(tick);
 };
 document.addEventListener('visibilitychange',()=>{
  stop();canvas.hidden=true;
  if(!document.hidden&&active&&clip&&document.body.dataset.view==='art'){draw();canvas.hidden=false;canvas.dataset.state='still';}
 });
 reduce.addEventListener('change',()=>{stop();if(active&&clip){draw();canvas.dataset.state='still';}});
 window.NocheArtGuest={show,hide,boundsFor(box){return {...box,w:box.w+gap+width,h:Math.max(box.h,height)};}};
})();
