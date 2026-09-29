/* Registered room pixels. Still composition is verified against the reference. */
(() => {
 const VERSION='room-layers-7';
 class RoomPixels {
  constructor(canvas,data,layers,reference){
   this.canvas=canvas;this.context=canvas.getContext('2d');this.data=data;this.layers=layers;
   this.reference=reference;this.mode='layered';this.selected=layers[0].id;this.split=.5;this.frameOverrides=new Map();
   canvas.width=data.width;canvas.height=data.height;this.render();
   const original=document.createElement('canvas');original.width=data.width;original.height=data.height;
   const ctx=original.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(reference,0,0,data.width,data.height);
   const expected=ctx.getImageData(0,0,data.width,data.height).data;
   const actual=this.context.getImageData(0,0,data.width,data.height).data;
   let differences=0;
   for(let i=0;i<expected.length;i+=4)if(expected[i]!==actual[i]||expected[i+1]!==actual[i+1]||expected[i+2]!==actual[i+2]||expected[i+3]!==actual[i+3])differences++;
   this.pixelDifferences=differences;canvas.dataset.pixelDifferences=String(differences);
   canvas.dataset.layers=String(layers.length);canvas.dataset.renderer='layered';canvas.dataset.state='ready';
  }
  exportReference(){
   const canvas=document.createElement('canvas');canvas.width=this.data.width;canvas.height=this.data.height;
   const context=canvas.getContext('2d');context.imageSmoothingEnabled=false;context.drawImage(this.reference,0,0,canvas.width,canvas.height);
   return canvas.toDataURL('image/png');
  }
  canRemove(id=this.selected){return this.data.preparedObjects?.includes(id)??false;}
  setMode(mode){this.mode=mode==='removed'&&!this.canRemove()?'layered':mode;this.render();}
  select(id){this.selected=id;this.render();}
  setSplit(value){this.split=Math.max(0,Math.min(1,value));this.render();}
  setLayerFrame(id,frame){
   const layer=this.layers.find(item=>item.id===id);
   if(!layer)throw new Error('Unknown room layer');
   if(frame&&(frame.width!==layer.width||frame.height!==layer.height))throw new Error('Frame registration does not match its layer');
   if(frame)this.frameOverrides.set(id,frame);else this.frameOverrides.delete(id);
   this.render();
  }
  render(){
   const ctx=this.context,{width,height}=this.data;ctx.clearRect(0,0,width,height);ctx.imageSmoothingEnabled=false;
   if(this.mode==='removed'&&!this.canRemove())this.mode='layered';
   this.canvas.dataset.view=this.mode;this.canvas.dataset.selected=this.selected;
   if(this.mode==='original'){ctx.drawImage(this.reference,0,0,width,height);return;}
   for(const layer of this.layers){
    if(this.mode==='isolated'&&layer.id!==this.selected)continue;
    if(this.mode==='removed'&&(layer.id===this.selected||layer.companionFor===this.selected))continue;
    ctx.drawImage(this.frameOverrides.get(layer.id)||layer.surface,layer.x,layer.y);
   }
   if(this.mode==='compare'){
    const x=Math.round(width*this.split);ctx.save();ctx.beginPath();ctx.rect(0,0,x,height);ctx.clip();ctx.drawImage(this.reference,0,0,width,height);ctx.restore();
    ctx.fillStyle='#e9ca85';ctx.fillRect(x,0,1,height);
   }
  }
 }
 window.NocheRoom={async create(canvas){
  const url=new URL('assets/room-layers/manifest.json?v='+VERSION,document.baseURI);
  const response=await fetch(url);if(!response.ok)throw new Error('Room layers unavailable');
  const data=await response.json();
  const load=async source=>{const image=new Image();image.src=source;await image.decode();return image;};
  const [layers,reference]=await Promise.all([
   Promise.all(data.layers.map(async layer=>{const source=new URL(layer.src,url);source.search='?v='+VERSION;return {...layer,surface:await load(source.href)};})),
   load(new URL(data.source,url).href)
  ]);
  return new RoomPixels(canvas,data,layers,reference);
 }};
})();
