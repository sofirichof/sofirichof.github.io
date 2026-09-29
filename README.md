# Noche y Media — the television room

A local portfolio for Sofía González Irigoyen. The room is the interface: the wordmark sits above the television and its R, G and music controls sit on the casing, the programme guide is a selectable wall poster, and the mirror leads to About. Project details and contact information use translucent panels over the environment. Nothing has been published.

## Open locally

Serve this folder with a static server, then open http://localhost:8765:

```sh
python3 -m http.server 8765
```

No installation or build step is required. Switch on the television to enter with sound, or select **Enter without sound** on its screen.

## Explore the room

- **Random room life:** Smiski visits, the window breeze and the tin-heart glint happen on the main site, and at least two run at the same time. Three lanes share the room: two start 1.5–5.5 seconds after entering and refill within a second of finishing, and a third joins after 9–16 seconds, then every 14–30 seconds. Visitors never share a spot, a drawing or touching space (the TV peeker and presenter, or the lotus and ship, never appear together), and the same room animation never runs twice at once. Each visitor keeps its own movement and glow chances and start times. Open **R → Room life** to turn everything off; the choice is remembered. Events pause during films, artwork, the album, the guide, music, remote use and hidden tabs. Reduced motion leaves the room still. The painter still responds to opening an artwork.

- **Researching thought bubble:** `room-study.html?v=smiski-thought-1&guest=researching&move=1` pauses typing for a pixel cloud with three dots, fades the cloud, then resumes typing. It shares the gesture’s stop/hide/reduced-motion handling and is included in random room visits.

- **Painter on artwork opening:** the main portfolio now brings in the Museum Velázquez Smiski (moustache, brush and palette) beside the selected frame. Click an artwork or use the guide’s Explore the art link. It gives one little brush greeting, follows Previous/Next, and disappears on leaving art. The camera includes room for it without covering the image; reduced motion shows it still. The floating Dalí idea is replaced. The study still offers the editable painter pose (`guest=painter`) and reflected doorway sitter (`guest=mirror`).

- **Animated Smiski visitors:** `room-study.html?v=smiski-zzz-1&guest=album&move=1` includes fourteen short gestures: foot swings, peeks, typing, sleepy nods, breaths, Ship blinking, a pointer sweep, a bowl hide-and-peek and a glance from the TV. Select **Hiding place**, then **Replay movement**; **Slow movement preview** and **Inspect movement** reveal the individual frames. **Occasional movement** leaves quiet gaps. **Occasional glow** runs independently, varying its chance, start time, brightness, rise, hold and fade. **Preview glow** samples one immediately. **Match room lighting** and **Show light map** retain the lantern/window lighting and furniture masks. Lounging and the sleeping Hipper release three tiny pixel Z’s that drift up and fade during their sleepy gestures. Every gesture returns to the exact approved resting pose. The painter is connected to artwork opening on the main portfolio; the other visitors appear through the random room-life system. The room artwork is unchanged.

- **Window breeze study:** open `room-study.html?v=window-breeze-1` and select **Replay breeze**. Six leaf clusters move at staggered times against reconstructed sky, then settle. Use the close-up, frame slider, Slow preview, or **Show sky beneath leaves** to inspect the drawing. Optional repetition leaves 12–20 seconds between moments. The Animation menu retains the approved tin-heart reflection. These same animation frames also play through the main portfolio’s random room-life system.

- **Tin-heart animation study:** open `room-study.html?v=heart-reflection-1` choose **Tin-heart reflection** in the Animation menu, then select **Replay reflection** to see a brief highlight travel over the metal. The enlarged detail, frame slider and Slow preview let you inspect it. It restores the approved still room exactly, stops when the study is hidden or its view changes, and uses still-frame inspection for reduced motion. The main portfolio also schedules this reflection as an occasional room event.

