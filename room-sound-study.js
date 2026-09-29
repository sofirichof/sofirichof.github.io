/* Standalone listening-study controls use the same textures as the live room. */
window.roomSoundStudy=new window.NocheRoomTextures();
document.addEventListener("visibilitychange",()=>{window.roomSoundStudy.levels();window.roomSoundStudy.syncOutside();});
