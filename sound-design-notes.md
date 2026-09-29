# A small world, heard through the window

The approved music and crickets stay as they are. The street sounds and object effects are now integrated into the live room; the listening study remains available for auditioning.

## References reviewed

- [PICO-8's official sound editor documentation](https://www.lexaloffle.com/dl/docs/pico-8_manual.html) describes short sequences with independent pitch, instrument, volume and effects, including pitch slides, fades, buzzing and dampening. The useful principle here is to give each event a clear shape and tone, then soften it for distance.
- [sfxr, by its creator DrPetter](https://www.drpetter.se/project_sfxr.html), is a tool for making and auditioning simple game sound effects. Its emphasis on tweaking and listening informed the separate audition buttons: the listener should be able to judge a horn or engine on its own.
- [Bfxr, by its creator increpare](https://www.bfxr.net/), extends sfxr and also includes a procedural footstep tool. This is useful reference material for future room interactions; no additional footsteps have been added in this revision.

These are technique references. No source code, music, samples or recordings from those tools or from Stardew Valley were copied.

## What changed

- **Cars:** short, pitched motor harmonics with a small change of pitch as they pass. The broad noise swell that resembled waves is removed; tire noise is a very small detail.
- **Horns:** a soft two-tone honk, with single and double variations. Each is brief, slightly off-center, and separated by long pauses.
- **Chatter:** two low, wordless synthesized voices trade uneven little phrases. These are intentionally stylized game voices, not speech, an accent imitation, or real field recordings. They have a separate level because their fit needs to be judged by listening.
- **Crickets:** identical samples, level and timing to the approved version.

I would keep the music warm and the sounds restrained. Pixel art can be accompanied by clear, soft audio; everything does not need to be aggressively distorted or reduced to 8-bit samples.

Use **Street outside → Outside only** to hear the street layer, or **Both** to combine it with the crickets. Use the single-sound buttons to audition each street sound immediately. Quiet gaps are intentional.


## How the site runs it

The mixer follows [FMOD's scatterer and multi-instrument concepts](https://www.fmod.com/docs/2.03/studio/working-with-instruments.html): sound variations, irregular pauses and stereo placement. [FMOD's snapshots](https://www.fmod.com/docs/2.03/studio/mixing.html) informed the room, reading and media states. The implementation uses the site's own Web Audio engine, not FMOD itself.

One audio context serves the music and texture buses. Ambient events have a maximum count and no immediate repeated variant. The room gets quieter while reading, fades out for films and records, and returns when the media session ends. Mute and hidden-tab states stop scheduling. Per-layer settings are saved; starting sound always requires a fresh user gesture on a new visit, following [MDN's guidance](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices).

The live controls are on the record player under **Room sound**. The four songs and the approved cricket samples remain unchanged.