- **The record player / V / remote’s Record Player button:** fades into an overhead view of the same walnut console. A translucent panel has four tabs. **My recordings** lists seven performances in Sofía’s chosen order: Soledad y el Mar, When, the Rises the Moon cover video (YouTube; the SoundCloud audio of the same cover is left out), Alfonsina y el Mar, Instrumental, then Just Fine and Dust in the Wind from YouTube. Every row shows its real publish date read from SoundCloud or YouTube, and links go to both profiles. **Room music** lists the four finished pieces composed for the room in the same list style (A medias de la noche is unfinished and stays unlisted via `listed:false` in `soundscape.js`), with a bilingual description and a “composed for this room” line; selecting one plays it on the room’s turntable once, then the regular rotation returns, and the play/pause and status controls sit under the list. **My playlists** holds five Spotify playlists: The most beautiful music, September, August and July 2026, and Filmmaking Library. **Room sound** holds only the ambience settings: outside-the-window scene, mix levels and fine tuning. Select a title, then use the provider’s player to listen; YouTube embeds report play, pause and progress to the animated turntable. Back to the Room or Escape fades back and stops playback. ES / EN changes the interface without replacing the selected player.
- **Editable player animation:** the close-up is rendered from seven transparent pixel layers. The record rotates, light stays fixed, and the tonearm travels and parks in response to music events. Small cream and blue pixel music notes float upward while it spins, then fade out when playback stops. Open `animation-study.html` to inspect and test the silent animation independently. See `pixel-source/README.md` for editing and the current playback validation limitation.

- **The poster / G button:** the camera moves toward the actual paper. Select a channel, then a printed project title. Six programmes appear per page; the printed arrows turn pages. “All 46 programmes” includes the full collection. “Back to the room” or Escape returns to the television.
- **The paintings:** Love Song With No Purpose, Reflecting on time, the pastel profile, and the Si Solamente poster are framed in the room. Select one to move closer: its pixel surface gains detail and fades into the original within the same frame. Left/right arrows browse the four wall pieces; Escape returns. The guide’s “Explore the art” line also reaches this wall on phones. “About this work” reveals the published artist statement, with a Spanish translation and a link to its source. The Si Solamente poster can open its film directly on the TV.
- **The mirror:** opens About, moves the camera toward the mirror, and gives its reflection subtle movement behind the fixed frame. The rectangular silver tin frame with blue calla-lily tiles follows Sofía’s supplied mirror reference. The resting reflection belongs to the room illustration; the self-portrait is a separate 9:16 canvas fitted behind the rectangular glass opening. As the About view approaches, it fades into Sofía’s actual self-portrait. Returning restores the room reflection. The drawing fills the glass at a larger scale, cropping the sides and some flowers. The actual tin/tile frame is rendered in front of the portrait, covering its edges. Pointer movement moves the image gently behind that fixed frame.
- **The television:** click the current programme to bring the camera closer and play the film or trailer directly on the TV screen. Videos fill the glass by default, cropping to its proportions. “View full frame” shows the original framing without restarting playback; “Fill TV screen” restores the crop. Credits appear in a translucent side panel (below the TV on phones). Direct videos have native playback controls. Returning to the room or changing programmes stops the previous media. Projects without video retain their thumbnail and title on the TV, including while zoomed in. A failed direct video also restores that thumbnail, with a notice in the project panel.
- **Tonight’s selection:** seven projects, with Acceso Total / Telemundo 52 immediately after Si Solamente. Telemundo remains in the Television channel too.
- **Channel labels:** the TV indicator and remote display pair each number with a short name: TONIGHT, FILM, TV, ADS or CONTACT. Spanish labels switch with ES / EN. Entering a channel number temporarily shows the typed digits, then restores the named channel.
- **Starting channel:** every fresh visit and reload starts on Tonight (01), with the first featured project and the room at its starting scroll position. The current channel remains in the address during a visit, but does not override the next fresh start.
- **The television’s R button:** picks up the remote. Type `01`–`05`, or a single digit `1`–`5`, to tune in. Enter/OK confirms immediately. Invalid channels leave the current programme intact.
- **The television’s sound button / M:** switches the ambient sound on or off.
- **Scroll or swipe vertically:** moves continuously through the room and its channel positions.
- **The bottom-right ← / → key buttons, left/right arrow keys, or a horizontal swipe on the television screen:** change the project within a channel without changing scroll position. On Contact or any channel with fewer than two projects, they stay visible and move to the previous/next channel instead. Their accessible names and tooltips reflect the current action in either language.
- The bottom-right arrow buttons stay fixed while the room camera moves. They are also available during TV playback. They hide during the entrance, poster, artwork and album views, About/contact panels, and while the remote is open. Their names and tooltips follow ES / EN. Keyboard zoom remains available in the poster, artwork and album views.
- **↑ / ↓:** zoom in/out without changing the channel. Matching key buttons sit above and between the previous/next buttons in the bottom-right corner. Zoom ranges from the normal framing to 2.2×, and respects reduced-motion preferences.
- Keyboard zoom also works in the album, artwork and guide views. It centers on the artwork, poster or television; in the album, hover over either photograph before zooming to inspect that page. Turning the page, changing artwork/view, or resizing restores normal framing. While watching, left/right switches projects while preserving the extra zoom; up/down still zooms after opening or clicking a native video. Focused text regions keep vertical scrolling and BTS tabs/gallery keep their local navigation. A third-party embedded player may capture keyboard input while focused; the corner arrow buttons remain available for TV navigation. Browser fullscreen retains native player shortcuts.
- **The remote’s channel rocker:** changes channels. Scrolling and typed channel numbers also remain available.
- **Escape:** closes a panel, leaves the poster, dismisses the remote, clears pending digits, or restores normal room zoom.

