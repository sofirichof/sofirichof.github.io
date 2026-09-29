# Room pixel layers

The approved room has **43 object/surface layers and four resting contact patches** on its existing **640 × 400** grid. `assets/room-layers/manifest.json` registers every cutout. Combining all layers reproduces the source grid exactly: 256,000 matching visible pixels. Reconstructed pixels live underneath the approved objects.

Open `room-study.html` to compare the original and assembled room, isolate a layer, or use **Remove object** on a prepared piece. Removal hides both the object and its resting contact patch to reveal the reconstructed surface. The portfolio uses `room-sprites.js` to assemble the same layers. It first displays the original image and retains that fallback if layers fail to load or browser sampling produces a mismatch. The existing television, poster, artwork, mirror portrait, album, controls and camera remain their own interactive surfaces above the room canvas.

## What this pass does—and what remains

This is a separation of the approved visible pixels, **not a new hand-drawn illustration**. It is the foundation for the larger reconstruction. Several object boundaries are initial grouped silhouettes; leaf gaps, textile fringes and other fine outlines need refinement before those pieces move.

The three tin hearts have tighter silhouettes traced by pixel row, with plaster reconstructed into `plaster-wall.png` behind each heart and its shadow. The album has a refined silhouette and wood grain reconstructed into `coffee-table.png`, extending through its cast shadow. These repairs use nearby native texture and lighting on the same grid. They are interpretations of concealed surfaces, not recovered original pixels.

Each prepared object has a separate `*-contact.png` registered before it. This patch contains the original resting shadow **and surrounding surface texture**, rather than a reusable shadow alpha. It preserves the parked composition exactly. When removing or moving the object, hide its contact patch too; a new shadow appropriate to its position must be authored for motion. `underpainting.parent` and `underpainting.companions` record these relationships.

Other concealed surfaces are still transparent and unpainted. Other outlines include initial masks that need refinement, especially plants and overlapping furniture. The Remove object control is disabled for those layers. No layer is declared motion-ready yet: clean undersides, newly revealed object sides, moving shadows, and animation frames remain separate work.

The overhead record player already has its separate animation system. The small record player in the wide room is separated into its plinth, lid, and disc/arm assembly; it has not yet inherited the overhead animation.

## Edit and rebuild

- Edit individual files in `assets/room-layers/` with a one-pixel pencil. Preserve dimensions and registration.
- `room-grid.png` freezes the exact original 640 × 400 canvas exported through the study’s download link. Keeping this grid avoids resampling differences between the browser and offline image tools.
- `trace-room.py` contains the initial source polygons. `room-mask-refinements.json` overrides them with tighter polygons or pixel-row spans. It writes `room-regions.json` as a record of those masks, plus the PNGs and manifest.
- `room_underpainting.py` reconstructs the four prepared backdrops and separates their contact patches. It uses Pillow and NumPy; these are build-time tools, not website dependencies.
- Run `python3 pixel-source/trace-room.py` to rebuild. This overwrites manual edits to extracted PNGs. Back up any painted layers first.
- The extractor asserts a complete, byte-for-byte match before saving the manifest.
- `room-sprites.js` also compares the assembled pixels against the original in the browser. Its canvas reports `data-pixel-differences` and `data-renderer` for inspection.
- The original `assets/room-master.png` stays unchanged.

## Ambient-event direction

Current study revision: six exterior leaf clusters now stir with staggered timings across three parts of the window, over 13 registered frames / 3.26 seconds. Each moves at most one source pixel. The first and final frames match the approved room exactly; the house, window frame and six joining stems stay fixed. The original two-tip trial is superseded by these wider masks and poses.

Fourteen optional Smiski drawings are stored separately in `assets/room-guests/smiskis.json`: a palette, editable pixel rows, quantized surface normals, placements, lighting profiles and foreground-occlusion references. Rebuild them with `draw-smiski-sprites.py`. The initial sitting, peeking and lounging poses reference the official Series 1 page listed in the JSON. Sofía's supplied At Work, Hippers and Yoga sheets guide Researching, Presenting, Sleeping, Looking Out, Upside Down, Lotus and Ship. The bowl dweller and chair sitter are original poses requested for this room.

