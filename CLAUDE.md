# CLAUDE.md

## Project Overview

This is Sofia González Irigoyen’s personal portfolio website. It is a static HTML/CSS/JavaScript site with a Netflix-inspired interface. Visitors choose a profile and browse different versions of Sofia’s work depending on the audience.

The site should stay lightweight. Do not add a framework, build system, backend, or dependencies unless specifically requested.

## Main Files

- `index.html` — landing page with tap-to-start intro video and profile selection.
- `recruiter.html` — production / recruiter-facing portfolio page.
- `agency.html` — advertising / agency-facing portfolio page.
- `director.html` — film / collaborator-facing portfolio page.
- `stalker.html` — hidden / playful / personal-style page.

## Design Identity

Preserve the Netflix-inspired style:

- dark background
- red accent color
- cinematic hero sections
- large media-driven cards
- horizontal scrolling rows
- profile-selection structure
- Bebas Neue-style headings
- DM Sans-style body text
- polished but slightly playful tone

The site should feel like a portfolio disguised as a streaming platform.

## Asset Rules

Do not rename existing files unless specifically asked.

Do not change existing media filenames unless specifically asked.

Do not move media into new folders unless specifically asked.

Do not invent new asset names unless those assets actually exist in the repo or placeholders are explicitly requested.

Important intro assets:

```text
media/intro.mp4
media/vertical-intro.mp4
```

`media/intro.mp4` is the desktop intro video.

`media/vertical-intro.mp4` is the only approved vertical-specific asset and may be used only for the intro video behavior on `index.html`, likely for portrait/mobile screens.

Do not create a full vertical/mobile version unless specifically asked.

## Editing Rules

Prefer small, targeted edits over large rewrites.

Keep edits inside the existing HTML files unless separate CSS/JS files are specifically requested.

Preserve existing IDs, classes, and JavaScript hooks unless there is a clear reason to change them.

Before removing any class or ID, check whether JavaScript uses it.

Do not delete sections unless specifically asked.

Do not simplify the design so much that it loses the Netflix/streaming-platform concept.

## JavaScript Rules

Be careful with:

- tap-to-start intro behavior
- video playback
- profile navigation
- carousel/row scrolling
- modals
- hover previews
- buttons
- event listeners

When changing JavaScript, make the smallest possible edit that solves the issue.

## Content Tone

- `recruiter.html`: professional, capable, production-focused
- `agency.html`: strategic, creative, campaign-focused
- `director.html`: cinematic, collaborative, artistic
- `stalker.html`: playful, self-aware, slightly funny
- `index.html`: clean, minimal, profile-selection experience

Do not make every page sound the same.

## Preferred GitHub Workflow

1. Create a new branch.
2. Make the requested changes.
3. Keep filenames and asset paths stable.
4. Check for obvious HTML/CSS/JS syntax issues.
5. Summarize exactly what changed.
6. Open a pull request for review.

Do not commit directly to `main` unless explicitly told to.

## After Making Changes

Always summarize:

- which files changed
- what changed visually or functionally
- whether desktop behavior was preserved
- whether any mobile behavior changed
- any assumptions made

## Do Not Do

Do not convert the project to React, Next.js, Tailwind, Vue, Astro, or another framework unless specifically asked.

Do not redesign the whole site unless specifically asked.

Do not create full vertical versions unless specifically asked.

Do not rename files or assets unless specifically asked.

Do not delete sections without asking.

Do not invent missing media files.

Do not commit secrets, API keys, tokens, or credentials.

Do not overwrite working code with a total rewrite unless explicitly requested.

## Current Context

A full vertical/mobile redesign was attempted but removed because it was too difficult to maintain.

The only remaining vertical-related feature is the use of `media/vertical-intro.mp4` for the intro video behavior on `index.html`.

Future edits should preserve the current working site and avoid reintroducing a full vertical version unless explicitly requested.
