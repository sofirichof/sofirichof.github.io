/* Shared native-pixel visitor renderer; the room surface is never written. */
(() => {
 window.NocheGuestPixels={async create(room,canvas){
  const ctx=canvas.getContext('2d'),lighting={checked:true};
  const GLOW_STEPS=8;
  const [response,motionResponse]=await Promise.all([fetch('assets/room-guests/smiskis.json?v=art-painter-1'),fetch('assets/room-guests/smiski-motions.json?v=art-painter-1')]);
  if(!response.ok||!motionResponse.ok)throw new Error('Guest drawings unavailable');
  const [data,motionData]=await Promise.all([response.json(),motionResponse.json()]);
  canvas.width=room.data.width;canvas.height=room.data.height;
  const frames=new Map();
  const poses=new Map();
  const animation=spot=>motionData.animations[spot.sprite];
  const poseAt=(spot,frame)=>{
   const poseIndex=animation(spot).timeline[frame].pose,id=spot.sprite+':'+poseIndex;
   if(!poses.has(id)){
    const rows=data.sprites[spot.sprite].map(row=>row.split('')),normals=data.normals[spot.sprite].map(row=>row.slice());
    for(const [x,y,color,...normal] of animation(spot).poses[poseIndex]){rows[y][x]=color;normals[y][x]=normal;}
    poses.set(id,{rows,normals});
   }
   return poses.get(id);
  };
  const luminous={o:'#75944d',s:'#9fc368',g:'#caea90',l:'#e4f9b0',h:'#f0ffc2'};
  const mix=(from,to,amount)=>'#'+[1,3,5].map(i=>Math.round(parseInt(from.slice(i,i+2),16)*(1-amount)+parseInt(to.slice(i,i+2),16)*amount).toString(16).padStart(2,'0')).join('');
  const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  const hex=channels=>'#'+channels.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
  const shade=(spot,key,x,y,pose)=>{
   if(key==='c')return '#18181065';
   const profile=spot.lighting,normal=pose.normals[y][x];
   const length=Math.hypot(...normal)||1,n=normal.map(v=>v/length);
   const material=luminous[key]?data.lighting.bodyAlbedo:rgb(data.palette[key]);
   const energy=[.95,1,.90].map(t=>profile.ambient*t);
   for(const source of data.lighting.sources){
    const direction=[source.x-spot.x-x,source.y-spot.y-y,180],length=Math.hypot(...direction);
    const diffuse=Math.max(0,n.reduce((sum,v,i)=>sum+v*direction[i]/length,0));
    for(let i=0;i<3;i++)energy[i]+=source.color[i]*profile[source.id]*diffuse;
   }
   // Lower-body contact shade anchors the feet, cushion and sheltered bowl interior.
   const height=data.sprites[spot.sprite].length;
   const contact=1-profile.contactShade*Math.max(0,(y/height-.65)/.35);
   const edge=key==='o'?.78:1;
   return hex(material.map((v,i)=>v*energy[i]*contact*edge));
  };
  const drawings=new Map();
  const drawing=(spot,level,frame)=>{
   const id=spot.id+':'+lighting.checked+':'+level+':'+animation(spot).timeline[frame].pose;
   if(!drawings.has(id)){
    const pose=poseAt(spot,frame),rows=pose.rows;
    const sprite=document.createElement('canvas');sprite.width=rows[0].length;sprite.height=rows.length;
    const s=sprite.getContext('2d');s.imageSmoothingEnabled=false;
    for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++){
     const key=rows[y][x];if(key==='.')continue;
     const base=lighting.checked?shade(spot,key,x,y,pose):data.palette[key];
     // Self-emission lifts the lit material, while the eye/prop/shadow pigments stay dark.
     const nz=pose.normals[y][x][2]/4;
     const emission=lighting.checked?hex([210,249,153].map(v=>v*(key==='o'?.70:.85+.15*nz))):luminous[key];
     s.fillStyle=luminous[key]?mix(base,emission,level/GLOW_STEPS*(spot.glowStrength??1)):base;s.fillRect(x,y,1,1);
    }
    drawings.set(id,sprite);
    if(drawings.size>180)drawings.delete(drawings.keys().next().value);
   }
   return drawings.get(id);
  };
  const compose=(spot,level=0,frame=0)=>{
   const layer=document.createElement('canvas');layer.width=canvas.width;layer.height=canvas.height;
   const c=layer.getContext('2d');c.imageSmoothingEnabled=false;
   const sprite=drawing(spot,level,frame),rows=poseAt(spot,frame).rows,strength=level/GLOW_STEPS*(spot.glowStrength??1);
   // A small, stepped glow belongs to the visitor layer as well. No CSS blur.
   const halo=new Map();
   for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++){
    if(rows[y][x]==='.'||rows[y][x]==='c')continue;
    const radius=level&&luminous[rows[y][x]]?4:2;
    for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){
     const distance=Math.abs(dx)+Math.abs(dy);if(distance>(radius===4?6:3))continue;
     const light=radius===4?strength:0;
     const alpha=distance<=1?(lighting.checked?.04:.10)+.16*light:distance<=3?(lighting.checked?.012:.035)+.12*light:.055*light*(7-distance)/3;
     const px=spot.x+x+dx,py=spot.y+y+dy;
     if(px<0||px>=canvas.width||py<0||py>=canvas.height)continue;
     const key=py*canvas.width+px;
     halo.set(key,Math.max(halo.get(key)||0,alpha));
    }
   }
   for(const [key,alpha] of halo){c.fillStyle=`rgba(190,218,133,${alpha})`;c.fillRect(key%canvas.width,Math.floor(key/canvas.width),1,1);}
   c.drawImage(sprite,spot.x,spot.y);
   // Punch out foreground silhouettes only on the new visitor canvas.
   c.globalCompositeOperation='destination-out';
   for(const id of spot.occluders){const foreground=room.layers.find(layer=>layer.id===id);c.drawImage(foreground.surface,foreground.x,foreground.y);}
   for(const region of spot.occlusionRegions||[]){
    const foreground=room.layers.find(layer=>layer.id===region.layer);
    c.save();c.beginPath();region.polygon.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip();
    c.drawImage(foreground.surface,foreground.x,foreground.y);c.restore();
   }
   c.globalCompositeOperation='source-over';
   if(spot.revealBelow!==undefined)c.clearRect(0,0,canvas.width,spot.revealBelow);
   // Fingers in front of a rim are a separate depth slice from the hidden body.
   for(const [x,y,width,height] of spot.frontParts||[])c.drawImage(sprite,x,y,width,height,spot.x+x,spot.y+y,width,height);
   // Sleep letters live on this same transparent layer and end with the gesture.
   const clip=animation(spot);
   for(const [left,top,alpha] of clip.timeline[frame].sleepMarks||[]){
    for(const [dx,dy,color,opacity] of [[1,1,'#283027',alpha*.45],[0,0,'#c7d49c',alpha]]){
     c.fillStyle=color;c.globalAlpha=opacity;
     clip.sleepGlyph.forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]==='1')c.fillRect(spot.x+left+x+dx,spot.y+top+y+dy,1,1);});
    }
   }
   const thought=clip.timeline[frame].thoughtBubble;
   if(thought){
    const glyph=clip.thoughtGlyph,left=spot.x+glyph.x,top=spot.y+glyph.y;
    c.globalAlpha=thought.alpha*.9;
    glyph.rows.forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]!=='.'){c.fillStyle=glyph.palette[row[x]];c.fillRect(left+x,top+y,1,1);}});
    c.fillStyle='#536045';
    for(let i=0;i<thought.dots;i++)c.fillRect(left+6+i*5,top+6,2,2);
   }
   c.globalAlpha=1;
   // Reflected visitors and their halo are confined to the existing glass aperture.
   if(spot.clipTo){
    const glass=room.layers.find(layer=>layer.id===spot.clipTo);
    c.globalCompositeOperation='destination-in';c.drawImage(glass.surface,glass.x,glass.y);c.globalCompositeOperation='source-over';
   }
   return layer;
  };
  const clear=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);canvas.dataset.visible='none';canvas.dataset.visiblePixels='0';};
  const renderAll=(entries,{lit=true}={})=>{
   lighting.checked=lit;
   ctx.clearRect(0,0,canvas.width,canvas.height);ctx.imageSmoothingEnabled=false;
   for(const {spot,state={}} of entries){
    const {frame=0,glow=0,opacity=1}=state,id=spot.id+':'+lit+':'+glow+':'+frame;
    if(!frames.has(id))frames.set(id,compose(spot,glow,frame));
    if(frames.size>32)frames.delete(frames.keys().next().value);
    ctx.globalAlpha=opacity*(spot.opacity??1);ctx.drawImage(frames.get(id),0,0);
   }
   ctx.globalAlpha=1;
   const last=entries.at(-1);
   delete canvas.dataset.visiblePixels;canvas.dataset.visible=entries.map(entry=>entry.spot.id).join(' ')||'none';
   canvas.dataset.frame=String(last?.state?.frame??0);canvas.dataset.glow=String(last?.state?.glow??0);
  };
  // Several visitors can share the transparent layer; each keeps its own frame, glow and fade.
  const render=(spot,{lit=true,...state}={})=>renderAll([{spot,state}],{lit});
  return {data,motionData,render,renderAll,clear};
 }};
})();
