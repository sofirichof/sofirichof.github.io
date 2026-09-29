# CLAUDE.md

## Project overview

Sofía González Irigoyen's personal portfolio, published by GitHub Pages from `main` at https://sofirichof.github.io/.

The live site is **Noche y Media — the television room**: a static HTML/CSS/JS pixel-art living room where the TV plays the work, the wall poster is the programme guide, the mirror is About, and the record player links to music. No framework, build step, backend or dependencies. Read `README.md` for how every room object behaves and which file owns it, and `DESIGN-NOTES.md` for identity and language decisions.

## Layout

- Root: the Noche y Media site (`index.html`, `app.js`, `content.js`, `i18n.js`, `style.css`, `assets/`, studies and notes).
- `archive/netflix/`: the previous Netflix-style portfolio (2025–2026), kept browsable as an older version at https://sofirichof.github.io/archive/netflix/. Its project pages, thumbnails and media are still referenced by `content.js`; do not delete or rename anything in it. The git tag `netflix-v1` marks the last commit where it was the live site.
- `agency.html`, `recruiter.html`, `director.html`, `stalker.html` at root are redirect stubs to the archive, so old shared links keep working.
- `sig/`: email-signature assets (Supergood badge GIF, icons) referenced from Sofía's real email signature. Never move or rename.
- `resume.pdf`: linked from outside the site. Keep at root.

## Rules

- Do not apply the archived Netflix visual language (dark background, red accent, Bebas Neue) to the new site.
- Never present generated or borrowed imagery as Sofía's films or artwork. `assets/art/` and `assets/photography/` are her real files; `assets/room-master.png` is the generated room illustration.
- Keep `content.js` and `i18n.js` in sync when adding a project. Proper names, film and campaign titles keep their original wording.
- Never merge to `main` yourself: open a pull request and stop.
