(() => {
'use strict';
// Each fresh visit starts at Tonight instead of restoring a previous channel.
history.scrollRestoration='manual';
window.scrollTo({top:0,behavior:'instant'});
const $=s=>document.querySelector(s), all=window.PORTFOLIO||[], sound=window.nocheSound;
let language='en',activeProject=null,activeArt=null;
let projectTab='description',btsPhoto=0;
let musicCollection='recordings',musicSelected=-1,musicToken=0,musicChanging=false,scWidget=null,spotifyController=null,musicReadyTimer=0;
let soundcloudPromise=null,spotifyPromise=null,spotifyApi=null,pixelTurntable=null,pixelTurntablePromise=null;
const projectBts=()=>window.NOCHE_BTS?.[activeProject?.id]||[];
const photoChapters=window.NOCHE_PHOTOGRAPHY||[];
let albumOpen=false,albumChapter=0,albumPhoto=0,albumReturnFocus=null,albumTurnTimer;
const albumStep=()=>innerWidth<=600?1:2;
const artworks=window.NOCHE_ARTWORKS||[];
const artTitle=a=>a.title[language==='es'?0:1];
let cameraZoom=1,zoomContext='room',albumZoomTarget=null;
const maxCameraZoom=2.2;
function resetCameraZoom(){
 cameraZoom=1;albumZoomTarget=null;$('#room-zoom').style.transform='';$('#zoom-in').disabled=false;$('#zoom-out').disabled=true;
}
function zoomCamera(direction){
 if(!entered||dialogs.some(d=>d.open)||document.fullscreenElement)return;
 const next=Math.min(maxCameraZoom,Math.max(1,Math.round((cameraZoom+direction*.15)*100)/100));
 if(next===cameraZoom)return;
 if(cameraZoom===1){
  const target=activeArt?.element||(albumOpen?(albumZoomTarget||$('.album-left .album-mount')):document.body.dataset.view==='guide'?$('#poster'):$('#tv-screen'));
  const bounds=target.getBoundingClientRect();
  $('#room-zoom').style.transformOrigin=`${bounds.left+bounds.width/2}px ${bounds.top+bounds.height/2}px`;
 }
 cameraZoom=next;$('#room-zoom').style.transform=`scale(${cameraZoom})`;
 $('#zoom-in').disabled=cameraZoom>=maxCameraZoom;$('#zoom-out').disabled=cameraZoom<=1;
 announce(t('zoomLevel',{percent:Math.round(cameraZoom*100)}));
}
$('#zoom-in').addEventListener('click',()=>zoomCamera(1));$('#zoom-out').addEventListener('click',()=>zoomCamera(-1));
resetCameraZoom();
try{const savedLanguage=localStorage.getItem('noche-language');if(savedLanguage==='es'||savedLanguage==='en')language=savedLanguage;}catch{}
const t=(key,values={})=>Object.entries(values).reduce((text,[name,value])=>text.replaceAll('{'+name+'}',value),window.NOCHE_COPY[key]?.[language==='es'?0:1]??key);
const channelName=c=>t('channel'+c.number);
const osd=()=>t('channelPrefix')+' '+pad(channel.number)+' · '+t('channelShort'+channel.number);
function translateElements(){
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
 for(const attr of ['aria','title','alt'])document.querySelectorAll('[data-i18n-'+attr+']').forEach(el=>el.setAttribute(attr==='aria'?'aria-label':attr,t(el.getAttribute('data-i18n-'+attr))));
 document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
}
function applyLanguage(next){
 language=next;document.documentElement.lang=next;document.title=t('title');document.querySelector('meta[name=description]').content=t('description');
 try{localStorage.setItem('noche-language',next);}catch{}
 translateElements();$('#poster-all').textContent=t('allProgrammes',{count:all.length});
 document.querySelectorAll('.poster-channel').forEach(b=>{const c=channels.find(c=>c.number===Number(b.dataset.channel));b.querySelector('span').textContent=channelName(c).toUpperCase();b.setAttribute('aria-label',pad(c.number)+' '+channelName(c));});
 renderScreen();translateArt();renderMusicCopy();if(activeArt)setView('art');if(albumOpen){renderAlbum();setView('album');}if(digits)$('#remote-display').textContent=t('channelPrefix')+' '+digits;
 $('#sound-toggle span').textContent=t(sound.enabled?'soundOn':'soundOff');document.dispatchEvent(new Event('noche:language'));
 if(entered)announce(t('channelWord')+' '+pad(channel.number)+', '+channelName(channel));
 if(activeProject){renderProjectCopy(activeProject);const media=$('#player video,#player iframe,#player img');if(media)media.setAttribute(media.tagName==='IMG'?'alt':media.tagName==='IFRAME'?'title':'aria-label',t(media.tagName==='IMG'?'stillLabel':'videoLabel',{title:activeProject.title}));}
}
document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>applyLanguage(b.dataset.language)));
const featuredTitles=['Si Solamente','Acceso Total','The Stories We Tell Ourselves','Pajuyuk Ancestral Knowledge','Live With TY','The Loft — Comedy','Vision Board'];
const selected=featuredTitles.map(t=>all.find(p=>p.title===t)).filter(Boolean);
const channels=[
 {number:1,name:'Esta noche',english:'Tonight’s selection',subtitle:'Selected work',projects:selected},
 {number:2,name:'Cine',english:'Films',subtitle:'Independent stories',projects:all.filter(p=>p.category==='Film')},
 {number:3,name:'Televisión',english:'Television',subtitle:'On the air',projects:all.filter(p=>p.category==='Television')},
 {number:4,name:'Publicidad',english:'Advertising',subtitle:'Brands & ideas',projects:all.filter(p=>p.category==='Advertising')},
 {number:5,name:'Hola',english:'The next story',subtitle:'Get in touch',projects:[]}
];
const positions=new Map(channels.map(c=>[c.number,0]));
let channel=channels[0],entered=false,digits='',digitTimer,transitionTimer,toastTimer,previousFocus=null,posterFilter=1,posterPage=0;
const dialogs=[...document.querySelectorAll('dialog')],pad=n=>String(n).padStart(2,'0');
const currentProject=()=>channel.projects[positions.get(channel.number)]||null;
function announce(text){$('#status').textContent=text;}
function setView(view){
 const context=view==='art'?'art:'+activeArt?.id:view;
 if(context!==zoomContext){resetCameraZoom();zoomContext=context;}
 document.body.dataset.view=view;
 if(view!=='art')window.NocheArtGuest?.hide();
 sound.setScene(view);
 if(view==='guide')frameObject({x:.264,y:.225,w:.164*.45,h:.364*.45},false);
 else if(view==='art'&&activeArt)frameObject(window.NocheArtGuest?.boundsFor(activeArt.box)||activeArt.box,false);
 else if(view==='watch')frameObject({x:.356,y:.271,w:.219,h:.228},true);
 else if(view==='about')frameObject({x:.621875,y:.0475,w:.1375,h:.305},true);
 else if(view==='album')frameObject(innerWidth<=600?{x:.353,y:.225,w:.267,h:.58}:{x:.245,y:.635,w:.51,h:.36},false);
 else $('#camera').style.transform='';
}
function frameObject(box,besidePanel){
 const scene=$('#scene'),w=scene.offsetWidth,h=scene.offsetHeight;
 const x=scene.offsetLeft-w/2+w*(box.x+box.w/2),y=scene.offsetTop-h/2+h*(box.y+box.h/2);
 const phone=innerWidth<=600,watch=document.body.dataset.view==='watch',panelWidth=watch?Math.min(innerWidth*.32,440):Math.min(innerWidth*(innerWidth<=900?.51:.44),640);
 const space=besidePanel&&!phone?innerWidth-panelWidth-40:innerWidth;
 const artView=document.body.dataset.view==='art';
 const artFooter=artView?$('#art-caption').offsetHeight+36:0;
 const availableH=artView?innerHeight-artFooter-85:besidePanel&&phone?innerHeight*(watch?.46:.26):innerHeight-100;
 const fitScale=Math.min((space-48)/(w*box.w),availableH/(h*box.h),artView?8:6);
 const scale=document.body.dataset.view==='album'?Math.max(fitScale,innerWidth/w,innerHeight/h):fitScale;
 let tx=space/2-x*scale,ty=(artView?(innerHeight-artFooter+30)/2:besidePanel&&phone?innerHeight*(watch?.31:.15):innerHeight/2)-y*scale;
 const bx=scene.offsetLeft-w/2,by=scene.offsetTop-h/2;
 tx=Math.max(innerWidth-(bx+w)*scale,Math.min(-bx*scale,tx));
 ty=Math.max(innerHeight-(by+h)*scale,Math.min(-by*scale,ty));
 $('#camera').style.transform=`translate(${tx}px,${ty}px) scale(${scale})`;
 if(watch)$('#player').style.setProperty('--media-scale',scale);
}
function lockRoomToPoster(locked){
 document.querySelectorAll('#world a,#world button,.programme-controls button').forEach(el=>{if(el.closest('#entrance'))return;const onPoster=!!el.closest('#poster');el.inert=!entered||(albumOpen?!el.closest('#photo-album'):activeArt?el!==activeArt.element:(locked?!onPoster:(onPoster&&el.id!=='wall-guide')));});
}
function leavePoster({focus=true}={}){
 if(document.body.dataset.view!=='guide')return;
 setView('room');$('#wall-guide').hidden=false;$('#leave-poster').hidden=true;lockRoomToPoster(false);
 if(focus)$('#guide-toggle').focus({preventScroll:true});
}
function setHash(value){history.replaceState(null,'','#'+value);}
function handleImage(img,fallback){img.addEventListener('error',()=>{img.remove();fallback?.();},{once:true});}
function renderScreen(){
 const p=currentProject(),picture=$('#picture');picture.replaceChildren();
 if(p){
   if(p.image){const img=new Image();img.src=p.image;img.alt='';picture.append(img);handleImage(img);}
   const title=document.createElement('div');title.className='screen-title';title.dataset.length=p.title.length>30?'long':p.title.length>20?'medium':'short';const small=document.createElement('small');small.textContent=p.broadcaster||channelName(channel)+' / '+pad(positions.get(channel.number)+1);const text=document.createElement('span');text.textContent=p.title;title.append(small,text);picture.append(title);
 }else{const ident=document.createElement('div');ident.className='screen-ident';const title=document.createElement('span');title.textContent=t('contactTitle');const subtitle=document.createElement('small');subtitle.textContent=t('contactSubtitle');ident.append(title,subtitle);picture.append(ident);}
 for(const direction of ['previous','next']){
  const button=$('#'+direction+'-programme'),key=direction+(channel.projects.length<2?'Channel':'Programme');
  button.hidden=false;button.dataset.i18nAria=key;button.dataset.i18nTitle=key;
  button.setAttribute('aria-label',t(key));button.title=t(key);
  const label=button.querySelector('.key-label');if(label){label.dataset.i18n='key'+key[0].toUpperCase()+key.slice(1);label.textContent=t(label.dataset.i18n);}
 }
 $('#channel-osd').textContent=osd();$('#remote-display').textContent=osd();
 const action=t(channel.number===5?'sayHello':(p?.video||p?.youtube?'watch':'viewProject'));$('#screen-action').setAttribute('aria-label',action+(p?' — '+p.title:''));$('#screen-action .screen-action-label').textContent=action+' ↗';
 document.querySelectorAll('.poster-channel').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.channel)===channel.number)));
}
function tune(number,{quiet=false,hash=true,fromScroll=false}={}){
 const next=channels.find(c=>c.number===number);if(!next){$('#remote-display').textContent=t('channelPrefix')+' 01–05';announce(t('chooseChannel'));clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#remote-display').textContent=osd(),1500);return;}
 const wasWatching=!!activeProject;if(wasWatching&&!next.projects.length)closeProject(false);
 channel=next;if(entered&&!fromScroll)scrollToChannel(number);clearTimeout(transitionTimer);if(!quiet){$('#tv-screen').classList.add('tuning');sound.tune();}
 renderScreen();if(hash&&entered)setHash('channel-'+pad(number));announce(t('channelWord')+' '+pad(number)+', '+channelName(next)+(currentProject()?'. '+currentProject().title:''));
 transitionTimer=setTimeout(()=>$('#tv-screen').classList.remove('tuning'),220);
 if(wasWatching&&currentProject())openProject(currentProject());
}
function nextChannel(delta){const index=channels.indexOf(channel);tune(channels[(index+delta+channels.length)%channels.length].number);}
function nextProgramme(delta){if(channel.projects.length<2){nextChannel(delta);return;}positions.set(channel.number,(positions.get(channel.number)+delta+channel.projects.length)%channel.projects.length);tune(channel.number,{fromScroll:true});}
function clearDigits(){digits='';clearTimeout(digitTimer);$('#entry-digits').textContent='';$('#remote-display').textContent=osd();}
function commitDigits(){if(!digits)return;const number=Number(digits);clearDigits();tune(number);}
function enterDigit(digit){sound.click();if(digits.length>=2)digits='';digits+=digit;$('#entry-digits').textContent=digits.length===1?digits+'_':digits;$('#remote-display').textContent=t('channelPrefix')+' '+digits;clearTimeout(digitTimer);digitTimer=setTimeout(commitDigits,digits.length===2?170:850);}
async function updateSound(enabled){const active=await sound.enable(enabled);$('#sound-toggle').setAttribute('aria-pressed',String(active));$('#sound-toggle span').textContent=t(active?'soundOn':'soundOff');if(enabled&&!active)announce(t('audioUnavailable'));}
async function enter(withSound){
 if(entered)return;
 entered=true;document.body.classList.replace('not-entered','entered');lockRoomToPoster(false);$('#entrance').inert=true;
 // Align the channel and room before waiting for audio permission or setup.
 tune(1,{quiet:true});$('#screen-action').focus({preventScroll:true});
 await updateSound(withSound);sound.click();
}
lockRoomToPoster(false);
// Display the supplied artwork on the same fixed pixel grid at every viewport.
const roomArt=$('#room-art'),roomPixels=$('#room-pixels');
let roomLayerPromise=null;
// Fill the mirror with the original drawing; the foreground frame hides its edges.
const portraitSource=new Image(),portraitConfig=window.NOCHE_MIRROR_PORTRAIT;
portraitSource.addEventListener('load',()=>{
 const canvas=$('#mirror-portrait'),ctx=canvas.getContext('2d'),crop=portraitConfig.crop;
 const sx=portraitSource.naturalWidth*crop.x,sy=portraitSource.naturalHeight*crop.y,sw=portraitSource.naturalWidth*crop.w,sh=portraitSource.naturalHeight*crop.h;
 const scale=Math.max(canvas.width/sw,canvas.height/sh)*(portraitConfig.zoom||1),dw=sw*scale,dh=sh*scale;
 const position=portraitConfig.position||{x:.5,y:.5};
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.drawImage(portraitSource,sx,sy,sw,sh,(canvas.width-dw)*position.x,(canvas.height-dh)*position.y,dw,dh);
 $('#mirror-object').classList.add('portrait-ready');
},{once:true});
portraitSource.src=portraitConfig.src;
function renderRoomPixels(){
 if(!roomArt.complete||!roomArt.naturalWidth)return;
 const ctx=roomPixels.getContext('2d');if(!ctx)return;ctx.imageSmoothingEnabled=false;ctx.drawImage(roomArt,0,0,640,400);roomPixels.hidden=false;
 // One fresh master supplies the whole room, including the album and textiles.
 // Copy the actual frame from the same pixel grid, leaving only its glass transparent.
 // This foreground layer stays fixed while the reflection moves behind it.
 const frame=$('#mirror-frame'),front=frame.getContext('2d');
 front.clearRect(0,0,640,400);front.imageSmoothingEnabled=false;
 front.drawImage(roomPixels,398,19,88,122,398,19,88,122);
 front.clearRect(420,41,40,78);frame.hidden=false;
 // Keep the immediate master-image fallback, then assemble the registered layers.
 if(!roomLayerPromise&&window.NocheRoom){
  roomLayerPromise=window.NocheRoom.create(roomPixels).then(room=>{
   if(room.pixelDifferences){ctx.drawImage(roomArt,0,0,640,400);roomPixels.dataset.renderer='reference-fallback';}
   else window.NocheRoomEvents?.create(room).catch(()=>{
    $('#room-events').dataset.state='unavailable';
    const toggle=$('#room-life-toggle');toggle.dataset.i18n='roomLifeUnavailable';toggle.textContent=t('roomLifeUnavailable');toggle.disabled=true;
   });
   return room;
  }).catch(()=>{ctx.drawImage(roomArt,0,0,640,400);roomPixels.dataset.renderer='reference-fallback';return null;});
 }
}
roomArt.addEventListener('load',renderRoomPixels,{once:true});if(roomArt.complete&&roomArt.naturalWidth)renderRoomPixels();
$('#enter-sound').addEventListener('click',()=>enter(true));$('#enter-quiet').addEventListener('click',()=>enter(false));
$('#sound-toggle').addEventListener('click',()=>updateSound(!sound.enabled));
function remoteToggle(force){const show=force??$('#remote').hidden;$('#remote').hidden=!show;$('#remote-toggle').setAttribute('aria-expanded',String(show));sound.click();if(show)$('#channel-up').focus({preventScroll:true});else $('#remote-toggle').focus({preventScroll:true});}
$('#remote-toggle').addEventListener('click',()=>remoteToggle());$('#close-remote').addEventListener('click',()=>remoteToggle(false));
$('#channel-down').addEventListener('click',()=>nextChannel(-1));$('#channel-up').addEventListener('click',()=>nextChannel(1));
$('.keypad').addEventListener('click',e=>{const button=e.target.closest('[data-digit]');if(button)enterDigit(button.dataset.digit);});
$('#clear-digits').addEventListener('click',clearDigits);$('#confirm-channel').addEventListener('click',commitDigits);
$('#previous-programme').addEventListener('click',()=>nextProgramme(-1));$('#next-programme').addEventListener('click',()=>nextProgramme(1));
function resetPlayer(){const container=$('#player');container.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();});container.replaceChildren();container.hidden=true;sound.duck(false);}
function hideDialogs(){dialogs.filter(d=>d.open).forEach(d=>d.close());}
function openDialog(dialog,view='screen'){
 previousFocus=document.activeElement;closeAlbum(false);closeArt(false);closeProject(false);clearDigits();leavePoster({focus:false});hideDialogs();sound.click();setView(view);dialog.showModal();$('#remote').hidden=true;$('#remote-toggle').setAttribute('aria-expanded','false');
}
for(const dialog of dialogs){
 if(dialog.id==='music-dialog')continue;
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{if(!dialogs.some(d=>d.open)){if(activeProject){setView('watch');return;}if(document.body.dataset.view==='guide')return;setView('room');if(previousFocus?.isConnected&&!previousFocus.closest('dialog')&&!previousFocus.closest('#poster')&&previousFocus.getClientRects().length)previousFocus.focus({preventScroll:true});else $('#screen-action').focus({preventScroll:true});}});
}
const poster=$('#poster'),posterProjects=$('#poster-projects');
const posterList=()=>posterFilter==='all'?all:channels.find(c=>c.number===posterFilter).projects;
function renderPosterProjects(){
 const list=posterList(),pages=Math.ceil(list.length/6);posterPage=clamp(posterPage,0,pages-1);
 poster.dataset.page='projects';$('#poster-channels').hidden=true;posterProjects.hidden=false;posterProjects.replaceChildren();
 $('#poster-all').hidden=true;$('.poster-pagination').hidden=false;
 list.slice(posterPage*6,posterPage*6+6).forEach((p,i)=>{const button=document.createElement('button');button.className='poster-project';button.dataset.id=p.id;const n=document.createElement('b');n.textContent=pad(posterPage*6+i+1);const title=document.createElement('span');title.textContent=p.title;button.append(n,title);posterProjects.append(button);});
 $('#poster-page-count').textContent=(posterPage+1)+' / '+pages;$('#poster-prev-page').disabled=posterPage===0;$('#poster-next-page').disabled=posterPage===pages-1;
}
function showPosterChannels(){poster.dataset.page='channels';$('#poster-channels').hidden=false;posterProjects.hidden=true;$('#poster-all').hidden=false;$('.poster-pagination').hidden=true;}
function selectPosterChannel(c){
 if(c.number===5){leavePoster({focus:false});tune(5);openDialog($('#contact-dialog'));return;}
 tune(c.number,{fromScroll:true});posterFilter=c.number;posterPage=0;renderPosterProjects();posterProjects.querySelector('button')?.focus({preventScroll:true});
}
channels.forEach(c=>{const button=document.createElement('button');button.className='poster-channel';button.dataset.channel=c.number;button.setAttribute('aria-label',pad(c.number)+' '+channelName(c));button.setAttribute('aria-pressed',String(c.number===1));const number=document.createElement('b');number.textContent=pad(c.number);const label=document.createElement('span');label.textContent=channelName(c).toUpperCase();button.append(number,label);$('#poster-channels').append(button);button.addEventListener('click',()=>selectPosterChannel(c));});
async function openGuide(event){
 event?.preventDefault();if(!entered)await enter(false);closeAlbum(false);closeArt(false);closeProject(false);hideDialogs();clearDigits();$('#remote').hidden=true;$('#remote-toggle').setAttribute('aria-expanded','false');
 showPosterChannels();$('#wall-guide').hidden=true;$('#leave-poster').hidden=false;setView('guide');lockRoomToPoster(true);sound.click();$('#poster-channels button').focus({preventScroll:true});
}
$('#wall-guide').addEventListener('click',openGuide);$('#guide-toggle').addEventListener('click',openGuide);$('#remote-guide').addEventListener('click',openGuide);$('#skip-work').addEventListener('click',openGuide);
$('#leave-poster').addEventListener('click',()=>leavePoster());
$('#poster-all').addEventListener('click',()=>{posterFilter='all';posterPage=0;renderPosterProjects();posterProjects.querySelector('button')?.focus({preventScroll:true});});
$('#poster-back-channels').addEventListener('click',()=>{showPosterChannels();$('#poster-channels button').focus({preventScroll:true});});
$('#poster-prev-page').addEventListener('click',()=>{posterPage--;renderPosterProjects();});$('#poster-next-page').addEventListener('click',()=>{posterPage++;renderPosterProjects();});
posterProjects.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const p=all.find(p=>p.id===b.dataset.id);const c=posterFilter==='all'?channels.find(c=>c.number>1&&c.projects.includes(p)):channels.find(c=>c.number===posterFilter);positions.set(c.number,c.projects.indexOf(p));leavePoster({focus:false});tune(c.number);openProject(p);});
// About is a room object, so opening the mirror preserves the TV selection.
function openAbout(){openDialog($('#about-dialog'),'about');}
$('#mirror-object').addEventListener('click',openAbout);
$('#poster-about').addEventListener('click',openAbout);
function tiltMirror(e){if(motionReduce.matches)return;const r=$('#mirror-object').getBoundingClientRect();const x=clamp((e.clientX-r.left)/r.width-.5,-.5,.5),y=clamp((e.clientY-r.top)/r.height-.5,-.5,.5);$('.mirror-plane').style.setProperty('--mirror-x',`${x*3}%`);$('.mirror-plane').style.setProperty('--mirror-y',`${y*3}%`);}
$('#mirror-object').addEventListener('pointermove',tiltMirror);
document.addEventListener('pointermove',e=>{if(document.body.dataset.view==='about')tiltMirror(e);});
$('#mirror-object').addEventListener('pointerleave',()=>{$('.mirror-plane').style.setProperty('--mirror-x','0%');$('.mirror-plane').style.setProperty('--mirror-y','0%');});
lockRoomToPoster(false);
function closeProject(focus=true){
 if(!activeProject)return;activeProject=null;resetPlayer();$('#project-panel').hidden=true;setView('room');
 if(focus)$('#screen-action').focus({preventScroll:true});
}
function renderProjectCopy(p){
 const es=language==='es'?window.NOCHE_PROJECTS_ES[p.id]:null;
 $('#project-category').textContent=t(p.category);$('#project-title').textContent=p.title;
 $('#project-role').textContent=[es?.[0]??p.role,p.broadcaster,p.year].filter(Boolean).join(' · ');
 $('#project-description').textContent=es?.[1]??p.description??'';
 const link=$('#detail-link');link.hidden=!p.detail;if(p.detail)link.href=p.detail;else link.removeAttribute('href');
 const youtube=$('#youtube-link');youtube.hidden=!p.youtube;if(p.youtube)youtube.href='https://www.youtube.com/watch?v='+encodeURIComponent(p.youtube);else youtube.removeAttribute('href');
 if(projectTab==='bts')renderBts();
}
function setProjectTab(tab){
 projectTab=tab==='bts'&&projectBts().length?'bts':'description';
 $('#project-panel').dataset.projectTab=projectTab;
 document.querySelectorAll('[data-project-tab][role=tab]').forEach(button=>{
  const selected=button.dataset.projectTab===projectTab;
  button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;
 });
 $('#project-description-panel').hidden=projectTab!=='description';
 $('#project-bts-panel').hidden=projectTab!=='bts';
 if(projectTab==='bts')renderBts();
 $('#project-panel-body').scrollTop=0;
}
function renderBts(){
 const photos=projectBts(),photo=photos[btsPhoto];if(!photo)return;
 const langIndex=language==='es'?0:1,img=$('#bts-photo');
 img.alt=photo.alt[langIndex];
 if(img.getAttribute('src')!==photo.src){img.hidden=false;$('#bts-error').hidden=true;img.src=photo.src;}
 $('#bts-caption').textContent=photo.caption[langIndex];$('#bts-count').textContent=String(btsPhoto+1).padStart(2,'0')+' / '+photos.length;
 $('#bts-prev').disabled=btsPhoto===0;$('#bts-next').disabled=btsPhoto===photos.length-1;
 const thumbnails=$('#bts-thumbnails');
 if(!thumbnails.children.length)photos.forEach((photo,index)=>{
  const button=document.createElement('button'),thumbnail=new Image();
  thumbnail.src=photo.thumb||photo.src;thumbnail.alt='';thumbnail.loading='lazy';thumbnail.decoding='async';
  button.append(thumbnail);button.addEventListener('click',()=>{selectBtsPhoto(index);$('#project-bts-panel').focus({preventScroll:true});$('#project-panel-body').scrollTop=0;});thumbnails.append(button);
 });
 [...thumbnails.children].forEach((button,index)=>{
  button.setAttribute('aria-label',t('btsSelect',{number:index+1,caption:photos[index].caption[langIndex]}));
  button.setAttribute('aria-pressed',String(index===btsPhoto));
 });
}
function selectBtsPhoto(index){
 if(index<0||index>=projectBts().length)return;btsPhoto=index;renderBts();
}
document.querySelectorAll('[data-project-tab][role=tab]').forEach(button=>button.addEventListener('click',()=>setProjectTab(button.dataset.projectTab)));
$('#project-tabs').addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
 e.preventDefault();e.stopPropagation();
 setProjectTab(e.key==='Home'?'description':e.key==='End'?'bts':projectTab==='description'?'bts':'description');
 $('#project-'+projectTab+'-tab').focus({preventScroll:true});
});
$('#project-bts-panel').addEventListener('keydown',e=>{
 if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
 e.preventDefault();e.stopPropagation();selectBtsPhoto(btsPhoto+(e.key==='ArrowRight'?1:-1));
});
$('#bts-prev').addEventListener('click',()=>selectBtsPhoto(btsPhoto-1));
$('#bts-next').addEventListener('click',()=>selectBtsPhoto(btsPhoto+1));
$('#bts-photo').addEventListener('error',()=>{if(!$('#bts-photo').getAttribute('src'))return;$('#bts-photo').hidden=true;$('#bts-error').hidden=false;});
$('#bts-photo').addEventListener('load',()=>{$('#bts-photo').hidden=false;$('#bts-error').hidden=true;});
function mediaButton(p){
 const play=document.createElement('button');play.className='watch-button';play.dataset.i18n=p.title==='Si Solamente'?'playTrailer':'playFilm';play.textContent=t(play.dataset.i18n);play.addEventListener('click',()=>startPlayback(p));return play;
}
function showMediaError(p){
 if(activeProject!==p)return;resetPlayer();$('#project-media-status').hidden=false;$('#media-fit').hidden=true;
}
function fitEmbeddedVideo(){
 const player=$('#player');if(!player.querySelector('iframe')||!player.clientHeight)return;
 const aspect=player.clientWidth/player.clientHeight,fill=player.dataset.fit!=='contain',width=fill?Math.max(1,(16/9)/aspect):1,height=fill?Math.max(1,aspect/(16/9)):1;
 player.style.setProperty('--embed-width',width);player.style.setProperty('--embed-height',height);
 player.style.setProperty('--embed-left',(1-width)*50+'%');player.style.setProperty('--embed-top',(1-height)*50+'%');
}
new ResizeObserver(fitEmbeddedVideo).observe($('#player'));
function startPlayback(p){
 resetPlayer();sound.duck(true);const player=$('#player');player.hidden=false;player.dataset.fit='cover';$('#media-fit').hidden=false;$('#media-fit').dataset.i18n='viewFullFrame';$('#media-fit').textContent=t('viewFullFrame');
 if(p.youtube){
  const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(p.youtube)+'?autoplay=1&rel=0&hl='+language;iframe.title=t('videoLabel',{title:p.title});iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;player.append(iframe);fitEmbeddedVideo();
 }else if(p.video){
  const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.poster=p.image||'';video.src=p.video;video.setAttribute('aria-label',t('videoLabel',{title:p.title}));
  video.addEventListener('error',()=>{if(video.isConnected)showMediaError(p);},{once:true});
  for(const event of ['ended','pause','play'])video.addEventListener(event,()=>{if(video.isConnected&&activeProject===p)sound.duck(event==='play');});player.append(video);
  video.play().catch(()=>{if(video.isConnected&&!video.error){sound.duck(false);const play=mediaButton(p);play.addEventListener('click',()=>play.remove(),{once:true});player.append(play);}});
 }
}
function openProject(p){
 if(!p)return;previousFocus=document.activeElement;leavePoster({focus:false});hideDialogs();resetPlayer();activeProject=p;
 projectTab='description';btsPhoto=0;$('#bts-thumbnails').replaceChildren();$('#bts-photo').removeAttribute('src');$('#project-media-status').hidden=true;$('#media-fit').hidden=true;
 const hasBts=projectBts().length>0;$('#project-tabs').hidden=!hasBts;
 $('#project-description-panel').setAttribute('role',hasBts?'tabpanel':'region');
 $('#project-description-panel').setAttribute('aria-labelledby',hasBts?'project-description-tab':'project-title');
 setProjectTab('description');
 renderProjectCopy(p);$('#project-panel').hidden=false;$('#remote').hidden=true;$('#remote-toggle').setAttribute('aria-expanded','false');setView('watch');
 if(p.video||p.youtube)startPlayback(p);
 // With no video, leave the thumbnail and its title on the television.
 $('#tv-screen').focus({preventScroll:true});
}
$('#media-fit').addEventListener('click',()=>{
 const player=$('#player'),button=$('#media-fit'),contain=player.dataset.fit!=='contain';
 player.dataset.fit=contain?'contain':'cover';button.dataset.i18n=contain?'fillTvScreen':'viewFullFrame';button.textContent=t(button.dataset.i18n);fitEmbeddedVideo();
});
$('#close-project').addEventListener('click',()=>closeProject());
$('#screen-action').addEventListener('click',()=>{if(channel.number===5)openDialog($('#contact-dialog'));else openProject(currentProject());});
$('#home-link').addEventListener('click',e=>{e.preventDefault();closeAlbum(false);closeArt(false);closeProject(false);hideDialogs();leavePoster({focus:false});setView('room');tune(1);});
document.addEventListener('keydown',e=>{
 if(!entered||e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,textarea,select,[contenteditable=true]'))return;
 const modal=dialogs.some(d=>d.open);
 if(modal||document.fullscreenElement)return;
 // Reading areas keep vertical scrolling; the TV and close button keep room zoom.
 if((e.key==='ArrowUp'||e.key==='ArrowDown')&&!e.target.closest('#project-description-panel,#project-bts-panel,.art-notes-body')){
  e.preventDefault();zoomCamera(e.key==='ArrowUp'?1:-1);return;
 }
 if(albumOpen){
  if(e.key==='Escape'||e.key.toLowerCase()==='p'){e.preventDefault();closeAlbum();}
  else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();turnAlbum(e.key==='ArrowRight'?1:-1);}
  else if(e.key.toLowerCase()==='g'){e.preventDefault();openGuide();}
  else if(e.key.toLowerCase()==='m'){e.preventDefault();updateSound(!sound.enabled);}
  return;
 }
 if(e.key.toLowerCase()==='v'){e.preventDefault();openMusic();return;}
 if(e.key.toLowerCase()==='p'){e.preventDefault();openAlbum();return;}
 if(activeArt){
  if(e.key==='Escape'){e.preventDefault();closeArt();}
  else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();nextArt(e.key==='ArrowRight'?1:-1);}
  else if(e.key.toLowerCase()==='g'){e.preventDefault();openGuide();}
  else if(e.key.toLowerCase()==='m'){e.preventDefault();updateSound(!sound.enabled);}
  return;
 }
 if(e.target.closest('#player')&&!['Escape','ArrowLeft','ArrowRight'].includes(e.key))return;
 if(document.body.dataset.view==='guide'){if(e.key==='Escape'||e.key.toLowerCase()==='g'){e.preventDefault();leavePoster();}else if(/^[1-9]$/.test(e.key)){const chosen=channels.find(c=>c.number===Number(e.key));if(chosen){e.preventDefault();selectPosterChannel(chosen);}}return;}
 if(/^[0-9]$/.test(e.key)){e.preventDefault();enterDigit(e.key);return;}
 if(e.key==='Enter'&&digits){e.preventDefault();commitDigits();return;}
 if(e.key==='Escape'){if(activeProject){e.preventDefault();closeProject();return;}if(cameraZoom>1){e.preventDefault();resetCameraZoom();}clearDigits();if(!$('#remote').hidden)remoteToggle(false);return;}
 if(e.key==='Backspace'&&digits){e.preventDefault();clearDigits();return;}
 if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();nextProgramme(e.key==='ArrowRight'?1:-1);}
 if(e.key.toLowerCase()==='g')openGuide();if(e.key.toLowerCase()==='r')remoteToggle();if(e.key.toLowerCase()==='m')updateSound(!sound.enabled);
});
// Follow native page scroll rather than turning wheel gestures into buttons.
const motionFrames=[
 {scale:1,x:0,y:0}, {scale:1.13,x:.8,y:2},
 {scale:1.21,x:1.2,y:3.2}, {scale:1.15,x:-1,y:2.3},
 {scale:1,x:0,y:0}
];
const motionReduce=matchMedia('(prefers-reduced-motion: reduce)');
let motionFrame=0,displayedProgress=0,targetProgress=0,lastFrameTime=0;
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
function scrollRange(){return Math.max(1,document.documentElement.scrollHeight-innerHeight);}
function scrollToChannel(number){
 const progress=channels.findIndex(c=>c.number===number);
 window.scrollTo({top:scrollRange()*progress/(channels.length-1),behavior:'instant'});
 targetProgress=progress;requestMotion();
}
function applyMotion(progress){
 const index=Math.min(motionFrames.length-2,Math.floor(progress)),fraction=progress-index;
 const t=fraction*fraction*(3-2*fraction),a=motionFrames[index],b=motionFrames[index+1];
 const scale=a.scale+(b.scale-a.scale)*t,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;
 $('#room-motion').style.transform=`translate3d(${x}%,${y}%,0) scale(${scale})`;
}
function animateMotion(time){
 const elapsed=Math.min(64,time-(lastFrameTime||time-16));lastFrameTime=time;
 const ease=1-Math.exp(-elapsed/95);
 displayedProgress=motionReduce.matches?targetProgress:displayedProgress+(targetProgress-displayedProgress)*ease;
 applyMotion(displayedProgress);
 if(Math.abs(targetProgress-displayedProgress)>.0005)motionFrame=requestAnimationFrame(animateMotion);
 else {displayedProgress=targetProgress;applyMotion(displayedProgress);motionFrame=0;lastFrameTime=0;}
}
function requestMotion(){if(!motionFrame)motionFrame=requestAnimationFrame(animateMotion);}
function followScroll(){
 if(!entered||albumOpen||activeArt||activeProject||dialogs.some(d=>d.open)||document.body.dataset.view==='guide')return;
 targetProgress=clamp(scrollY/scrollRange()*(channels.length-1),0,channels.length-1);requestMotion();
 const number=channels[Math.round(targetProgress)].number;
 if(number!==channel.number)tune(number,{fromScroll:true});
}
window.addEventListener('scroll',followScroll,{passive:true});
window.addEventListener('resize',()=>{if(entered){resetCameraZoom();window.scrollTo({top:scrollRange()*targetProgress/(channels.length-1),behavior:'instant'});if(albumOpen)renderAlbum();if(['guide','about','watch','art','album'].includes(document.body.dataset.view))setView(document.body.dataset.view);}});
// Normal scrolling stays available over room controls and the television.
$('#world').style.touchAction='pan-y';
let touchStart=null;$('#tv-screen').addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});$('#tv-screen').addEventListener('touchend',e=>{if(!touchStart||!entered||activeProject)return;const x=e.changedTouches[0].clientX-touchStart.x,y=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(x)>65&&Math.abs(x)>Math.abs(y)){e.preventDefault();nextProgramme(x<0?1:-1);}touchStart=null;},{passive:false});
// The originals and pixel surfaces occupy the same frame throughout the camera move.
function translateArt(){
 artworks.forEach(a=>a.element?.setAttribute('aria-label',activeArt===a?t('backRoom'):t('lookArt',{title:artTitle(a)})));
 if(activeArt){
  $('#art-title').textContent=artTitle(activeArt);$('#art-count').textContent=(artworks.indexOf(activeArt)+1)+' / '+artworks.length;
  const langIndex=language==='es'?0:1;
  const medium=activeArt.medium?.[langIndex],description=activeArt.description?.[langIndex],process=activeArt.process?.[langIndex],context=activeArt.context?.[langIndex],noteSource=activeArt.noteSource?.[langIndex];
  $('#art-medium').hidden=!medium;$('#art-medium').textContent=medium||'';
  $('#art-notes').hidden=!(description||process||context);$('#art-description').hidden=!description;$('#art-description').textContent=description||'';
  $('#art-process-section').hidden=!process;$('#art-process').textContent=process||'';
  $('#art-context-section').hidden=!context;$('#art-context').textContent=context||'';
  $('#art-note-source').hidden=!noteSource;$('#art-note-source').textContent=noteSource||'';
  $('#art-source').hidden=!activeArt.source;if(activeArt.source)$('#art-source').href=activeArt.source;else $('#art-source').removeAttribute('href');
 }

}
function paintArtwork(a,detail){
 a.detail=detail;if(!a.original.width||!a.loaded)return;
 const base=Math.max(24,Math.round(a.box.w*640)),width=Math.min(a.original.width,Math.round(base*Math.pow(10,detail)));
 if(a.pixels.width!==width){
  a.pixels.width=width;a.pixels.height=Math.round(width*a.original.height/a.original.width);
  const ctx=a.pixels.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.drawImage(a.original,0,0,a.pixels.width,a.pixels.height);
  // Restrained palette steps at room distance, tapering off toward the real work.
  const step=Math.max(1,Math.round(24*(1-detail)));
  if(step>1){const pixels=ctx.getImageData(0,0,a.pixels.width,a.pixels.height);for(let i=0;i<pixels.data.length;i+=4){for(let c=0;c<3;c++)pixels.data[i+c]=Math.round(pixels.data[i+c]/step)*step;}ctx.putImageData(pixels,0,0);}
 }
 a.original.style.opacity=String(Math.max(0,(detail-.65)/.35));
}
function resolveArtwork(a,target){
 cancelAnimationFrame(a.animation);const from=a.detail||0,start=performance.now();
 if(motionReduce.matches){paintArtwork(a,target);return;}
 const tick=time=>{const p=Math.min(1,(time-start)/900),ease=p*p*(3-2*p);paintArtwork(a,from+(target-from)*ease);if(p<1)a.animation=requestAnimationFrame(tick);};
 a.animation=requestAnimationFrame(tick);
}
function buildArtWall(){
 artworks.forEach(a=>{
  const button=document.createElement('button');button.className='wall-art';button.id='art-'+a.id;button.dataset.frame=a.frame;
  Object.assign(button.style,{left:a.box.x*100+'%',top:a.box.y*100+'%',width:a.box.w*100+'%',height:a.box.h*100+'%'});
  const surface=document.createElement('span');surface.className='wall-art-surface';
  a.pixels=document.createElement('canvas');a.pixels.className='art-pixels';a.pixels.setAttribute('aria-hidden','true');
  a.original=document.createElement('canvas');a.original.className='art-original';a.original.setAttribute('aria-hidden','true');
  const light=document.createElement('span');light.className='art-light';
  surface.append(a.pixels,a.original,light);button.append(surface);a.element=button;$('#art-wall').append(button);
  const image=new Image();image.decoding='async';
  image.addEventListener('load',()=>{
   const crop=a.crop||{x:0,y:0,w:1,h:1};a.original.width=Math.round(image.naturalWidth*crop.w);a.original.height=Math.round(image.naturalHeight*crop.h);
   a.original.getContext('2d').drawImage(image,image.naturalWidth*crop.x,image.naturalHeight*crop.y,image.naturalWidth*crop.w,image.naturalHeight*crop.h,0,0,a.original.width,a.original.height);
   a.loaded=true;a.pixels.width=1;paintArtwork(a,activeArt===a?1:0);
  },{once:true});
  image.addEventListener('error',()=>{a.failed=true;button.setAttribute('aria-label',t('artUnavailable'));if(activeArt===a)announce(t('artUnavailable'));},{once:true});image.src=a.src;
  button.addEventListener('click',()=>activeArt===a?closeArt():openArt(a));
 });
 translateArt();lockRoomToPoster(false);
}
function openArt(a){
 if(!a||!entered)return;
 closeAlbum(false);closeProject(false);hideDialogs();leavePoster({focus:false});clearDigits();$('#remote').hidden=true;$('#remote-toggle').setAttribute('aria-expanded','false');
 if(activeArt&&activeArt!==a){activeArt.element.classList.remove('is-selected');resolveArtwork(activeArt,0);}
 if(activeArt!==a){$('#art-notes').open=false;$('.art-notes-body').scrollTop=0;}
 activeArt=a;a.element.classList.add('is-selected');$('#art-caption').hidden=false;$('#art-to-film').hidden=a.id!=='si-solamente';
 translateArt();setView('art');lockRoomToPoster(false);resolveArtwork(a,1);sound.click();announce(artTitle(a));$('#close-art').focus({preventScroll:true});
 window.NocheArtGuest?.show(a);
}
function closeArt(focus=true){
 if(!activeArt)return;const previous=activeArt;activeArt=null;previous.element.classList.remove('is-selected');resolveArtwork(previous,0);$('#art-caption').hidden=true;setView('room');lockRoomToPoster(false);translateArt();
 if(focus)previous.element.focus({preventScroll:true});
}
function nextArt(delta){if(activeArt)openArt(artworks[(artworks.indexOf(activeArt)+delta+artworks.length)%artworks.length]);}
$('#art-notes').addEventListener('toggle',()=>{if(activeArt)setView('art');});
$('#previous-art').addEventListener('click',()=>nextArt(-1));$('#next-art').addEventListener('click',()=>nextArt(1));$('#close-art').addEventListener('click',()=>closeArt());
$('#poster-art').addEventListener('click',()=>openArt(artworks[0]));
$('#art-to-film').addEventListener('click',()=>{closeArt(false);const film=all.find(p=>p.title==='Si Solamente');if(film){positions.set(2,channels[1].projects.indexOf(film));tune(2);openProject(film);}});
// Reach the paintings through the guide on phones, where that wall begins offscreen.
// The close view keeps all controls keyboard-accessible without moving focus off camera.
$('#art-caption').addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const controls=[...document.querySelectorAll('.language-switch button,#art-caption button')].filter(b=>!b.hidden&&!b.disabled);
 if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}
});
buildArtWall();

