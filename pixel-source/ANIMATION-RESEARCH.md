# Pixel animation research for Noche y Media

Research date: 28 September 2026. This is an implementation brief; the proposed animations below are not enabled on the portfolio.

Current revision: the breeze has been widened after feedback that the initial pair read as one leaf. Six clusters at different heights and in both panes now respond at staggered times, over 3.26 seconds. Source movement stays within one pixel and each joining stem stays fixed. The new full-window detail shows how the movement travels rather than isolating only the original pair. Frame verification confirms all six clusters change, at four distinct timing offsets, with an exact restoration of the original.

Optional Smiski visitors now have their own transparent study canvas. Three original pixel interpretations draw from [Smiski's official sitting, peeking and lounging poses](https://smiski.com/e/products/series-1/). The room is never overwritten: the optional bodies, stepped glows and shadows clear together. The TV silhouette masks the peeking figure. Manual controls expose each placement; a separate opt-in preview uses single visits and quiet randomized gaps. These characters are personal Easter eggs requested by Sofía, independent of the room's existing biography and artwork.

Second prototype: `room-study.html?v=window-breeze-1` offers **Window breeze** alongside the approved tin-heart reflection. Two traced leaf tips shift at different times by at most one pixel; their joining stems stay fixed. Eight drawings play over 2.2 seconds and restore the source exactly. Only the two tip silhouettes are removed and redrawn over reconstructed sky sampled from the same pane. The window, house, stained glass and remaining foliage are unchanged. **Show sky beneath leaves** exposes that local repair; it is not a reconstruction of the entire exterior. **Repeat with quiet pauses** optionally schedules another preview after 12–20 seconds of stillness. Changing study or view, inspecting a frame, returning to still, or hiding the tab cancels pending playback. Source: `draw-window-breeze.py`; assets: `assets/room-animation/window-breeze.*`.

First prototype: `room-study.html?v=heart-reflection-1` now has a manually replayable tin-heart reflection. Nine frames (including the unchanged beginning and end) play over 1.8 seconds. Seven light variations change 12–26 pixels per frame along explicitly selected metal ridges, using only colours from the original sprite. The outline, contact patch, and all other room pixels remain fixed. A five-times enlarged view, frame slider, and slow playback make the small changes inspectable. The main portfolio does not load this animation; random scheduling remains off.

The player uses elapsed-time frame durations, cancels when the tab is hidden or the study changes views, and returns to the original frame. With reduced motion enabled, Replay shows a single static variant instead; the frame slider remains available. Source authoring is in `draw-heart-reflection.py`. Generated frames and timings are in `assets/room-animation/`. Browser checks verified playback, cancellation, frame inspection, removal/restoration and an exact return to the original room. Offline comparison verified every frame's palette, silhouette and unchanged pixels outside the heart.

The direction is a quiet, interactive room with deliberate pixel animation. Preserve Sofía’s approved composition, colours, materials and personal objects. Use movement to give those objects presence and make interactions feel physical.

## Research findings and their application

### Light can create movement within a fixed drawing

Mark Ferrari explains colour cycling as coordinated colour changes at fixed pixel positions. The image and palette must be designed for the effect; it cannot simply be applied to an arbitrary image. His work also demonstrates designed lighting and weather changes. [Ferrari’s explanation](https://www.effectgames.com/effect/article-Q_A_with_Mark_J_Ferrari.html)

Joseph Huckaby’s browser implementation renders these effects in Canvas and pairs scenes with ambience. I opened the working demo and inspected its night scene. [Canvas Cycle](https://www.effectgames.com/demos/canvascycle/) · [Creator’s description](https://experiments.withgoogle.com/canvas-cycle)

Application: author small masks for metal reflections and window light. Our room is a full-colour PNG, so begin with explicitly drawn colour variants in those masks. A global palette shift would affect unrelated materials. Keep the tin hearts anchored while a small reflection changes across their existing metal texture.

### Subtle animation needs deliberate drawing and timing

Pedro Medeiros’s subpixel tutorial discusses the challenge of suggesting extremely small movement on a pixel grid. Aseprite supports individual frame durations, layers, animation tags and onion-skin comparison. [Medeiros’s tutorial](https://www.patreon.com/saint11/posts/1-pixel-movement-7652033) · [Aseprite animation workflow](https://www.aseprite.org/docs/animation/)

Application: change small groups of pixels in successive frames, retain a stable silhouette where appropriate, and hold poses for unequal durations. Start a foliage experiment with four to six drawings and a one-pixel excursion. Those counts are proposed starting values, not rules from the sources. Keep the camera smooth independently of how often a sprite changes its drawing.

### A room is a background plus ordered objects and interaction areas

Adventure Game Studio separates room backgrounds, objects, hotspots and foreground occlusion masks. This provides a useful model for an explorable portfolio. [AGS room editor](https://adventuregamestudio.github.io/ags-manual/EditorRoom.html)

Application: keep physical artwork, interaction targets and content readable as separate concerns. Rebuild the parent surface wherever motion exposes it. Put moving scenery behind the fixed window frame; keep the guide text selectable; let an album animation lead into the existing photo viewer.

### Personal objects carry the narrative

Unpacking developer Tim Dawson explains how objects draw on the team’s own experiences and reveal the protagonist through belongings and their behaviour. His examples include an interactive alarm clock, art supplies and a CRT computer. [Dawson on Unpacking](https://blog.playstation.com/2022/05/06/objects-tell-stories-in-unpacking-arriving-on-ps4-and-ps5-may-10/)

Application: prioritise Sofía’s art, music, photographs, film work and chosen decor. Build little responses around their actual functions. Keep her Mexican identity grounded in her own selections and experiences. Use the existing complete English/Spanish toggle for language.

### Lighting and pixel drawing can be separate systems

Pixpil describes Eastward as detailed pixel artwork combined with modern 3D lighting. That makes it a useful reference for separating the drawn scene from its illumination. [Eastward’s official media page](https://eastwardgame.com/media/)

Application: use local light masks for this fixed room. A TV glow should affect nearby surfaces with different strengths and respect occlusion. The lamp’s existing warm shading already belongs to the approved image; do not cover it with an unrelated full-room brightness pulse.

## First animation studies

These are proposals for this portfolio, rather than behaviour attributed to the reference games.

| Order | Study | Intended result | Preparation |
|---|---|---|---|
| 1 | Tin-heart reflection | A brief shift across a few existing metal highlights when the channel changes; then the exact resting image | Use the cleaned silhouette; author three to five highlight variants inside it |
| 2 | Foliage outside the window | A tiny irregular stir, with a quiet hold before another movement | Isolate a small leaf cluster, complete the background behind it, and keep the window frame fixed above it |
| 3 | Photography album opening | A short cover-opening sequence after a click, leading into the current album | Draw the cover’s pivot, page block and changing shadow in perspective; the table beneath is already prepared |
| 4 | Window event | A distant light comes on, holds, and later goes out | Identify an existing light area or draw a small dedicated overlay behind the window frame |
| 5 | TV and room lighting | Restrained reflected light accompanying the TV state | Paint surface-specific light masks and connect them to playback/channel state |

The record player already provides a continuous motion reference. Keep its approved appearance and music-note treatment. An album opening is an interaction, while foliage and a distant light can become ambient events. Tin hearts should remain solid objects attached to the wall.

## Drawing and playback approach

Retain the 640 × 400 room grid. Each moving object gets a fixed registration point, transparent frame images, per-frame durations and a defined resting frame. Sprite sheets can collect those drawings into one image while retaining individually addressable frames. [Aseprite sprite sheets](https://www.aseprite.org/docs/sprite-sheet/)

Keep drawing coordinates aligned to the source grid and smoothing disabled. Integer display scaling avoids uneven pixel sizes; responsive fitting and camera zoom introduce a tradeoff that needs checking at the actual browser sizes. Preserve the current composition and test both resting views and zoom transitions before changing their scaling. [Godot’s resolution guidance](https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html#stretch-scale-mode) · [Canvas image smoothing](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

Use elapsed time for frame playback, so high-refresh displays do not speed it up. Browser animation callbacks follow display refresh and are commonly paused in hidden tabs. Respect reduced-motion preferences and pause the event scheduler explicitly when the page is hidden. [Browser animation timing](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) · [Reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

The existing contact patches contain both resting shadow and original surrounding texture. They must not travel with an object. Hide that patch during movement, reveal the repaired parent, and draw a new shadow suitable for the frame.

## Ambient-event pacing

Proposed starting behaviour: a long quiet opening, then one short ambient event at a time. Try a variable 30–75 second gap, with a longer repeat cooldown per object. These timings are design hypotheses to tune in the room study.

Delay optional events while someone is moving the camera, reading project information, viewing artwork or using the photography album. Avoid competing with a playing film or song. Tie record motion to confirmed playback. A tab returning from the background should resume quietly, without replaying missed events.

Use a small set of authored events with controlled variation. A breeze may move a leaf; changing TV light may affect metal. Keep cause and effect coherent. Leave furniture, rugs and framed art stable unless an interaction specifically calls for movement.

## Readiness checks before integration

1. Inspect every frame enlarged and at normal room size.
2. Remove the object to verify a complete backdrop and no leftover resting shadow.
3. Check frame registration, foreground overlap and shadows through the entire motion.
4. Return to the exact approved resting pixels, without a seam or final-frame jump.
5. Verify that camera controls, keyboard navigation and object clicks still work.
6. Preview manually triggered events before enabling random scheduling.

Current baseline: 47 registered layers, comprising 43 object/surface layers and four contact patches. The assembled room matches all 256,000 source pixels. Concealed surfaces are rebuilt for the three tin hearts and album; other objects still need preparation where movement exposes their backgrounds.
