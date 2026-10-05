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
 const print=document.querySelector('#supergood-keepsake'),mark=new Image();
 mark.addEventListener('load',()=>{
  const ctx=print.querySelector('canvas').getContext('2d');
  if(!ctx){print.hidden=true;return;}
  // A warm paper print between the Escher and Si Solamente frames.
  // All geometry stays on the room pixel grid.
  ctx.fillStyle='#23190f';ctx.fillRect(3,3,33,35);
  ctx.fillStyle='#88734d';ctx.fillRect(1,1,34,36);
  ctx.fillStyle='#d6c49d';ctx.fillRect(1,0,32,35);
  ctx.fillStyle='#efe0bd';ctx.fillRect(2,1,30,32);
  ctx.save();ctx.beginPath();ctx.arc(17,16,13,0,Math.PI*2);ctx.clip();
  ctx.drawImage(mark,30,12,180,180,4,3,26,26);ctx.restore();
  ctx.fillStyle='rgba(141,88,27,.18)';ctx.fillRect(4,3,26,26);
  ctx.fillStyle='#ac9672';ctx.fillRect(2,33,31,2);
  print.classList.add('pixels-ready');
 },{once:true});
 mark.addEventListener('error',()=>{print.hidden=true;},{once:true});
 mark.src='sig/badge-240.gif';
})();