// Real photographs live on the pages of the coffee-table album.
function renderAlbum(){
 const chapter=photoChapters[albumChapter];if(!chapter)return;
 const langIndex=language==='es'?0:1,step=albumStep();
 albumPhoto=Math.floor(Math.min(albumPhoto,chapter.photos.length-1)/step)*step;
 $('#album-chapter-title').textContent=chapter.title[langIndex];
 document.querySelectorAll('[data-album-chapter]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.albumChapter)===albumChapter)));
 for(const [side,offset] of [['left',0],['right',1]]){
  const photo=chapter.photos[albumPhoto+offset],img=$('#album-photo-'+side);
  if(side==='right'){$('#album-right-figure').hidden=!photo;$('#album-end').hidden=!!photo;}
  if(!photo||side==='right'&&step===1){img.removeAttribute('src');img.alt='';continue;}
  img.alt=photo.alt[langIndex];
  if(img.getAttribute('src')!==photo.src){
   img.hidden=false;img.nextElementSibling.hidden=true;img.src=photo.src;
  }
  $('#album-caption-'+side).textContent=chapter.title[langIndex];
  $('#album-number-'+side).textContent=String(albumPhoto+offset+1).padStart(3,'0');
 }
 $('#album-page-count').textContent=t('albumPage',{current:Math.floor(albumPhoto/step)+1,total:Math.ceil(chapter.photos.length/step)});
 $('#album-prev').disabled=albumPhoto===0;$('#album-next').disabled=albumPhoto+step>=chapter.photos.length;
}
function openAlbum(){
 if(!entered||!photoChapters.length)return;
 albumReturnFocus=document.activeElement;closeArt(false);closeProject(false);hideDialogs();leavePoster({focus:false});clearDigits();
 $('#remote').hidden=true;$('#remote-toggle').setAttribute('aria-expanded','false');
 albumOpen=true;$('#photo-album').hidden=false;renderAlbum();setView('album');lockRoomToPoster(false);sound.effect('album');
 document.querySelector('[data-album-chapter="'+albumChapter+'"]').focus({preventScroll:true});announce(t('photoAlbum'));
}
function closeAlbum(focus=true){
 if(!albumOpen)return;albumOpen=false;$('#photo-album').hidden=true;setView('room');lockRoomToPoster(false);
 if(focus){const target=albumReturnFocus?.id==='poster-photos'?$('#guide-toggle'):albumReturnFocus;(!target||target.inert?$('#album-object'):target).focus({preventScroll:true});}
}
function turnAlbum(direction){
 const next=albumPhoto+direction*albumStep();if(next<0||next>=photoChapters[albumChapter].photos.length)return;
 resetCameraZoom();albumZoomTarget=null;albumPhoto=next;animateAlbumTurn(direction);renderAlbum();sound.effect('page');
}
function animateAlbumTurn(direction){
 const album=$('#photo-album');clearTimeout(albumTurnTimer);album.classList.remove('is-turning');
 album.style.setProperty('--page-direction',direction>0?'1cqw':'-1cqw');void album.offsetWidth;album.classList.add('is-turning');
 albumTurnTimer=setTimeout(()=>album.classList.remove('is-turning'),350);
}
for(const img of document.querySelectorAll('.album-photo img')){
 img.addEventListener('error',()=>{if(!img.getAttribute('src'))return;img.hidden=true;img.nextElementSibling.hidden=false;});
 img.addEventListener('load',()=>{img.hidden=false;img.nextElementSibling.hidden=true;});
}
document.querySelectorAll('[data-album-chapter]').forEach(b=>b.addEventListener('click',()=>{
 resetCameraZoom();albumZoomTarget=null;albumChapter=Number(b.dataset.albumChapter);albumPhoto=0;animateAlbumTurn(1);renderAlbum();sound.effect('page');
}));
document.querySelectorAll('.album-mount').forEach(mount=>mount.addEventListener('pointerenter',()=>{if(cameraZoom===1)albumZoomTarget=mount;}));
$('#album-object').addEventListener('click',openAlbum);$('#poster-photos').addEventListener('click',openAlbum);
$('#album-close').addEventListener('click',()=>closeAlbum());$('#album-prev').addEventListener('click',()=>turnAlbum(-1));$('#album-next').addEventListener('click',()=>turnAlbum(1));
$('#photo-album').addEventListener('keydown',e=>{if(e.key==='Tab'&&!e.shiftKey&&e.target===$('#album-close')){e.preventDefault();$('.language-switch button').focus({preventScroll:true});}});
let albumTouch=null;
$('.album-spread').addEventListener('touchstart',e=>{albumTouch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
$('.album-spread').addEventListener('touchend',e=>{if(!albumTouch)return;const dx=e.changedTouches[0].clientX-albumTouch.x,dy=e.changedTouches[0].clientY-albumTouch.y;albumTouch=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)turnAlbum(dx<0?1:-1);},{passive:true});

// The record player opens another view of the same console. Providers retain their own players.
const musicDialog=$('#music-dialog'),musicCatalog=window.NOCHE_MUSIC;
function renderMusicCopy(){
 const isMix=musicCollection==='sound',group=musicCatalog[musicCollection],langIndex=language==='es'?0:1;
 $('#music-title').textContent=isMix?t('roomSound'):musicCollection==='recordings'?'SofiriChof':t('myPlaylists');
 $('#music-intro').textContent=t(isMix?'roomSoundIntro':musicCollection==='recordings'?'recordingsIntro':'playlistsIntro');
 $('#room-sound-settings').hidden=!isMix;$('#record-shelf').hidden=isMix;$('#music-profile').hidden=isMix;
 $('#music-selection').hidden=isMix||musicSelected<0;
 document.querySelectorAll('[data-music-collection]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.musicCollection===musicCollection)));
 const shelf=$('#record-shelf');shelf.replaceChildren();
 if(isMix)return;
 group.items.forEach((item,index)=>{
  const button=document.createElement('button');button.className='record-choice';button.dataset.musicIndex=index;
  button.setAttribute('aria-pressed',String(index===musicSelected));button.title=item.publishedTitle||item.title;
  const n=document.createElement('b');n.textContent=pad(index+1);n.setAttribute('aria-hidden','true');
  const label=document.createElement('span'),title=document.createElement('strong');title.textContent=item.title;label.append(title);
  if(item.note){const note=document.createElement('small');note.textContent=item.note[langIndex];label.append(note);}
  button.append(n,label);shelf.append(button);
 });
 const profile=$('#music-profile');profile.href=group.profile;profile.textContent=t(musicCollection==='recordings'?'recordingsProfile':'playlistsProfile');
 $('#music-selection').hidden=musicSelected<0;
 if(musicSelected>=0){
  const item=group.items[musicSelected],provider=musicCollection==='recordings'?'SoundCloud':'Spotify';
  $('#music-track-title').textContent=item.publishedTitle||item.title;
  $('#music-source').href=item.url;$('#music-source').textContent=t(musicCollection==='recordings'?'openSoundcloud':'openSpotify');
  $('#music-listening-note').textContent=t(musicCollection==='recordings'?'soundcloudNote':'spotifyNote');
  const iframe=$('#music-player iframe');if(iframe)iframe.title=t('musicEmbed',{provider,title:item.title});
 }
 const status=$('#music-load-status');if(!status.hidden)status.textContent=t(status.dataset.message||'musicLoading');
}
function musicState(playing,token=musicToken){
 if(token!==musicToken||!musicDialog.open)return;
 if(playing)musicStatus(null);
 musicDialog.classList.toggle('is-playing',playing);pixelTurntable?.setPlaying(playing);
}
function musicStatus(key){
 if(key!=='musicLoading')clearTimeout(musicReadyTimer);
 const el=$('#music-load-status');el.hidden=!key;el.dataset.message=key||'';el.textContent=key?t(key):'';
 // A slow embed may still show its own play, consent or sign-in controls.
 // Never hide it just because the API readiness message has not arrived.
 $('#music-player').dataset.state=key==='musicLoading'?'loading':key?'unavailable':'ready';
 $('#music-retry').hidden=!key||key==='musicLoading';
 $('#music-listening-note').hidden=!!key;
}
function stopMusicPlayer(){
 musicToken++;musicDialog.classList.remove('is-playing');pixelTurntable?.setPlaying(false);pixelTurntable?.setProgress(0);
 try{scWidget?.pause();spotifyController?.pause();spotifyController?.destroy();}catch{}
 scWidget=null;spotifyController=null;$('#music-player').replaceChildren();musicStatus(null);
}
function soundcloudReady(){
 if(window.SC?.Widget)return Promise.resolve(window.SC);
 if(soundcloudPromise)return soundcloudPromise;
 soundcloudPromise=new Promise(resolve=>{
  const script=document.createElement('script');let settled=false;
  const finish=value=>{if(settled)return;settled=true;clearTimeout(timer);if(!value)script.remove();resolve(value);};
  const timer=setTimeout(()=>finish(null),10000);
  script.src='https://w.soundcloud.com/player/api.js';script.async=true;
  script.onload=()=>finish(window.SC?.Widget?window.SC:null);script.onerror=()=>finish(null);document.head.append(script);
 }).then(api=>{if(!api)soundcloudPromise=null;return api;});return soundcloudPromise;
}
function spotifyReady(){
 if(spotifyApi)return Promise.resolve(spotifyApi);
 if(spotifyPromise)return spotifyPromise;
 spotifyPromise=new Promise(resolve=>{
  const script=document.createElement('script');let settled=false;
  const finish=value=>{if(settled)return;settled=true;clearTimeout(timer);if(!value)script.remove();resolve(value);};
  const timer=setTimeout(()=>finish(null),10000);
  window.onSpotifyIframeApiReady=api=>{spotifyApi=api;finish(api);};
  script.src='https://open.spotify.com/embed/iframe-api/v1';script.async=true;
  script.onerror=()=>finish(null);document.head.append(script);
 }).then(api=>{if(!api)spotifyPromise=null;return api;});return spotifyPromise;
}
function musicIframe(url,provider,item){
 const frame=document.createElement('iframe');frame.title=t('musicEmbed',{provider,title:item.title});frame.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
 frame.src=url;$('#music-player').append(frame);return frame;
}
async function selectMusic(index){
 const group=musicCatalog[musicCollection],item=group?.items[index];if(!item)return;
 stopMusicPlayer();musicSelected=index;renderMusicCopy();const token=musicToken;
 musicStatus('musicLoading');
 musicReadyTimer=setTimeout(()=>{if(token===musicToken&&musicDialog.open)musicStatus('musicSlow');},20000);
 const selection=$('#music-selection');selection.scrollIntoView({block:'nearest',behavior:motionReduce.matches?'instant':'smooth'});
 if(musicCollection==='recordings'){
  const frame=musicIframe('https://w.soundcloud.com/player/?'+new URLSearchParams({url:item.url,auto_play:'false',color:'#7e9fcf',show_comments:'false',show_reposts:'false',show_teaser:'false',visual:'false'}),'SoundCloud',item);
  const SC=await soundcloudReady();if(token!==musicToken||!musicDialog.open)return;
  if(!SC){musicStatus('musicControlsUnavailable');return;}
  const widget=scWidget=SC.Widget(frame),events=SC.Widget.Events;
  widget.bind(events.READY,()=>{if(token===musicToken){musicStatus(null);widget.isPaused(paused=>musicState(!paused,token));}});
  widget.bind(events.PLAY,()=>musicState(true,token));
  widget.bind(events.PLAY_PROGRESS,event=>{if(token===musicToken)pixelTurntable?.setProgress(event.relativePosition);});
  for(const event of [events.PAUSE,events.FINISH])widget.bind(event,()=>musicState(false,token));
  widget.bind(events.ERROR,()=>{if(token===musicToken){musicState(false,token);musicStatus('musicFailed');}});
 }else{
  const API=await spotifyReady();if(token!==musicToken||!musicDialog.open)return;
  const id=new URL(item.url).pathname.split('/').pop();
  if(!API){musicIframe('https://open.spotify.com/embed/playlist/'+id+'?theme=0','Spotify',item);musicStatus('musicControlsUnavailable');return;}
  const mount=document.createElement('div');$('#music-player').append(mount);
  API.createController(mount,{uri:'spotify:playlist:'+id,width:Math.round($('#music-player').clientWidth)||400,height:166},controller=>{
   if(token!==musicToken||!musicDialog.open){controller.destroy();return;}
   spotifyController=controller;
   const frame=$('#music-player iframe');if(frame)frame.title=t('musicEmbed',{provider:'Spotify',title:item.title});
   controller.addListener('ready',()=>{if(token===musicToken)musicStatus(null);});
   controller.addListener('playback_update',event=>{musicState(!event.data.isPaused&&!event.data.isBuffering,token);if(token===musicToken)pixelTurntable?.setProgress(event.data.duration?event.data.position/event.data.duration:0);});
  });
 }
}
function openMusic(){
 if(!entered||musicChanging||musicDialog.open)return;musicChanging=true;
 document.body.classList.add('scene-fading');
 setTimeout(()=>{
  musicDialog.classList.remove('is-leaving');musicSelected=-1;renderMusicCopy();
  openDialog(musicDialog,'music');sound.duck(musicCollection!=='sound','record');prepareTurntable();
  document.body.classList.remove('scene-fading');
  musicDialog.querySelector('[data-music-collection="'+musicCollection+'"]').focus({preventScroll:true});
  musicChanging=false;
 },motionReduce.matches?0:220);
}
function closeMusic(){
 if(!musicDialog.open||musicChanging)return;musicChanging=true;stopMusicPlayer();
 musicDialog.classList.add('is-leaving');document.body.classList.add('scene-fading');
 setTimeout(()=>{
  musicDialog.close();musicDialog.classList.remove('is-leaving');
  requestAnimationFrame(()=>{document.body.classList.remove('scene-fading');musicChanging=false;});
 },motionReduce.matches?0:220);
}
musicDialog.addEventListener('close',()=>{
 stopMusicPlayer();pixelTurntable?.setActive(false);musicSelected=-1;sound.restartSelectionForRoom();sound.duck(false,'record');setView('room');
 const returnTarget=previousFocus?.id==='remote-music'?$('#remote-toggle'):previousFocus;
 (returnTarget?.isConnected&&!returnTarget.inert?returnTarget:$('#vinyl-object')).focus({preventScroll:true});
});
musicDialog.addEventListener('cancel',event=>{event.preventDefault();closeMusic();});
$('#close-music').addEventListener('click',closeMusic);
$('#vinyl-object').addEventListener('click',openMusic);$('#remote-music').addEventListener('click',openMusic);
$('#record-shelf').addEventListener('click',event=>{const button=event.target.closest('[data-music-index]');if(button)selectMusic(Number(button.dataset.musicIndex));});
$('#music-retry').addEventListener('click',()=>{if(musicSelected>=0)selectMusic(musicSelected);});
document.querySelectorAll('[data-music-collection]').forEach(button=>button.addEventListener('click',()=>{
 const next=button.dataset.musicCollection;if(next===musicCollection)return;stopMusicPlayer();musicCollection=next;musicSelected=-1;renderMusicCopy();sound.duck(next!=='sound','record');$('.music-panel-body').scrollTop=0;
}));
document.addEventListener('visibilitychange',()=>{
 musicDialog.classList.toggle('music-paused-by-tab',document.hidden);
 if(document.hidden){try{scWidget?.pause();spotifyController?.pause();}catch{}}
});
function syncRoomTurntable(){
 if(musicCollection!=='sound'||!musicDialog.open||musicDialog.classList.contains('is-leaving'))return;
 musicState(sound.musicPlaying);
 const track=sound.currentTrack?.id||'';
 if(musicDialog.dataset.roomTrack!==track){musicDialog.dataset.roomTrack=track;pixelTurntable?.setProgress(0);}
}
document.addEventListener('noche:audio-state',syncRoomTurntable);
function prepareTurntable(){
 if(!pixelTurntablePromise)pixelTurntablePromise=window.NocheTurntable.create($('#vinyl-sprites')).then(player=>{pixelTurntable=player;$('#vinyl-sprites').hidden=false;return player;}).catch(()=>null);
 pixelTurntablePromise.then(player=>{player?.setActive(musicDialog.open);player?.setPlaying(musicDialog.classList.contains('is-playing'));});
}
const vinylArt=$('#vinyl-art');
function paintVinyl(){if(!vinylArt.naturalWidth)return;const canvas=$('#vinyl-pixels'),context=canvas.getContext('2d');context.imageSmoothingEnabled=false;context.drawImage(vinylArt,0,0,640,400);canvas.hidden=false;}
vinylArt.addEventListener('load',paintVinyl,{once:true});if(vinylArt.complete)paintVinyl();

applyLanguage(language);
setHash('channel-01');
})();
