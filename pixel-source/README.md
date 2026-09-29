# Editable turntable pixels

The close-up now renders seven transparent PNG layers on a 640 × 400 grid. They trace the approved close-up rather than reinterpreting its design. The main room master remains untouched. This is the first object in a planned gradual conversion of the room.

Open `animation-study.html` through the same local server to preview rotation, move the needle and toggle each layer. This authoring view is silent and separate from the visitor interface.

## Edit a layer

1. Open a PNG from `assets/turntable/` in a pixel editor. Keep its dimensions and transparency.
2. Use a one-pixel pencil and nearest-neighbor scaling. Save the same filename.
3. Refresh the animation study. The renderer reads the PNG directly; no build step is needed.

`assets/turntable/manifest.json` defines the drawing order, layer positions, record aspect ratio, rotation centers and arm resting angle. The full composition is 640 × 400; cropped layers retain their coordinates through this manifest.

- `surroundings`: console, television edge, wall and room edges.
- `plinth-and-deck`: wooden body, bearing, controls and a reconstructed empty deck; no duplicate disc is painted into this layer.
- `dust-cover`: lid and its lighting.
- `record`: grooves and label, rotating about the spindle.
- `fixed-reflections`: stationary highlights, drawn with additive blending. They hide automatically when the record layer is hidden. Rim detail stays in the moving record layer.
- `spindle`: stationary center pin.
- `tonearm`: shaft and cartridge, rotating around the bearing. Its outline excludes the record rim and reflection that crossed behind it in the source image. The moving silhouette is separate from the original occlusion mask used to reconstruct the disc.

The empty deck and grooves hidden beneath the original arm are reconstructed pixels. `deck_surface.py` limits the deck repair to the inset plate, retaining the source walnut frame, controls and surrounding surface. It uses the source deck’s own grain and sampled lighting; no flat rectangular fill extends over the frame. The concealed disc sector borrows individual pixels from the unobstructed opposite side of the same record, which carries the matching gold reflection. This preserves the existing groove texture instead of averaging it into a smooth patch. Only the repair boundary is feathered. The original cast shadow is removed from the exposed surface. The lid and lighting have separate layers but stay still in this version.

`turntable-sprites.js` provides the renderer and animation. It draws at 15 fps with pixel sampling, turns the record at approximately 33⅓ rpm, eases the arm toward the groove, follows playback progress, and returns the arm when stopped. Reduced motion keeps the artwork still. Hidden or closed views stop drawing. Small cream and blue pixel notes rise from the record while it turns; existing notes fade out on pause and clear when the view closes. The note shapes are editable pixel patterns at the top of `turntable-sprites.js`. Reduced motion omits the notes.

## Rebuild the trace

`trace-turntable.py` records the extraction masks and reconstruction process. It requires Python 3 and Pillow:

```sh
python3 pixel-source/trace-turntable.py
```

Running it overwrites the PNG layers and manifest, including hand edits made to those PNGs. Copy edited layers before regenerating. The reference image `assets/vinyl-closeup-clean.png` is never modified by the script.

## Music integration and validation

The portfolio listens for SoundCloud Widget and Spotify iFrame API playback events. Selecting a title does not itself start the animation: it follows a provider play event. Returning to the room or switching collections removes the old player and stops the animation. Provider links remain available if an embed cannot load.

Verified in the local preview: seven layers load, play/stop motion, needle travel, layer toggles, opening/closing, focus restoration, collection switching and ES/EN updates. External SoundCloud and Spotify frames remained blank in the preview browser, including on a plain page without the portfolio. Their documents stayed `about:blank`; actual streaming and event synchronization could not be verified here. The silent study verifies the animation independently. Test real playback in a normal browser before publishing.