Channels: 01 selected work (7); 02 films (15); 03 television (6); 04 advertising (25); 05 contact. In the poster view, number keys select its channel rows.

On small screens, the television is framed more closely and the G button brings the offscreen poster into view. During playback, the television stays above its translucent information panel. Reduced-motion preferences disable camera movement transitions, scroll zoom, static animation, and reflection tilt.

- **ES / EN:** changes the complete interface and project copy without restarting the video, leaving the current channel or resetting the poster page. First visits use English; a saved choice is remembered in this browser. About and contact also have an accessible language selector inside their panels.

## Files and editing

- `music.js`: the public SoundCloud recordings, YouTube performances and Spotify playlist selection with publish dates, verified against Sofía’s profiles on 2026-09-28/29. Room pieces are listed from `soundscape.js` at run time; their descriptions live in `i18n.js` under `roomTrack_*`.
- `music.css`: overhead music view, fade and responsive translucent panel.
- `turntable-sprites.js`, `assets/turntable/`: animated renderer and seven editable PNG layers with their coordinate manifest.
- `animation-study.html`: silent animation preview and layer inspection.
- `pixel-source/`: reproducible extraction script and editing instructions.
- `assets/vinyl-closeup-clean.png`: reference and fallback image for the overhead view; `vinyl-closeup-prompt.txt` and `vinyl-closeup-clean-prompt.txt` retain the exact prompts.

- `photography.js`: the graduation, event, portrait and on-set photo chapters, ordered image sources and bilingual alternative text. Use local files or public Supabase image URLs for `src`.
- `bts.js` and `assets/si-solamente/bts/`: Si Solamente’s 19-photo BTS gallery, viewing copies, thumbnails, bilingual captions and source-file notes.
- `assets/photography/`: 31 unchanged 2048-pixel JPEG exports from Sofía’s previous photography portfolio, with provenance in `SOURCES.md`.

- `index.html`: environment objects, entrance, poster structure, detail panels, biography and contact copy.
- `style.css`: pixel typography, object alignment, camera framing, panel appearance and responsive layouts.
- `app.js`: scene rendering, object camera moves, poster pagination, channels, keyboard/touch controls, remote, player, and focus management.
- `art.js`: the four wall pieces, verified titles and artist statements, descriptive labels for untitled entries, bilingual medium/description text, room positions, and the separate mirror portrait source. Published titles retain their original language.
- `content.js`: the 46 existing projects with public media URLs and English project copy.
- `i18n.js`: Spanish/English interface strings and Spanish project descriptions and credits, keyed by the IDs in `content.js`. Keep both files updated when adding a project. Proper names, film titles, and campaign names retain their original wording.
- `DESIGN-NOTES.md`: identity and language decisions, with links to the cultural research behind this correction.
- `soundscape.js`: the original browser-generated sound study.
- `assets/room-master.png`: the approved fresh room, generated from text with the built-in image-generation tool. No prior room image was used as an edit source. This untouched 1586 × 992 master supplies the whole scene, including the new mirror, shared TV/record-player console, rug, throw and blue album. The browser renders it on a fixed 640 × 400 grid with nearest-neighbor scaling.
- `assets/fresh-room-prompt.txt`: the exact generation prompt and mode.
- `room-layout.css`: the new room’s screen, controls, wordmark, guide, mirror and closed album positions. Camera framing is in `app.js`; artwork positions are in `art.js`.
- `assets/art/`: copies of Sofía’s five original artworks, not AI redrawings.
- `assets/art/SOURCES.md`: provenance, source resolution, and the portrait display crop.
- `favicon.svg`: moon favicon.