Hipper depth is intentional: the TV case masks Sleeping and Looking Out below its top edge; Upside Down reveals only the head/hands below the shelf. The bowl has a traced front-rim region that masks the body; two hand patches render in front of the rim. These masks affect the visitor overlay only. No underlying room image is repainted.

Room lighting uses the rounded pixel surfaces' stored normals, two art-directed sources (paper lantern at 521,136; night-window fill at 594,84), and per-placement source visibility/ambient/contact shade. Body highlights follow the source direction instead of retaining the old upper-left painted highlight. Bookcase guests are darker; the bowl shades the lower body; the chair has warm upper-left light and cool fill on its right. This is a controlled illustration model, not a reconstruction of the room's physical geometry. **Match room lighting** compares it with the original flat palette. **Show light map** draws source markers and rays to the selected guest on another transparent canvas. It is hidden during original/layer inspection. The main portfolio does not load these study controls.

`room-guests.js`, shared by the live site and `room-guests-study.js`, draws figures, contact shadows and glow on `#room-guests`, a transparent sibling of the original room canvas. Hide clears the overlay completely. Use a `guest` query parameter for a placement: `room-study.html?v=smiski-room-light-4&guest=ship`.

Manual placement inspection is available immediately. Optional random visits start after 5–9 seconds, last 11–16 seconds, then leave 22–40 seconds of quiet. Automatic visits choose a different location from the last visitor, regardless of the manual placement picker. Only one visitor is visible at a time. Layer inspection and hidden tabs clear/cancel visitors; returning schedules a fresh wait. Reduced motion uses immediate manual drawings and disables random visits. These are the study controls; the main site uses the shared drawing engine with the event director below.

The window breeze study adds local repairs for six leaf clusters in `outside-night`, without modifying the extracted source layer or marking the entire night view removable. `draw-window-breeze.py` writes the traced tip poses, reconstructed sky and 13 registered full-size layer frames. The 3.26-second sequence keeps the stems fixed, bends the tips by one pixel and restores the exact source. The study's **Show sky beneath leaves** button exposes this repair. The animation selector also retains the approved tin-heart reflection. Optional repetition has 12–20 seconds of stillness and is cancelled on a view change, manual inspection, return to still or tab hiding. The main portfolio schedules the same frames through the shared event director.

The first manual reflection is available in `room-study.html?v=heart-reflection-1`: Replay reflection, Slow preview and the frame slider show nine registered drawings over 1.8 seconds. Only the large heart's interior highlights change. The shared renderer supports opt-in frame replacement; `room-reflection-study.js` provides the manual preview; `room-events.js` schedules the same frames on the portfolio. Run `python3 pixel-source/draw-heart-reflection.py` to rebuild the sprite sheet from the explicitly selected ridges and existing heart palette. The first and last frames restore the source byte for byte.

See `ANIMATION-RESEARCH.md` for the primary-source research, proposed animation studies, and playback approach. The first proposed study is a small tin-heart reflection, followed by exterior foliage and the album opening.

## Live random events

`room-events.js` runs on the main portfolio. It chooses a visible Smiski placement, a window breeze or a tin-heart glint. A shuffled event pool gives visitors two slots and each room animation one slot; it avoids an adjacent repeat when another kind is available. Visitor placements use their own shuffled pool, exclude the art-only painter, and must be at least 75% inside the current viewport. There is one ambient event at a time, with no animation loop during the quiet gap.

The initial wait is 4–8 seconds; later gaps are 14–30 seconds. A visitor stays 11–16 seconds. Its movement has an 86% chance and glow a separate 68% chance. Each start is drawn independently within that visit, leaving room for its full duration and a quiet exit. Neither clock waits for the other: movement can precede glow, glow can precede movement, they can overlap, and either or both can be skipped. Glow independently varies brightness (5–8), duration (3.8–6.6 seconds), rise (24–36%) and hold (8–18%). Eyes, props and shadows retain their room-lit colors.

The remote's **Room life** switch saves its on/off preference locally. Events clear when a film, artwork, album, guide, dialog or remote is opened, or the document is hidden. Returning starts a fresh wait. Page restoration cannot replay stale events. Reduced motion disables automatic room events. This does not change audio permission or playback. Failed optional assets leave the remaining event types available.

