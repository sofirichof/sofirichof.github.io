(() => {
 const sound=window.nocheSound,panel=document.querySelector('#room-sound-settings');
 function text(key){return window.NOCHE_COPY[key]?.[document.documentElement.lang==='es'?0:1]||key;}
 const songToggle=document.querySelector('#room-song-toggle');
 function sync(){
  const settings=sound.settings,track=sound.currentTrack;
  const playKey=sound.musicPlaying?'roomSongPause':'roomSongPlay';
  songToggle.dataset.i18n=playKey;songToggle.textContent=text(playKey);songToggle.setAttribute('aria-pressed',String(sound.musicPlaying));songToggle.disabled=sound.musicLoading;
  const songState=document.querySelector('#room-song-state');
  songState.textContent=sound.musicError?text('roomSongError'):sound.musicLoading?text('roomSongLoading'):(text(sound.musicPlaying?'roomSongNow':'roomSongReady')+' '+(track?.labelKey?text(track.labelKey):track?.title||''));
  document.querySelector('#room-sound-profile').value=settings.profile;
  panel.querySelectorAll('[data-room-level]').forEach(input=>{
   const percent=Math.round(settings[input.dataset.roomLevel]*100);input.value=percent;
   document.querySelector('#mix-'+input.dataset.roomLevel+'-value').value=percent+'%';
  });
  const key=sound.enabled?'roomSoundDisable':'roomSoundEnable',power=document.querySelector('#room-sound-power');
  power.dataset.i18n=key;power.textContent=text(key);power.setAttribute('aria-pressed',String(sound.enabled));
  const statusKey=!sound.enabled?'mixMuted':sound.ducked?'mixMedia':sound.context?.state!=='running'?'mixSuspended':'mixPlaying';
  const status=document.querySelector('#room-sound-status');status.dataset.i18n=statusKey;status.textContent=text(statusKey);
  const toggle=document.querySelector('#sound-toggle');toggle.setAttribute('aria-pressed',String(sound.enabled));toggle.querySelector('span').textContent=text(sound.enabled?'soundOn':'soundOff');
  Object.assign(document.body.dataset,{audioEnabled:String(sound.enabled),audioProfile:settings.profile,audioDucked:String(sound.ducked),audioContext:sound.context?.state||'not-started',audioScene:sound.scene,audioMusicClock:String(!!sound.musicEngine.timer),audioTrack:track?.id||'',audioSongMode:sound.musicEngine.selectionMode||'auto',audioMusicPaused:String(sound.musicPaused),audioMusicPlaying:String(sound.musicPlaying)});
 }
 songToggle.addEventListener('click',()=>sound.toggleMusic());
 document.addEventListener('noche:language',sync);
 panel.querySelectorAll('[data-room-level]').forEach(input=>input.addEventListener('input',()=>sound.setLevel(input.dataset.roomLevel,Number(input.value)/100)));
 document.querySelector('#room-sound-profile').addEventListener('change',event=>sound.setProfile(event.target.value));
 document.querySelector('#room-sound-power').addEventListener('click',()=>sound.enable(!sound.enabled));
 document.querySelector('#room-sound-reset').addEventListener('click',()=>sound.reset());
 document.addEventListener('noche:audio-state',sync);
 document.addEventListener('noche:outside-state',event=>{const s=event.detail;Object.assign(document.body.dataset,{audioAmbientClock:String(s.running),audioOutsideVoices:String(s.active),audioCrickets:String(s.crickets),audioCars:String(s.traffic),audioHorns:String(s.horns),audioChatter:String(s.chatter)});});
 document.addEventListener('noche:object-sound',event=>{document.body.dataset.audioObject=event.detail.kind;document.body.dataset.audioObjectPeak=String(event.detail.peak);});
 sync();
})();
