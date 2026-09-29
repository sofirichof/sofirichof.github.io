/* Editable PNG sprites traced onto a shared 640 × 400 pixel grid. */
(() => {
 // One square per character: these stay crisp on the same grid as the player.
 const noteShapes=[
  ['00011000','00011100','00011010','00011010','00011000','00011000','00011000','01111000','11111000','11110000','01100000'],
  ['0001111111','0001111111','0001100011','0001100011','0001100011','0001100011','0111101111','1111111111','1111011110','0110001100'],
  ['000110','000110','000110','000110','000110','000110','011110','111110','111100','011000']
 ];
 class PixelTurntable {
  constructor(canvas,data,layers){
   this.canvas=canvas;this.ctx=canvas.getContext('2d');this.data=data;
   this.playing=false;this.active=false;this.angle=0;this.arm=data.parkAngle;this.progress=0;this.frame=0;this.last=0;
   this.notes=[];this.noteClock=0;this.noteSequence=0;
   this.reduced=matchMedia('(prefers-reduced-motion: reduce)');
   this.layers=layers;this.hiddenLayers=new Set();
   canvas.width=data.width;canvas.height=data.height;canvas.dataset.layers=String(data.layers.length);canvas.dataset.playing='false';
   this.reduced.addEventListener('change',()=>{this.notes=[];this.noteClock=0;this.render();this.schedule();});
   document.addEventListener('visibilitychange',()=>{if(!document.hidden)this.schedule();});
   this.render();canvas.dataset.state='ready';
  }
  setActive(value){this.active=value;this.last=0;if(value){this.render();this.schedule();}else{cancelAnimationFrame(this.frame);this.frame=0;this.notes=[];this.render();}}
  setPlaying(value){if(value===this.playing)return;if(value)this.noteClock=.7;this.playing=value;this.canvas.dataset.playing=String(value);this.last=0;this.schedule();}
  setProgress(value){this.progress=Math.max(0,Math.min(1,value||0));this.schedule();}
  setLayerVisible(id,visible){visible?this.hiddenLayers.delete(id):this.hiddenLayers.add(id);this.render();}
  schedule(){if(!this.frame&&this.active&&!document.hidden&&!this.reduced.matches)this.frame=requestAnimationFrame(time=>this.tick(time));}
  tick(time){
   this.frame=0;if(!this.active||document.hidden||this.reduced.matches)return;
   const elapsed=this.last?time-this.last:0;
   // Draw at 15 fps so rotations stay on the room's deliberate pixel grid.
   if(!this.last||elapsed>=1000/15){
    const dt=Math.min(elapsed,100)/1000;this.last=time;
    if(this.playing)this.angle=(this.angle+dt*(360/1.8))%360;
    const target=this.playing?this.progress*12:this.data.parkAngle;
    this.arm+=(target-this.arm)*(1-Math.exp(-dt*7));
    if(Math.abs(target-this.arm)<.02)this.arm=target;
    this.updateNotes(dt);
    this.render();
   }
   if(this.playing||this.notes.length||Math.abs(this.arm-this.data.parkAngle)>.02)this.schedule();
  }
  updateNotes(dt){
   if(this.playing){
    this.noteClock+=dt;
    if(this.noteClock>=.9){
     this.noteClock=0;
     const n=this.noteSequence++,origins=[[-38,-9],[43,4],[1,-15],[65,-8]];
     const [dx,dy]=origins[n%origins.length],[x,y]=this.data.recordPivot;
     this.notes.push({x:x+dx,y:y-26+dy,age:0,release:0,life:3.4,shape:n%noteShapes.length,phase:n*1.7,color:n%3===1?'#9db8db':'#e4cf9b'});
    }
   }
   for(const note of this.notes){note.age+=dt;if(!this.playing)note.release+=dt;}
   this.notes=this.notes.filter(note=>note.age<note.life&&note.release<.4);
  }
  drawNotes(){
   if(this.reduced.matches)return;
   const context=this.ctx;context.save();
   for(const note of this.notes){
    const fade=Math.min(1,note.age/.24,(note.life-note.age)/.8,1-note.release/.4);
    context.globalAlpha=Math.round(Math.max(0,fade)*4)/4*.9;
    const x=Math.round(note.x+Math.sin(note.age*2+note.phase)*5),y=Math.round(note.y-note.age*19);
    const shape=noteShapes[note.shape];
    for(const [color,offset] of [['#182238',1],[note.color,0]]){
     context.fillStyle=color;
     shape.forEach((row,yy)=>{for(let xx=0;xx<row.length;xx++)if(row[xx]==='1')context.fillRect(x+xx+offset,y+yy+offset,1,1);});
    }
   }
   context.restore();
  }
  render(){
   const context=this.ctx;context.clearRect(0,0,this.canvas.width,this.canvas.height);context.imageSmoothingEnabled=false;
   for(const layer of this.layers){
    if(this.hiddenLayers.has(layer.id))continue;
    if(layer.id==='fixed-reflections'&&this.hiddenLayers.has('record'))continue;
    context.save();context.globalCompositeOperation=layer.composite;
    if(layer.id==='record'&&!this.reduced.matches){
     const [x,y]=this.data.recordPivot,aspect=this.data.recordAspect;context.translate(x,y);context.scale(1,aspect);context.rotate(this.angle*Math.PI/180);context.scale(1,1/aspect);context.translate(-x,-y);
    }else if(layer.id==='tonearm'&&!this.reduced.matches){
     const [x,y]=this.data.armPivot;context.translate(x,y);context.rotate(this.arm*Math.PI/180);context.translate(-x,-y);
    }
    context.drawImage(layer.surface,layer.x,layer.y);context.restore();
   }
   this.drawNotes();
   this.canvas.dataset.notes=String(this.notes.length);
   this.canvas.dataset.arm=this.reduced.matches?'still':this.arm.toFixed(2);
   this.canvas.dataset.rotation=this.angle.toFixed(2);
  }
 }
 window.NocheTurntable={async create(canvas){
  const manifest=new URL('assets/turntable/manifest.json?v=deck-frame-5',document.baseURI);
  const response=await fetch(manifest);if(!response.ok)throw new Error('Pixel layers unavailable');
  const data=await response.json();
  const layers=await Promise.all(data.layers.map(async layer=>{
   const surface=new Image(),url=new URL(layer.src,manifest);url.search='?v=deck-frame-5';await new Promise((resolve,reject)=>{surface.onload=resolve;surface.onerror=()=>reject(new Error('Turntable layer unavailable'));surface.src=url;});return {...layer,surface};
  }));
  return new PixelTurntable(canvas,data,layers);
 }};
})();