The mirror reflects the room at a distance and reveals Sofía’s supplied self-portrait in About. The portrait is her original drawing, not a generated image. Its slight movement is a translation of the image behind a separate foreground frame; the surrounding room is not a full navigable 3D model.

## Media, GitHub Pages and Supabase

Copy this folder’s contents to your GitHub Pages publishing directory when ready. This package does not commit to GitHub or modify Supabase.

Media references public URLs from the existing portfolio. Replace `image` and `video` in `content.js` with public Supabase storage URLs as needed. Public media does not require a Supabase client. Private storage with expiring URLs requires your own refresh service. Never put a service-role key in frontend code.

Each record supports:

```js
{
  id: 'unique-id',
  title: 'Project title',
  category: 'Film', // Film, Television, or Advertising
  role: 'Producer',
  year: '2026',
  image: 'https://your-public-image-url',
  video: 'https://your-public-video-url',
  youtube: '', // YouTube ID; takes precedence over video
  detail: 'https://your-project-page',
  description: 'Project description'
}
```

The channel definitions and featured titles are near the top of `app.js`. Existing project links open full credits and galleries on the live site. Vimeo can be linked through `detail`; native Vimeo embedding is not implemented. There is no upload interface or database in this package.

## Sound

The live site now has a game-style room soundscape. Press **Switch on** or the TV's **♪** button to listen. Open **Record player → Room sound** for the mixer. It starts with **Night & street**: the approved cricket calls, occasional passing cars, soft distant horns and wordless pixel chatter. **Still night**, **Street outside** and **Quiet outside** are also available. Music, exterior and object levels are separate; **Fine tune** exposes the individual outdoor sounds and room air. Settings are saved locally, but each fresh visit still requires a sound gesture.

The record player’s **Room sound → Room playlist** selector previews any of the four themes or **A medias de la noche - the inspo**. The vinyl spins while room music is audible and stops when paused, muted, hidden, or interrupted by other media. Returning to the room restarts the chosen piece once, then resumes the regular four-theme rotation. A medias de la noche - the inspo plays only when selected in the vinyl playlist and stays out of automatic rotation. It now uses a 1:39 draft pixel arrangement of the supplied recording’s opening sung passages: a synthesized lead follows the extracted vocal pitch and phrasing over short guitar strums. The lead is lifted one octave; the accompaniment is arranged in C from the supplied chord chart. Raw recording audio is not included in the site. The older chord-only study remains as a spare asset. **Pause music** leaves outside ambience running. Song choices are session-only.

The four original themes rotate unchanged: **Night Channel**, **After the Credits**, **Window Lights**, and **One More Page**. The album now has its own opening and page-turn sounds; the remote and channel changes use the clearer normalized effects. Sounds come from the existing original synthesis, with no external audio service, copied game samples, or audio downloads.

`room-audio.js` coordinates one shared AudioContext, the existing `soundscape.js` music engine, and the reusable `room-textures.js` effects. Ambient sounds use bounded random timing, shuffle bags with no adjacent repeats, stereo placement, and at most one voice per ambient sound type (four total). Object sounds have cooldowns and a three-voice cap. Reading views soften the exterior. Film and record sessions have independent priority flags, so closing one cannot accidentally override another. During media playback, background music and ambience fade away; on return they resume. Native video pause/end restores the room; embedded YouTube stays quiet until its project closes. The recordings and playlists tabs silence the room while choosing or playing a track, including when third-party playback is unavailable. The **Room sound** tab stops any external player and restores the room mix so adjustments can be heard immediately.

