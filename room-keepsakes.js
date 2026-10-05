/* Optional, independent room objects. Sample once onto the room's 640 × 400
   grid; never paint into the room master, the artwork, or visitor canvases. */
(() => {
 'use strict';
 const cap=document.querySelector('#telemundo-keepsake');
 const image=cap.querySelector('img'),canvas=cap.querySelector('canvas');
 const drawCap=()=>{
  if(!image.naturalWidth)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  ctx.clearRect(0,0,54,36);
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality='high';
  ctx.drawImage(image,0,0,54,36);
  cap.classList.add('pixels-ready');
 };
 image.addEventListener('load',drawCap,{once:true});
 image.addEventListener('error',()=>{cap.hidden=true;},{once:true});
 if(image.complete)drawCap();
 const sticker=document.querySelector('#supergood-keepsake'),mark=new Image();
 mark.addEventListener('load',()=>{
  const ctx=sticker.querySelector('canvas').getContext('2d');
  if(!ctx){sticker.hidden=true;return;}
  ctx.save();ctx.beginPath();ctx.arc(7,7,6.8,0,Math.PI*2);ctx.clip();
  // A single still from Sofía's existing brand asset; exclude its lower slogan.
  ctx.drawImage(mark,30,12,180,180,0,0,14,14);ctx.restore();
  sticker.classList.add('pixels-ready');
 },{once:true});
 mark.addEventListener('error',()=>{sticker.hidden=true;},{once:true});
 mark.src='sig/badge-240.gif';
})();