Visitor art, halos, Zs and thought bubbles occupy a transparent overlay; the shared renderer never writes the room canvas. Breeze and heart frames temporarily replace only their registered layer and restore it on completion or cancellation. The original image and 47 base-layer files remain unchanged. New room events still need their own masks, hidden-surface repairs and approved frame studies before joining this system.

In the study, the two effect timers also use independent draws: first starts range from 0.6–6 seconds, later waits from 14–34 seconds. Automatic visits independently sample the movement and glow chances above; a manually placed figure can try again later. A late glow is shortened or skipped before departure. Reduced motion retains a steady manually requested glow.

## Smiski movement study

`draw-smiski-sprites.py` now redraws each pose through a parameterized builder. It exports `smiski-motions.json` with sparse pixel/material/normal patches and timed frame sequences. The pixels behind moved heads, hands and feet come from a complete redraw in the original layer order, not from stretching or translating a flattened cutout. The original twelve resting pixel arrays and their normal maps are unchanged.

All fourteen gestures begin and end with the unmodified base pose. The bowl guest moves behind the existing front-rim mask while its two hand patches remain in front. Presenting's feet and clipboard stay anchored while the pointer and head move. Shelf/TV occlusion and room lighting apply to every moving frame. Most motions use 1–2 source-pixel changes; the bowl crouch travels farther to hide inside the bowl. Gestures last 1.78–4.25 seconds at their ordinary speed.

The movement timer is independent of the glow timer: each first start is independently drawn from 0.6–6 seconds, then 14–34 seconds of quiet. Manual slow preview runs at 2.5 times the duration; automatic movement uses normal speed. A short random visit can be extended for a manually requested preview. Scrubbing pins the current visitor, stops automatic visits/movement and pauses glow so the chosen frame can be inspected. Replay resumes the gesture. Reduced motion disables autoplay and movement playback but retains still-frame inspection and a steady manual glow.

Animation/brightness combinations are composed on the transparent guest canvas only. Full-room composites are capped at sixteen cached frames, and small sprite drawings at 180 entries. Hide, layer inspection, a visibility change or a reduced-motion change cancels all animation callbacks and visit/effect timers. The room's base canvas is never written by the visitor renderer.

Preview: `room-study.html?v=smiski-motion-1&guest=bowl&move=1`.

Lounging and the sleeping Hipper have three staggered pixel Z glyphs. Their integer positions and opacity are stored on gesture frames, so replay, frame inspection, stop, hide, reduced motion and tab changes share the same lifecycle as the figure. The full overlay cache includes the timeline frame even when the body pose repeats. No room pixels are altered. Preview: `room-study.html?v=smiski-zzz-1&guest=album&move=1` (or `guest=sleeping`).

The Ship gesture changes only its two eyelid pixels. The `mirror-sitter` is authored at 11 × 19 native pixels and sits at 448,60 over the reflected door lintel. Dim room lighting, 82% opacity, weaker self-emission and the mirror-glass mask keep it inside the reflection.

The Museum painter replaces the earlier floating Dalí concept. `draw_painter` authors the moustache, brush, palette and a short brush greeting at 30 × 42 pixels. The study provides this editable pose in Art wall; older `guest=dali` URLs now select `painter`. **Look around** previews Whole room, Art wall and Mirror. Changing areas clears/cancels visitors, and the separate study-art canvas supplies the portfolio artwork for the Art wall preview only.

The main portfolio loads the small, baked room-lit `art-painter.json` clip through `art-guest.js`. Opening an individual artwork anchors the painter beside that frame and includes it in the camera bounds. One stepped entrance and brush greeting finish in the resting pose; next/previous artworks restart it beside the new selection. Leaving art, hiding the tab or changing to reduced motion cancels playback. Async loads are guarded against showing a visitor after navigation. The canvas has no pointer or keyboard interaction; it cannot cover artwork controls. Other visitors use the separate room event director; the painter remains tied to artwork opening. All room source pixels remain unchanged.

Researching now pauses its typing for a pixel thought cloud and a dotted trail. The ellipsis fills one dot at a time, the cloud fades, and typing resumes. `thoughtGlyph` holds the editable cloud pixel rows and palette; `thoughtBubble` lives on the gesture timeline, so stop/hide/view changes and reduced motion use the existing lifecycle. The original figure pixels remain unchanged. Preview: `room-study.html?v=smiski-thought-1&guest=researching&move=1`.