Mute and hidden tabs cancel ambient events, stop the music scheduler and suspend the audio context after a brief fade. Media priority stops scheduling while preserving the audio context for return. Volume changes are smoothed. Setting only Music to zero keeps ambience available. Object sounds queued during loading cannot play after a mute.

`sound-study.html` remains a separate listening and export page, using the same exterior samples and shared texture engine. It can render the themes to WAV and audition single effects. Its mix controls are independent from saved settings on the site.

The implementation follows the event randomization and mixer-state concepts in [FMOD's instrument documentation](https://www.fmod.com/docs/2.03/studio/working-with-instruments.html) and [mixing documentation](https://www.fmod.com/docs/2.03/studio/mixing.html), using native Web Audio rather than adding middleware. Audio activation follows [MDN's Web Audio guidance](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices). More sound-design references are in [sound-design-notes.md](sound-design-notes.md).

Run `node --test tests/room-audio.test.cjs tests/room-music.test.cjs` for lifecycle, preference, media-priority, late-effect, shuffle, song selection, sample pause/resume, loading races and return-to-rotation checks. Browser checks cover silent entry, mixer activation, ambience with music muted, whole-room mute, album effects, film/record priority and return. The cricket sample generator and all four compositions are unchanged.

## Visual references and verification

The interaction and rendering direction are informed by [Yuki Asakura’s portfolio](https://yukiasakura.com/). The room uses stepped pixel contours and dithered shadows, with original content and sound. It is a layered scene with camera transforms, rather than a reconstruction of the reference’s 3D geometry.

Interior choices prioritize the first group of saves in [Sofía’s interior board](https://www.pinterest.com/sofiri_chof/interior-aesthetics/) after reviewing the wider collection. Specific references include the [tin hearts](https://www.pinterest.com/pin/497225615132708066/), [sun-and-moon collection](https://www.pinterest.com/pin/497225615132708065/), [mirrors](https://www.pinterest.com/pin/497225615132708062/) and [contemporary Mexico City interior](https://www.pinterest.com/pin/497225615132708063/). These details come from her selected references. The room is fictional.

The rectangular mirror replacement was checked at desktop and phone sizes, including reflection alignment, About activation and phone panel clearance.

Checked the poster camera move, channel selection, pagination, access to all 46 projects, project opening, mirror/About interaction, keyboard shortcuts, scroll position, focus restoration, phone layout, and media cleanup. Si Solamente’s trailer was checked in the revised interface. The new revision also checks language switching during active playback, poster pagination preservation, translated About/contact panels, remote controls, phone playback, still-only projects, and media cleanup. Not every remote film was played end-to-end; availability depends on its host. The YouTube embed for The Stories We Tell Ourselves currently reports unavailable. YouTube projects include a direct watch link as well as their original project link; replace unavailable sources in content.js with working public media URLs. Browser-native video controls follow browser UI preferences; third-party players manage their own interface. Changing the website language never reloads an active player. Biography and credits come from the supplied screenshots and existing portfolio.

The site has complete Spanish and English interface versions, with English as the initial default. VT323 and DM Mono load through Google Fonts with monospace fallbacks. The restored wordmark uses DM Sans and an italic DM Serif Display “y,” with local fallbacks. Generated artwork never represents an actual film project.

## Art wall revision

The small guide shares the cleared wall with four artworks. Its text remains selectable after the camera approaches; all 46 projects and eight index pages remain available. The four wall paintings and mirror portrait use local images, so viewing them does not depend on Instagram being available. Three are 640-pixel public Instagram copies; replace these with full-resolution originals before a large-screen final launch. The mirror self-portrait and film poster use the supplied/local files. Pixel reduction and the transition to originals happen in the browser, without changing the source artwork. Reduced-motion users see the selected original immediately. Approved Smiski visits, window breezes and tin-heart reflections now use the random room-life system.

Checked the five loaded images (four on the wall and one in the mirror), desktop and phone camera framing, original-detail transition, ES/EN labels, guide pagination, keyboard return, and the poster-to-TV trailer route. Source files stay unchanged outside this project.

## Verified artwork captions and mirror portrait

Instagram captions were read directly for the three selected Instagram works. **Love Song With No Purpose** and **Reflecting on time** are the published titles, preserving their wording in both languages. Their expanded notes now draw from Sofía’s 2022 AP Drawing submission: the concept, working process and shared investigation into memory. Materials and dimensions in inches were confirmed against the PDF. The first-person notes are edited adaptations, with Spanish translations, and their provenance appears inside “About this work.” The sphere’s Escher reference is retained. The pastel profile has an artist statement and soft-pastel tags, but no stated title; its display label remains descriptive, and its statement omits older sales copy and hashtags.

The four wall pieces retain the pixel-to-original transition. The self-portrait moved to a separate layer behind the mirror frame, fading in during About and out on return, respecting reduced-motion preferences. It now fills the glass with a larger crop instead of preserving all edges of the paper. The foreground frame is copied from the same room pixel grid to maintain exact alignment. The portrait remains the supplied original; its foreground frame is taken from the approved room master. Checked return behavior, caption expansion and language switching, phone panel clearance, and the four-piece gallery count.

The artwork notes support optional `process`, `context` and `noteSource` language pairs in `art.js`. These sections appear only when provided; the pastel and film poster do not inherit AP portfolio text. Expanded notes scroll independently and can be focused with the keyboard. Changing paintings closes the notes and resets their scroll position. The full AP PDF is kept outside the website package.

## Si Solamente — BTS tab

Si Solamente’s TV panel has **Description** and **BTS** tabs attached to its outside top edge. They retain the translucent panel styling and remain visible while the panel’s contents scroll. BTS contains 19 photographs: 18 from the local `Si_Solamente/bts` and `Si_Solamente/BTS_Photos_Edited` folders, plus the outdoor cast-and-crew photo from the existing portfolio. The outdoor and indoor group photos are first and second, followed by crew moments, camera setups and set details. Switching tabs or photos leaves the TV player running. Use the arrows or thumbnail selection; selecting a thumbnail returns the panel to its larger image. Arrow keys within the tab list change tabs, and left/right within the gallery change photos. Up/down inside this panel scroll its text and gallery instead of zooming the room.

The photos and thumbnails are local JPEG viewing copies with their full frames preserved; originals remain untouched. `bts.js` maps galleries to project IDs from `content.js`, with Spanish/English caption and alt-text pairs. Captions describe the images and do not invent photographer credits. Source filenames are documented in `assets/si-solamente/bts/SOURCES.md`. You can replace the image paths with public Supabase URLs later.

On phones, the BTS panel extends into the lower part of the screen while the TV remains above it. The room’s programme arrows return when you choose Description or close the project. Projects without a BTS gallery retain their regular description panel.

Verified the exterior tab placement on desktop and phone, Spanish labels in short landscape screens, tabs remaining visible while the inner panel scrolls, continued trailer playback across tabs, last-photo navigation, thumbnail return to the preview, Spanish/English selection preservation, keyboard tab/photo navigation, and absence of BTS tabs on projects without galleries.

## Photography album

A single blue clothbound album lies flat beside the wooden bowl on the coffee table. Its unobstructed cover, page edge and contact shadow are drawn into the scene; the translated Photography title sits on its brass label plate. The clickable area follows the album and excludes the bowl. The complete table and closed album belong to the approved fresh room master, with no separate image patches. The camera approaches the open album; its labels, tabs, photographs and navigation belong to the book itself. The TV guide also includes an album button for access when the table is outside the current view.

- The expanded selection contains five graduation portraits, fifteen event photographs, eight portraits and three on-set photographs. Four colored tabs run down the edge of the album.
- Desktop shows two photographs per spread. Phones show one photograph at a time, preserving the original aspect ratio with no cropping.
- Use the chapter tabs, page arrows, left/right keyboard arrows, or horizontal swipes on the pages. P opens/closes the album; Escape closes it; G returns to the guide. Page buttons stop at chapter boundaries.
- ES/EN switches chapter labels, controls and image descriptions while retaining the selected page. The published images have no invented client names or dates.
- The album remembers its chapter/page during the visit. Closing returns to the current room channel. Room controls pause while reading the album; the language selector remains available.
- Photos load as their pages are visited. A failed image displays a translated message. Reduced-motion preferences disable the opening/page movement.

The closed book uses the approved room artwork with an HTML label and click target; the open pages use HTML/CSS. Sofía’s source photographs, self-portrait and wall artwork remain unchanged. Photo sources can be replaced with public Supabase URLs in `photography.js`; this revision does not upload or publish anything.

Checked desktop/phone framing, image loading, chapter boundaries, page changes, language switching without changing the selected photo, guide access, keyboard opening/return, and console errors.

## Interface palette and pixel navigation

The interface uses midnight blue, slate blue and pale blue highlights inspired by the mirror tiles. This applies to the translucent panels, project tabs, remote, TV controls, wordmark, language selector and album controls. Navigation arrows use geometric SVG icons on a 12-by-12 grid, with square corner keys. Existing accessible names, language switching, keyboard shortcuts and disabled states remain in place. Verified desktop and phone layouts, channel switching, zoom, BTS navigation, Spanish labels and album paging.

## Approved fresh room

The new master was generated from scratch and approved by Sofía. The console follows the original room’s long walnut record cabinet, with the record player and TV on one continuous top. The rug combines her R6 wine-red palette, R9 navy/red motifs and R3 cream border; the chair throw follows T3’s yellow, blue and muted pink plaid. The silver tin/calla-lily mirror, hearts, sun-and-moon ornament, stained glass and lantern remain defining elements. Keep the approved illustration intact when adjusting interface placement.

The record player opens the music panel described above. Random ambience events run on the main site.


Fresh-room checks: desktop room alignment, TV playback, Description/BTS switching, mirror portrait masking, guide pagination, pixel-to-original artwork, album chapter/page changes, and ES/EN switching passed. All local asset references and edited JavaScript syntax were checked. A fresh phone visual check remains pending because the browser’s viewport override did not change its reported dimensions; prior phone checks above apply to the earlier room.

## Room objects and About

The guide and soft-pastel frame have traded places, putting the selectable guide beside the television. Hovering the album highlights its full illustrated shape, including its page edge; keyboard focus gives the same highlight. The record player also has a full-object hover highlight covering its lid and base. The record player opens the music panel.

About is part of the room, accessible through the mirror and the guide’s Meet Sofía link. It no longer tunes away from the current channel or replaces its project thumbnail. Closing About restores the same TV selection. The six channels are Tonight, Film, Television, Advertising, Contact and Supergood; the guide, remote hints and scroll navigation use 01–06. The Supergood poster and Telemundo 52 cap are independent room overlays, leaving the approved room master untouched. The Supergood poster tunes channel 06; the cap is a keepsake that tunes the television to Acceso Total.

## Music playback validation

The animation and local music controls were exercised in the preview browser. External provider iframes remained blank there, including in an isolated test without this site; their documents stayed `about:blank`. Actual streaming and synchronization with provider events still need a normal-browser check before publishing. After 20 seconds without a readiness event, a notice offers Retry Player and the direct listening link. The embed remains visible so delayed play, consent or sign-in controls are not hidden. Retry recreates only the selected player. Failed API loads can be retried. The animation study works independently of those embeds. No audio files, account credentials or API secrets are included.


## Room layer foundation

The approved room has 43 object/surface layers plus four resting contact patches, assembled by `room-sprites.js`. All 256,000 visible pixels still match the original 640 × 400 grid. The three tin hearts have reconstructed plaster behind them, and the album has reconstructed wood grain beneath it. `room-study.html` provides comparison, isolation, and a Remove object view for these four prepared objects. The live room retains its original-image fallback. See `pixel-source/ROOM-LAYERS.md` for editing and remaining reconstruction work. Smiski visits, the heart reflection and the window breeze are enabled through `room-events.js`. Other hidden surfaces and additional room animations remain future work.

## Room event checks

Run `node tests/room-events.test.cjs`. It exercises independent effect choices across all visitor clips, both timing orders and overlap, three-lane scheduling with at least two concurrent events and an occasional third, visitor spacing, cleanup, view/tab changes, reduced motion, remembered controls and partial asset failures. `room-guests.js` supplies the same pixel rendering, room lighting and occlusion to the live site and study. `room-events.js` owns the live event lifecycle; it never rewrites the source artwork or changes audio permission.
