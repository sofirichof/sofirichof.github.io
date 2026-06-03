/* translations.js — sgI18n
   Sofia González Irigoyen portfolio · en / es
   ─────────────────────────────────────────── */
(function () {
  'use strict';

  var T = {

    en: {
      /* ── Nav ──────────────────────────────── */
      'nav.work':          'Work',
      'nav.about':         'About',
      'nav.skills':        'Skills',
      'nav.contact':       'Contact',
      'nav.switch':        'Switch Profile',
      'nav.lang.label':    'Language',

      /* ── Buttons ──────────────────────────── */
      'btn.viewWork':      'View Work',
      'btn.watchSegment':  'Watch Segment',
      'btn.watchEpisode':  'Watch Episode',
      'btn.watchFilm':     'Watch Film',
      'btn.viewProject':   'View Project',
      'btn.watch':         '▶ Watch',
      'btn.play':          '▶ Play',
      'btn.moreInfo':      'More Info',
      'btn.contactMe':     'Contact Me',
      'btn.resume':        '↓ Download Resume',
      'btn.backToTop':     'Back to Top',
      'btn.sendScript':    'Send Me Your Script →',
      'btn.viewCredits':   '▾ View Credits',

      /* ── Footer ───────────────────────────── */
      'footer.copy':       '© 2026 Sofia González Irigoyen · Boston, MA',

      /* ── Hover card ───────────────────────── */
      'hover.playable':    'Playable',
      'hover.details':     'Details',

      /* ── Aria ─────────────────────────────── */
      'aria.intro':        'Intro',
      'aria.featured':     'Featured project',
      'aria.scrollLeft':   'Scroll left',
      'aria.scrollRight':  'Scroll right',
      'aria.closeVideo':   'Close video',

      /* ── Index ────────────────────────────── */
      'idx.tapLogo':       "Sofia's Portfolio",
      'idx.tapHint':       'Tap anywhere to start',
      'idx.heading':       "WHO'S WATCHING?",
      'idx.sub':           "Choose the version of Sofia's work you want to browse",
      'idx.production':    'Production',
      'idx.advertising':   'Advertising',
      'idx.collaborators': 'Collaborators',
      'idx.found':         'you found me',

      /* ── Recruiter — hero ─────────────────── */
      'rec.kicker':        'PRODUCTION PROFILE',
      'rec.badge.tv':      'TV & FILM',
      'rec.badge.film':    'Film & Narrative Profile',
      'rec.intro.b.desc':  'Broadcast producer with experience at Telemundo 52 / NBCUniversal, Zona Latina in Santiago, and BU\'s live television program. Comfortable in fast-moving, live environments.',
      'rec.intro.f.desc':  'Narrative producer with SAG-AFTRA shorts, three seasons of scripted TV drama, and documentary work. I build shoots that run on time and sets where people actually want to be.',
      'rec.toggle.b':      'Broadcast & TV',
      'rec.toggle.f':      'Film & Narrative',

      /* ── Recruiter — rows ─────────────────── */
      'rec.row.live':      'Live Television',
      'rec.row.tv':        'TV Drama',
      'rec.row.intl':      'International & Bilingual Production',
      'rec.row.narrative': 'Narrative & Drama',
      'rec.row.doc':       'Documentary',
      'rec.row.comedy':    'Comedy',
      'rec.row.other':     'Music Video & Other',

      /* ── Recruiter — about ────────────────── */
      'rec.about.h':       'About Sofia',
      'rec.about.p1':      "I'm a film and television producer finishing a BS in Film & Television Production at Boston University, with a second major in Advertising and an August 2026 graduation date. I've produced SAG-AFTRA short films, worked as a segment producer at Telemundo 52, gone on set in Santiago for a live variety show, and produced three seasons of Bay State TV Drama.",
      'rec.about.p2':      "Skilled in studio, live-shot, and on-location production with hands-on experience in broadcast, SAG-AFTRA projects, multi-camera formats, and large-scale crews. Seeking associate producer, coordinator, and assistant roles in broadcast, network, or production companies.",

      /* ── Recruiter — highlights ───────────── */
      'rec.hl1.org':   'NATAS · 2024',
      'rec.hl1.title': 'University Sports Program Award',
      'rec.hl1.desc':  'Chief Editor, Live With TY Season 1',
      'rec.hl2.org':   'IFFBoston · 2026',
      'rec.hl2.title': 'Student Film Showcase',
      'rec.hl2.desc':  'Film selected for screening at Somerville Theater',
      'rec.hl3.org':   'Redstone Film Festival · 2026',
      'rec.hl3.title': 'Best Picture',
      'rec.hl3.desc':  'BU Department of Film and Television student film festival',
      'rec.hl4.org':   'AdLab · Spring 2026',
      'rec.hl4.title': 'Video Producer · Above & Beyond Award',
      'rec.hl4.desc':  "Country's largest student-run advertising agency",

      /* ── Recruiter — skills ───────────────── */
      'rec.skills.h':       'Production Toolkit',
      'rec.skills.intro':   'A practical view of the tools, workflows, and on-set muscles behind the work above.',
      'rec.sp1.title':      'Producing & Coordination',
      'rec.sp1.text':       'Budget-aware production management, scheduling, talent coordination, and set communication across scripted, live, and documentary workflows.',
      'rec.sp2.title':      'Broadcast & Live TV',
      'rec.sp2.text':       'Comfortable in fast-moving live and live-on-tape environments, from guest coordination to control-room timing and segment support.',
      'rec.sp3.title':      'Post & Creative Tools',
      'rec.sp3.text':       'Editing, finishing, graphics, and visual development tools used across shorts, broadcast packages, social deliverables, and portfolio media.',
      'rec.sp4.title':      'Communication & Digital',
      'rec.sp4.text':       'Bilingual production communication, platform publishing, client feedback loops, and digital asset management for media teams.',
      'rec.tool1.type':     'Editing / color / finishing',
      'rec.tool2.type':     'Scheduling & budgeting',
      'rec.tool3.type':     'Broadcast workflows',
      'rec.tool4.type':     'Premiere, AE, Photoshop',

      /* ── Recruiter — contact ──────────────── */
      'rec.contact.h':      'Contact',
      'rec.contact.p1':     "I'm graduating in August 2026 and looking for my first full-time role in broadcast, network, or production. If your team needs a bilingual producer who can move between story, set, edit, and live environments, I'd love to talk.",
      'rec.contact.email':  'Email',
      'rec.contact.li':     'LinkedIn',

      /* ── Agency — hero ────────────────────── */
      'ag.kicker':          'ADVERTISING PROFILE',
      'ag.intro.desc':      'Producer and advertising student working across branded content, social video, and campaign production. I bring a production eye to the creative process and a creative instinct to set.',
      'ag.meta.tag1':       'AdLab · BU',
      'ag.meta.tag2':       'Branded Content',
      'ag.meta.tag3':       'Social Video',

      /* ── Agency — rows ────────────────────── */
      'ag.row.shortform':   'Short-Form Content',
      'ag.row.spec':        'Spec Campaigns',
      'ag.row.ai':          'AI-Generated Motion',
      'ag.row.spec.note':   'Solo and mock campaign work',
      'ag.row.ai.note':     'Spec social motion ads exploring product atmosphere, brand mood, and AI-assisted visual world-building.',

      /* ── Agency — toolkit ─────────────────── */
      'ag.toolkit.h':       'Agency Toolkit',
      'ag.tp1.title':       'Concept Development',
      'ag.tp1.text':        "Turning a single idea into a campaign platform, slogan, social execution, and video concept that can survive client feedback.",
      'ag.tp2.title':       'Production',
      'ag.tp2.text':        "Coordinating shoots, talent, locations, feedback, edit needs, and delivery specs for platform-specific assets.",
      'ag.tp3.title':       'Post & Delivery',
      'ag.tp3.text':        "Editing short-form deliverables for TikTok, Instagram, Facebook, and cable contexts with clear pacing and clean final exports.",

      /* ── Agency — about ───────────────────── */
      'ag.about.h':         'About Sofia',
      'ag.about.p1':        "Producer and advertising student at Boston University working across production, campaign thinking, and social-first storytelling. I'm interested in ideas that are clear enough to travel, visual enough to remember, and practical enough to produce well.",
      'ag.about.p2':        "My production background shapes how I think creatively. I don't just ask whether an idea is interesting — I think about how it will be shot, edited, delivered, and experienced across platforms. That makes me useful in the space between concept and execution.",
      'ag.focus.title':     'Advertising Focus',
      'ag.focus.text':      "Social-first campaign concepts, short-form video production, client-facing creative, and spec work with a clear single idea.",

      /* ── Agency — contact ─────────────────── */
      'ag.contact.h':       'Contact',
      'ag.contact.p1':      "I'm graduating in August 2026 and looking for agency production roles — PA, junior producer, or content producer. If your team needs someone who can take a creative idea from brief to camera to delivery, I'd love to talk.",

      /* ── Director — hero ──────────────────── */
      'dir.kicker':         'Collaborators · Freelance Producer',
      'dir.tagline':        '"The person you call when you need a guy."',
      'dir.meta.avail':     'Available Now',
      'dir.actions.script': '✉ Send Me Your Script',
      'dir.actions.credits':'▾ View Credits',

      /* ── Director — rows ──────────────────── */
      'dir.row.dev':        'In Development',
      'dir.row.dev.note':   'Current projects',
      'dir.row.prod':       'Produced',
      'dir.row.prod.note':  'Producer credits',
      'dir.row.onset':      'On Set',
      'dir.row.onset.note': 'AD, script supervision & department credits',

      /* ── Director — dev badge labels ─────── */
      'dir.badge.production':  'Now in Production',
      'dir.badge.development': 'In Development',

      /* ── Director — script section ────────── */
      'dir.script.eyebrow': '▶  Open to Projects',
      'dir.script.title':   'WORKING ON\nSOMETHING?',
      'dir.script.copy':    "Send me your script. Whether you're in development, pre-production, or still figuring out what it is — I want to hear about it. I work best with people who take the craft seriously and need someone who will too.",
      'dir.script.btn':     'Send Me Your Script →',

      /* ── Director — about ─────────────────── */
      'dir.about.h':        'About Sofia',
      'dir.about.p1':       "I'm a film and television producer finishing a BS in Film & Television Production at Boston University, graduating August 2026. I've produced SAG-AFTRA shorts, three seasons of scripted TV drama, and have been on set in roles from 1st AD to script supervisor to executive production assistant on a documentary.",
      'dir.about.p2':       "Skilled in studio, live-shot, and on-location production. I'm drawn to projects with something real to say and collaborators who care about every detail. If you're a director, screenwriter, or DP looking for a producer who will prep obsessively, protect your vision, and keep the set moving — reach out.",

      /* ── Director — highlights ────────────── */
      'dir.hl1.org':        'IFFBoston · 2026',
      'dir.hl1.title':      'Student Film Showcase',
      'dir.hl1.desc':       'Si Solamente selected for screening at Somerville Theater',
      'dir.hl2.org':        'Redstone Film Festival · 2026',
      'dir.hl2.title':      'Best Picture',
      'dir.hl2.desc':       'BU Department of Film & Television student film festival',
      'dir.hl3.org':        'NATAS · 2024',
      'dir.hl3.title':      'University Sports Program Award',
      'dir.hl3.desc':       'Chief Editor, Live With TY Season 1',
      'dir.hl4.org':        'AdLab · Spring 2026',
      'dir.hl4.title':      'Above & Beyond Award',
      'dir.hl4.desc':       "Country's largest student-run advertising agency",

      /* ── Director — contact ───────────────── */
      'dir.contact.h':      'Contact',
      'dir.contact.p1':     "Graduating August 2026 and available for freelance producing work now. If you're working on something — a short, a feature, a doc, anything narrative — send it over. I'm serious about the work and easy to be around.",

      /* ── Stalker ──────────────────────────── */
      'stk.kicker':         'You found the secret page.',
      'stk.heading':        'OFFICIALLY A FAN.',
      'stk.tagline':        "You went looking. You found me. That tracks.",
      'stk.desc':           "This isn't the professional version. This is the real one.",
      'stk.nav.home':       'Home',
      'stk.nav.vibes':      'Vibes',
      'stk.nav.bts':        'BTS',
      'stk.nav.exit':       'Exit',
      'stk.stats.h':        'The Numbers',
      'stk.shorts.h':       'Short-Form Content',
      'stk.bts.h':          'Behind the Scenes',

      /* ── Deep Cut modals (index.html) ─────── */
      'dc.eyebrow':         '⏸  Are you still watching?',
      'dc.title':           'Are you still\nwatching?',
      'dc.body':            "You've made it past the portfolio layer. There's a less official cut if you want it.",
      'dc.stay':            'Stay Professional',
      'dc.unlock':          'Show Me the Deep Cut',
      'dc.hint.eyebrow':    '🔒  Profile Locked',
      'dc.hint.title':      'Not Yet',
      'dc.hint.body':       'Some profiles only appear if you stay long enough.',
      'dc.hint.ok':         'Got it',

      /* ── Hover card project summaries ─────── */
      'hs.Acceso Total - Hollywood Premiere':        'Field interview and entertainment coverage from the Telemundo 52 / NBCUniversal internship.',
      'hs.Acceso Total - Independence Days':         'Spanish-language cultural segment produced for Acceso Total during the Telemundo internship.',
      'hs.Live With TY':                             'NATAS-recognized university sports episode shaped through chief editing and broadcast pacing.',
      'hs.Zona de Estrellas':                        'Live variety television experience from an international production placement in Santiago, Chile.',
      'hs.Sabores':                                  'Lifestyle television production support from the Zona Latina / TVI America placement.',
      'hs.Bay State - Seasons 48-50':                'Multi-season scripted TV producing in a live-on-tape, three-camera studio workflow.',
      'hs.Si Solamente':                             'SAG-AFTRA micro-budget short with a 5-day, 8-location production footprint.',
      'hs.The Stories We Tell Ourselves':            'Independent narrative short built around production planning, budget control, and set coordination.',
      'hs.Pajuyuk Ancestral Knowledge':              'Documentary production support requiring care, organization, and cultural sensitivity.',
      'hs.Bird\'s Eye View':                         'Short drama where producing and editing connected the set workflow to the final story.',
      'hs.Alike Loves':                              'Solo rom-com short about two people getting ready for a date and the small expectations behind something that seems simple.',
      'hs.Lucky Streak':                             'Narrative documentary looking at a self-proclaimed chronically unlucky man who says he has never lost at poker.',
      'hs.Till Death Do Us Part':                    'Comedy short about a couple who land on an afterlife game show after an unfortunate car accident.',
      'hs.Cine Final':                               'Intro to Cinematography final replicating a scene from Amelie through reimagined performance, direction, and DP work.',
      'hs.The In Between':                           'Music video assistant directing with fast turnaround, schedule discipline, and set momentum.',
      'hs.By Design':                                'First assistant directing credit focused on daily shooting schedules, set workflow, and keeping cast and crew moving on task.',
      'hs.El Futuro para Mama y Yo':                 'First assistant directing credit with Spanish-language production coordination, scheduling, and on-set communication.',
      'hs.Vestido para Mama':                        'Script supervision credit tracking continuity, script notes, and production details across the shoot.',
      'hs.Growing Pains':                            'Script supervision credit supporting continuity, scene tracking, and clear communication between departments.',
      'hs.Chameleon':                                'Script supervision credit focused on continuity, script tracking, and production organization.',
      'hs.Aftershock':                               'Second assistant camera credit supporting camera department workflow and on-set technical coordination.',

      /* ══ PROJECT DETAIL PAGES — shared chrome (EN) ══ */
      'proj.nav.logo':"Sofia's Portfolio",'proj.nav.production':"Production",'proj.nav.overview':"Overview",'proj.nav.media':"Media",'proj.nav.gallery':"Gallery",'proj.nav.back.prod':"← Back to Production",
      'proj.card.snapshot':"Project Snapshot",'proj.card.internship':"Internship Snapshot",
      'proj.card.label.role':"Role",'proj.card.label.org':"Organization",'proj.card.label.format':"Format",'proj.card.label.focus':"Focus",'proj.card.label.output':"Output",
      'proj.sec.overview':"Project Overview",'proj.sec.whatidid':"What I Did",'proj.sec.details':"Project Details",'proj.sec.scope':"Production Scope",'proj.sec.press':"Press & Recognition",'proj.sec.bts':"Behind the Scenes",'proj.sec.stills':"Film Stills",'proj.sec.gallery':"Trailer & Press Kit",'proj.sec.media':"Selected Media",'proj.sec.dual':"Dual Role",'proj.sec.intro':"Show Intro",'proj.sec.why':"Why This Project Matters",'proj.sec.whyexp':"Why This Experience Matters",'proj.sec.selected':"Selected Work From This Experience",'proj.sec.shortseg':"Hot Takes with Ty — Short Form Segments",'proj.sec.pressmat':"Si Solamente Press Materials",
      'proj.detail.category':"Category",'proj.detail.year':"Year",'proj.detail.years':"Years",'proj.detail.context':"Context",'proj.detail.strengths':"Primary Strengths",'proj.detail.scale':"Production Scale",'proj.detail.team':"Team",
      'proj.cta.browse':"Continue browsing",'proj.cta.explore':"Keep exploring",'proj.cta.text.prod':"Return to the production page to view more broadcast, narrative, and television production work.",'proj.cta.text.rest':"Return to the production page to view the rest of the portfolio.",'proj.cta.btn':"Back to Production",'proj.footer':"© 2026 Sofia González Irigoyen · Project Detail Page",'proj.btn.back':"← Back to Production",
      'proj.btn.watch':"▶ Watch",'proj.btn.watchseg':"▶ Watch Segment",'proj.btn.watchep':"▶ Watch Ep. 11",'proj.btn.watchintro':"Watch Intro",'proj.btn.watchtrailer':"▶ Watch Trailer",'proj.btn.watchfeatured':"▶ Watch Featured Segment",'proj.btn.details':"Project Details",'proj.btn.presskit':"Press Kit Media",
      'proj.press.read':"Read Article ↗",'proj.press.imdb':"View IMDb ↗",'proj.press.reel':"Watch Reel ↗",'proj.press.lbox':"Open Letterboxd ↗",

      /* ── per-page EN ── */
      'ss.eyebrow':"Narrative Short",'ss.sub':"SAG-AFTRA micro-budget short film. 5 shoot days, 8 locations, 10-person cast, 30-person crew — produced at Boston University, 2026.",'ss.card.format':"SAG-AFTRA Micro-Budget narrative short",'ss.card.focus':"Budgeting, compliance, cast/crew logistics, creative coordination",
      'ss.overview':"Si Solamente is a narrative short that represents my interest in story-driven production and my ability to manage the structure around a scripted project. As producer, my role centered on keeping the production organized, moving the project forward, and supporting the conditions needed for the creative work to happen well.",
      'ss.b1':"Developed and managed an $8K production budget while keeping departments aligned within micro-budget constraints.",'ss.b2':"Produced a 5-day shoot across 8 locations in compliance with SAG-AFTRA Micro-Budget and child labor requirements.",'ss.b3':"Managed logistics for a 10-person cast, including out-of-state talent, and coordinated a 30-person crew.",'ss.b4':"Kept departments aligned and shoot days on schedule across a dense 8-location production week.",
      'ss.detail.cat':"Narrative / Drama",'ss.detail.ctx':"SAG-AFTRA Micro-Budget short film",'ss.detail.str':"Budgeting, logistics, compliance, scripted workflow",'ss.detail.scale':"$8K budget · 5 shoot days · 8 locations",'ss.detail.team':"10-person cast · 30-person crew",
      'ss.scope':"SAG-AFTRA Micro-Budget. $8K budget. 5 shoot days. 8 locations. 10-person cast (including out-of-state talent). 30-person crew. Child labor compliance. Full producer credit from prep through delivery.",
      'ss.press.p1.k':"BU Today · April 2026",'ss.press.p1.t':"Redstone Film Festival First Place",'ss.press.p1.d':"Boston University coverage of Si Solamente winning first place at COM's Redstone Film Festival, with Sofia named as producer.",
      'ss.press.p2.k':"IMDb",'ss.press.p2.t':"Official Film Listing",'ss.press.p2.d':"IMDb listing for the 2026 short drama, crediting Kerlin Campos as writer/director and Sofía González Irigoyen as producer.",
      'ss.press.p3.k':"Instagram Reel",'ss.press.p3.t':"Festival / Press Moment",'ss.press.p3.d':"Social video connected to the film's public life, useful for showing the project beyond the page.",
      'ss.press.p4.k':"Letterboxd",'ss.press.p4.t':"Review Us on Letterboxd!",'ss.press.p4.d':"Seen the film? Leave a review on Letterboxd — every log helps the film reach more people.",
      'ss.gallery.title':"Si Solamente Press Materials",'ss.gallery.p':"The press kit includes the official poster, film stills, and behind-the-scenes photography. Together, the materials show both the finished visual world of the film and the scale of the production behind it.",
      'ss.cap1':"Kitchen-table scene still.",'ss.cap2':"Close-up character still.",'ss.cap3':"Interior scene still.",'ss.cap4':"Exterior field scene still.",'ss.cap5':"Dining-room scene still.",
      'ss.btscap1':"Exterior setup and crew staging.",'ss.btscap2':"Interior lighting and production setup.",'ss.btscap3':"Camera-side view during production.",'ss.btscap4':"Field location setup.",'ss.btscap5':"Exterior crew coordination.",'ss.btscap6':"On-set collaboration.",'ss.btscap7':"Cast and crew group photo.",'ss.btscap8':"Prop and art department detail.",
      'ss.cta.text':"Go back to the production page to view more broadcast, narrative, and television production work.",
      'at.eyebrow':"Telemundo 52 / NBCUniversal",'at.sub':"Broadcast internship experience with Telemundo 52 / NBCUniversal, including Acceso Total segments across entertainment and cultural coverage. This page groups the related pieces together as one professional broadcast experience.",'at.card.title':"Internship Snapshot",'at.card.role':"Segment Producer / Interviewer",'at.card.format':"Acceso Total broadcast segments",'at.card.focus':"Bilingual production, field interviewing, segment execution",
      'at.overview':"My Acceso Total work belongs together as one Telemundo 52 / NBCUniversal internship experience. Across these segments, I worked in a professional Spanish-language broadcast environment where story clarity, timing, audience connection, and production discipline all mattered at once.",
      'at.b1':"Supported Acceso Total segment work in a professional Spanish-language broadcast environment.",'at.b2':"Worked across entertainment and cultural coverage, including a Hollywood premiere and Independence Day segment.",'at.b3':"Contributed as an interviewer and segment producer depending on the needs of each piece.",'at.b4':"Built experience with broadcast pacing, field production, bilingual communication, and audience-facing delivery.",
      'at.detail.cat':"Broadcast / Spanish-language television",'at.detail.ctx':"Telemundo 52 / NBCUniversal internship",'at.detail.str':"Segment producing, interviewing, cultural fluency, broadcast execution",
      'at.why':"This experience matters because it shows my fit for network and broadcast environments. The work combines bilingual production, field awareness, and the ability to contribute to real segments under professional expectations.",
      'at.sel.p1.t':"Acceso Total - Hollywood Premiere",'at.sel.p1.d':"Entertainment coverage where I worked in an on-camera interviewing context.",'at.sel.p2.t':"Acceso Total - Independence Days",'at.sel.p2.d':"Cultural broadcast segment connected to Independence Day coverage.",'at.cta.text':"Return to the production page to view the rest of the portfolio.",
      'bs.eyebrow':"TV Drama",'bs.sub':"Three seasons of scripted television drama produced at Boston University / BUTV in a multi-camera, studio-based workflow.",'bs.card.format':"Recurring scripted television drama",'bs.card.focus':"Multi-season producing, team coordination, continuity across production cycles",
      'bs.overview':"Baystate represents one of the strongest examples of my sustained production experience. Working across multiple seasons meant contributing not just to a single shoot, but to a recurring production rhythm where planning, communication, and follow-through had to remain consistent over time.",
      'bs.b1':"Worked as producer across multiple seasons of a scripted television drama.",'bs.b2':"Coordinated scheduling, casting, and production logistics across three seasons.",'bs.b3':"Managed script breakdowns, shot lists, and studio prep for multi-camera shoots.",'bs.b4':"Maintained continuity across production cycles — same crew, evolving cast, recurring delivery deadlines.",
      'bs.detail.cat':"TV Drama / Scripted Series",'bs.detail.ctx':"Boston University / BUTV production",'bs.detail.str':"Sustained producing, team coordination, production continuity",
      'bs.scope':"Three seasons. Studio multi-camera format. Recurring deadlines, rotating cast, consistent crew. Producer across Seasons 48–50 of Bay State's long-running scripted drama at BUTV.",'bs.cta.text':"Return to the production page to browse more broadcast, film, and production work.",
      'bev.eyebrow':"Drama Short",'bev.sub':"Drama short produced and edited at Boston University. Dual producer-editor role — from shoot logistics to final cut.",'bev.card.format':"Drama short film",'bev.card.focus':"Producing, editing, short-form storytelling",
      'bev.overview':"Bird's Eye View reflects a dual role that asked me to think both on set and in the edit. Producing and editing the project gave me a clearer view of how choices made during production shape what is possible in post.",
      'bev.b1':"Served as both producer and editor for a short drama project.",'bev.b2':"Produced the shoot with editorial decisions already mapped — coverage, continuity, pacing.",'bev.b3':"Edited the final cut: assembly through picture lock.",'bev.b4':"Brought the same project from set to edit suite — no handoff, no communication gap.",
      'bev.detail.cat':"Narrative / Drama",'bev.detail.ctx':"Boston University short film production",'bev.detail.str':"Producer-editor perspective, narrative structure, practical execution",
      'bev.dual':"Producer and editor on the same project — coverage decisions on set mapped directly to editorial choices in post. The kind of dual-role experience that makes both phases faster and tighter.",
      'bev.cap1':"Bird's Eye View — production still.",'bev.cta.text':"Return to the production page to view more broadcast, narrative, and television production work.",
      'lwt.eyebrow':"Broadcast · NATAS Award",'lwt.sub':"Award-recognized BUTV episode where I served as Chief Editor. The project reflects my ability to bring structure, rhythm, and polish to a live television format.",'lwt.card.format':"Student-produced live television · Season 1",'lwt.card.output':"10 deliverables/week · ESPN, YouTube & social",
      'lwt.intro.label':"After Effects · Motion Graphics",'lwt.intro.title':"Live With TY — Season 1 Intro",
      'lwt.intro.desc':"Motion graphics intro created in After Effects — designed, built, and delivered as part of the show's full visual package.",
      'lwt.overview':"Live With TY was part of a live television workflow where timing, energy, and clarity had to carry from production into the final edit. As Chief Editor, I helped shape the finished episode and contributed to the post-production quality of a program recognized by NATAS.",
      'lwt.b1':"Delivered 10 video packages per week, formatted for ESPN, YouTube, and social media across the full season.",'lwt.b2':"Led a team of 4 editors, coordinating workflow and maintaining consistency across all weekly deliverables.",'lwt.b3':"Designed and built the show's graphics package and intro sequence from scratch.",'lwt.b4':"Collaborated with producers on publishing strategy and episode pacing across multiple platforms.",'lwt.b5':"Won a NATAS University Sports Program Award for S1 Ep. 11 — the episode that defined the season's editorial voice.",
      'lwt.detail.cat':"Live Television",'lwt.detail.ctx':"BUTV live television program",'lwt.detail.str':"Chief editing, broadcast pacing, sports/entertainment workflow",
      'lwt.why':"This project matters because it shows that I can work beyond set logistics and into editorial execution. It demonstrates judgment in pacing, continuity, and final delivery, all inside a broadcast environment where the finished product has to feel energetic and clean.",
      'lwt.cap1':"Episode thumbnail pulled from the playable segment.",'lwt.cap2':"BTS Photo in-studio.",
      'lwt.shortseg':"Weekly short-form sports commentary segments edited and formatted for YouTube and social media as part of the 10-deliverable-per-week workflow.",'lwt.cta.text':"Return to the production page to view more broadcast, narrative, and television production work.",
      'pak.eyebrow':"Documentary",'pak.sub':"Documentary with A Posteriori Entertainment. Executive production assistant role — logistics, research support, and production coordination for nonfiction work with Indigenous subject matter.",'pak.card.format':"Documentary short",'pak.card.focus':"Documentary support, research sensitivity, production logistics",
      'pak.overview':"Pajuyuk Ancestral Knowledge sits in the documentary side of my portfolio, where production support has to be thoughtful, organized, and sensitive to the subject matter. The work reflects my interest in nonfiction storytelling and culturally grounded projects.",
      'pak.b1':"Supported documentary production needs as an executive production assistant.",'pak.b2':"Managed production logistics and scheduling for a documentary shoot.",'pak.b3':"Approached the project with attention to cultural context and responsible storytelling.",'pak.b4':"Coordinated logistics while being attentive to the cultural context of the subject matter.",
      'pak.detail.cat':"Documentary",'pak.detail.ctx':"Documentary production with A Posteriori Entertainment",'pak.detail.str':"Documentary workflow, production assistance, story support",
      'pak.context':"Documentary production with a professional production company. Nonfiction logistics, real subjects, and culturally specific subject matter — different demands than scripted narrative work.",
      'pak.cap1':"Primary project thumbnail for Pajuyuk Ancestral Knowledge.",'pak.cap2':"Pajuyuk Ancestral Knowledge — production still.",'pak.cta.text':"Return to the production page to view more broadcast, narrative, and television production work.",
      'tib.eyebrow':"Music Video",'tib.sub':"Music video production where I worked as 1st AD. The project highlights my ability to support schedule, communication, and momentum on set.",'tib.card.format':"Music video production",'tib.card.focus':"Assistant directing, schedule discipline, set momentum",
      'tib.overview':"The In Between gave me experience in a music video environment, where the production rhythm is visual, time-sensitive, and highly dependent on clear coordination. As 1st AD, my role supported the flow of the shoot and the practical needs of the team.",
      'tib.b1':"Worked as 1st AD for a music video production.",'tib.b2':"Supported schedule discipline and on-set communication.",'tib.b3':"Helped keep the shoot moving while preserving space for creative performance and visuals.",'tib.b4':"Built experience in a format where timing, energy, and coordination are central.",
      'tib.detail.cat':"Music Video",'tib.detail.ctx':"Music video production for Veritus Miller",'tib.detail.str':"1st AD work, time management, on-set communication",
      'tib.why':"This project matters because it shows I can step into a leadership-support role on set. It also adds another format to my portfolio, demonstrating comfort across broadcast, narrative, documentary, and music video production.",
      'tib.cap1':"Playable thumbnail from the music video.",'tib.cap2':"Use this slot for a second still, performance frame, or behind-the-scenes image.",'tib.cta.text':"Return to the production page to view more broadcast, narrative, and television production work.",
      'tst.eyebrow':"Narrative Short",'tst.sub':"Independent narrative short film produced with a freelance team outside a university or network structure.",'tst.card.format':"Narrative short film",'tst.card.focus':"Producing, set coordination, independent film workflow",
      'tst.overview':"The Stories We Tell Ourselves represents my independent producing work, where the producer has to create enough structure for the creative team to do strong work. The project required coordination, communication, and practical follow-through from prep into production.",
      'tst.b1':"Produced an independent narrative short film with a freelance creative team.",'tst.b2':"Built production schedule, managed crew communication, and handled practical logistics end-to-end.",'tst.b3':"Ran set logistics and kept the shoot on schedule.",'tst.b4':"Delivered a polished final short under independent-production constraints.",
      'tst.detail.cat':"Narrative / Drama",'tst.detail.ctx':"Freelance narrative short production",'tst.detail.str':"Independent producing, creative logistics, set communication",
      'tst.context':"Independent production with a freelance team — no institutional support, no infrastructure. Built from scratch and delivered.",'tst.cap1':"The Stories We Tell Ourselves — production still.",'tst.cta.text':"Return to the production page to view more broadcast, narrative, and television production work.",
      'zl.eyebrow':"Santiago, Chile",'zl.sub':"Production assistant experience with Zona Latina / TVI America in Santiago, Chile, spanning live variety and lifestyle television. This page groups Zona de Estrellas and Sabores as one international television placement.",'zl.card.title':"Internship Snapshot",'zl.card.role':"Production Assistant",'zl.card.format':"Live variety and lifestyle television",'zl.card.focus':"Studio support, live workflow, Spanish-language production",
      'zl.overview':"My Zona Latina / TVI America work in Santiago belongs together as one international television experience. Through Zona de Estrellas and Sabores, I gained hands-on exposure to Spanish-language studio production, live-show rhythm, and the practical support work required on set.",
      'zl.b1':"Supported production needs across Spanish-language television formats in Santiago, Chile.",'zl.b2':"Assisted with on-set workflow, timing, and communication in a professional studio environment.",'zl.b3':"Worked across live variety and lifestyle programming, adapting to the needs of each format.",'zl.b4':"Built confidence operating in an international production context with fast-moving crews and Spanish-language workflows.",
      'zl.detail.cat':"International television production",'zl.detail.ctx':"Zona Latina / TVI America, Santiago, Chile",'zl.detail.str':"Production assistance, adaptability, studio workflow, Spanish-language media",
      'zl.why':"This experience matters because it shows I can adapt to a new country, crew, and production rhythm while staying useful on set. It also reflects the Spanish-language and cross-cultural television experience that shapes the kind of producer I am becoming.",
      'zl.sel.p1.t':"Zona de Estrellas",'zl.sel.p1.d':"Live variety television experience in Santiago, Chile.",'zl.sel.p2.t':"Sabores",'zl.sel.p2.d':"Lifestyle television production experience with Zona Latina / TVI America.",'zl.cta.text':"Return to the production page to view the rest of the portfolio.",
    },

    /* ─────────────────────────────────────────────────── */
    /*  S P A N I S H                                       */
    /* ─────────────────────────────────────────────────── */

    es: {
      /* ── Nav ──────────────────────────────── */
      'nav.work':          'Trabajo',
      'nav.about':         'Sobre mí',
      'nav.skills':        'Habilidades',
      'nav.contact':       'Contacto',
      'nav.switch':        'Cambiar perfil',
      'nav.lang.label':    'Idioma',

      /* ── Buttons ──────────────────────────── */
      'btn.viewWork':      'Ver trabajo',
      'btn.watchSegment':  'Ver segmento',
      'btn.watchEpisode':  'Ver episodio',
      'btn.watchFilm':     'Ver película',
      'btn.viewProject':   'Ver proyecto',
      'btn.watch':         '▶ Ver',
      'btn.play':          '▶ Reproducir',
      'btn.moreInfo':      'Más info',
      'btn.contactMe':     'Contáctame',
      'btn.resume':        '↓ Descargar CV',
      'btn.backToTop':     'Volver arriba',
      'btn.sendScript':    'Envíame tu guion →',
      'btn.viewCredits':   '▾ Ver créditos',

      /* ── Footer ───────────────────────────── */
      'footer.copy':       '© 2026 Sofia González Irigoyen · Boston, MA',

      /* ── Hover card ───────────────────────── */
      'hover.playable':    'Reproducible',
      'hover.details':     'Detalles',

      /* ── Aria ─────────────────────────────── */
      'aria.intro':        'Intro',
      'aria.featured':     'Proyecto destacado',
      'aria.scrollLeft':   'Desplazar a la izquierda',
      'aria.scrollRight':  'Desplazar a la derecha',
      'aria.closeVideo':   'Cerrar video',

      /* ── Index ────────────────────────────── */
      'idx.tapLogo':       'Portafolio de Sofia',
      'idx.tapHint':       'Toca para comenzar',
      'idx.heading':       '¿QUIÉN VE?',
      'idx.sub':           'Elige la versión del trabajo de Sofia que quieres explorar',
      'idx.production':    'Producción',
      'idx.advertising':   'Publicidad',
      'idx.collaborators': 'Colaboradores',
      'idx.found':         'me encontraste',

      /* ── Recruiter — hero ─────────────────── */
      'rec.kicker':        'PERFIL DE PRODUCCIÓN',
      'rec.badge.tv':      'TV Y CINE',
      'rec.badge.film':    'Perfil de Cine y Narrativa',
      'rec.intro.b.desc':  'Productora de televisión con experiencia en Telemundo 52 / NBCUniversal, Zona Latina en Santiago y el programa de televisión en vivo de BU. Cómoda en entornos de ritmo rápido y transmisión en directo.',
      'rec.intro.f.desc':  'Productora narrativa con cortometrajes SAG-AFTRA, tres temporadas de drama televisivo y trabajo documental. Construyo rodajes que terminan a tiempo y sets donde la gente quiere estar.',
      'rec.toggle.b':      'Broadcast y TV',
      'rec.toggle.f':      'Cine y Narrativa',

      /* ── Recruiter — rows ─────────────────── */
      'rec.row.live':      'Televisión en Vivo',
      'rec.row.tv':        'Drama de TV',
      'rec.row.intl':      'Producción Internacional y Bilingüe',
      'rec.row.narrative': 'Narrativa y Drama',
      'rec.row.doc':       'Documental',
      'rec.row.comedy':    'Comedia',
      'rec.row.other':     'Videoclip y Otros',

      /* ── Recruiter — about ────────────────── */
      'rec.about.h':       'Sobre Sofia',
      'rec.about.p1':      "Soy productora de cine y televisión finalizando una Licenciatura en Producción Cinematográfica y Televisiva en Boston University, con una segunda concentración en Publicidad y graduación en agosto de 2026. He producido cortometrajes SAG-AFTRA, trabajé como productora de segmentos en Telemundo 52, estuve en set en Santiago para un show de variedades en vivo y produje tres temporadas de Bay State TV Drama.",
      'rec.about.p2':      "Con experiencia en producción en estudio, en exteriores y en set en vivo, incluyendo proyectos SAG-AFTRA, formatos multicámara y equipos de gran escala. Busco roles de productora asociada, coordinadora y asistente en televisión, redes y empresas de producción.",

      /* ── Recruiter — highlights ───────────── */
      'rec.hl1.org':   'NATAS · 2024',
      'rec.hl1.title': 'Premio al Programa Universitario Deportivo',
      'rec.hl1.desc':  'Editora en Jefe, Live With TY Temporada 1',
      'rec.hl2.org':   'IFFBoston · 2026',
      'rec.hl2.title': 'Muestra de Cine Estudiantil',
      'rec.hl2.desc':  'Película seleccionada para proyección en Somerville Theater',
      'rec.hl3.org':   'Redstone Film Festival · 2026',
      'rec.hl3.title': 'Mejor Película',
      'rec.hl3.desc':  'Festival de cine estudiantil del Departamento de Cine y TV de BU',
      'rec.hl4.org':   'AdLab · Primavera 2026',
      'rec.hl4.title': 'Productora de Video · Premio Above & Beyond',
      'rec.hl4.desc':  'La agencia de publicidad estudiantil más grande del país',

      /* ── Recruiter — skills ───────────────── */
      'rec.skills.h':       'Herramientas de Producción',
      'rec.skills.intro':   'Una vista práctica de las herramientas, flujos de trabajo y habilidades de set detrás del trabajo mostrado.',
      'rec.sp1.title':      'Producción y Coordinación',
      'rec.sp1.text':       'Gestión de producción consciente del presupuesto, programación, coordinación de talento y comunicación en set para proyectos de ficción, en vivo y documentales.',
      'rec.sp2.title':      'Broadcast y TV en Vivo',
      'rec.sp2.text':       'Cómoda en entornos de transmisión en vivo y grabados, desde la coordinación de invitados hasta el timing en sala de control y soporte de segmentos.',
      'rec.sp3.title':      'Post-Producción y Herramientas Creativas',
      'rec.sp3.text':       'Edición, acabado, gráficos y herramientas de desarrollo visual para cortometrajes, paquetes de broadcast, material para redes y medios de portafolio.',
      'rec.sp4.title':      'Comunicación y Digital',
      'rec.sp4.text':       'Comunicación de producción bilingüe, publicación en plataformas, ciclos de retroalimentación con clientes y gestión de activos digitales para equipos de medios.',
      'rec.tool1.type':     'Edición / color / acabado',
      'rec.tool2.type':     'Programación y presupuesto',
      'rec.tool3.type':     'Flujos de trabajo de broadcast',
      'rec.tool4.type':     'Premiere, AE, Photoshop',

      /* ── Recruiter — contact ──────────────── */
      'rec.contact.h':      'Contacto',
      'rec.contact.p1':     "Me gradúo en agosto de 2026 y busco mi primer empleo de tiempo completo en broadcast, redes o producción. Si tu equipo necesita una productora bilingüe que pueda moverse entre historia, set, edición y entornos en vivo, me encantaría hablar.",
      'rec.contact.email':  'Correo',
      'rec.contact.li':     'LinkedIn',

      /* ── Agency — hero ────────────────────── */
      'ag.kicker':          'PERFIL DE PUBLICIDAD',
      'ag.intro.desc':      'Productora y estudiante de publicidad trabajando en contenido de marca, video social y producción de campaña. Aporto una mirada de producción al proceso creativo y un instinto creativo al set.',
      'ag.meta.tag1':       'AdLab · BU',
      'ag.meta.tag2':       'Contenido de Marca',
      'ag.meta.tag3':       'Video Social',

      /* ── Agency — rows ────────────────────── */
      'ag.row.shortform':   'Contenido de Formato Corto',
      'ag.row.spec':        'Campañas de Práctica',
      'ag.row.ai':          'Movimiento Generado por IA',
      'ag.row.spec.note':   'Trabajo de campañas en solitario y simuladas',
      'ag.row.ai.note':     'Anuncios de movimiento social de práctica explorando atmósfera de producto, estado de marca y construcción de mundo visual asistida por IA.',

      /* ── Agency — toolkit ─────────────────── */
      'ag.toolkit.h':       'Herramientas de Agencia',
      'ag.tp1.title':       'Desarrollo de Concepto',
      'ag.tp1.text':        'Convertir una sola idea en una plataforma de campaña, eslogan, ejecución social y concepto de video que pueda sobrevivir el feedback del cliente.',
      'ag.tp2.title':       'Producción',
      'ag.tp2.text':        'Coordinar rodajes, talento, locaciones, retroalimentación, necesidades de edición y especificaciones de entrega para activos específicos de cada plataforma.',
      'ag.tp3.title':       'Post-Producción y Entrega',
      'ag.tp3.text':        'Edición de materiales de formato corto para TikTok, Instagram, Facebook y cable con ritmo claro y exportaciones finales limpias.',

      /* ── Agency — about ───────────────────── */
      'ag.about.h':         'Sobre Sofia',
      'ag.about.p1':        'Productora y estudiante de publicidad en Boston University trabajando en producción, pensamiento de campaña y narrativa orientada a redes. Me interesan las ideas lo suficientemente claras para viajar, lo suficientemente visuales para recordar y lo suficientemente prácticas para producir bien.',
      'ag.about.p2':        'Mi formación en producción moldea cómo pienso creativamente. No solo me pregunto si una idea es interesante — pienso en cómo se filmará, editará, entregará y experimentará en distintas plataformas. Eso me hace útil en el espacio entre el concepto y la ejecución.',
      'ag.focus.title':     'Enfoque Publicitario',
      'ag.focus.text':      'Conceptos de campaña orientados a redes, producción de video de formato corto, creatividad orientada al cliente y trabajo de práctica con una idea central clara.',

      /* ── Agency — contact ─────────────────── */
      'ag.contact.h':       'Contacto',
      'ag.contact.p1':      'Me gradúo en agosto de 2026 y busco roles de producción en agencias — PA, productora junior o productora de contenido. Si tu equipo necesita a alguien que pueda llevar una idea creativa del brief a la cámara y a la entrega, me encantaría hablar.',

      /* ── Director — hero ──────────────────── */
      'dir.kicker':         'Colaboradores · Productora Freelance',
      'dir.tagline':        '"La persona a quien llamas cuando necesitas a alguien."',
      'dir.meta.avail':     'Disponible Ahora',
      'dir.actions.script': '✉ Envíame tu guion',
      'dir.actions.credits':'▾ Ver créditos',

      /* ── Director — rows ──────────────────── */
      'dir.row.dev':        'En Desarrollo',
      'dir.row.dev.note':   'Proyectos actuales',
      'dir.row.prod':       'Producido',
      'dir.row.prod.note':  'Créditos como productora',
      'dir.row.onset':      'En Set',
      'dir.row.onset.note': 'DA, supervisión de guion y créditos de departamento',

      /* ── Director — dev badge labels ─────── */
      'dir.badge.production':  'Ahora en Producción',
      'dir.badge.development': 'En Desarrollo',

      /* ── Director — script section ────────── */
      'dir.script.eyebrow': '▶  Abierta a Proyectos',
      'dir.script.title':   '¿TRABAJANDO EN\nALGO?',
      'dir.script.copy':    'Envíame tu guion. Ya sea que estés en desarrollo, pre-producción o todavía descubriendo qué es — quiero escucharlo. Trabajo mejor con personas que se toman el oficio en serio y necesitan a alguien que también lo haga.',
      'dir.script.btn':     'Envíame tu guion →',

      /* ── Director — about ─────────────────── */
      'dir.about.h':        'Sobre Sofia',
      'dir.about.p1':       'Soy productora finalizando una Licenciatura en Producción Cinematográfica y Televisiva en Boston University, graduándome en agosto de 2026. He producido cortometrajes SAG-AFTRA, tres temporadas de drama televisivo grabado en vivo y he estado en set internacionalmente en roles desde 1ra DA hasta supervisora de guion.',
      'dir.about.p2':       'Con experiencia en producción en estudio, en exteriores y en locación. Me atraen los proyectos con algo real que decir y colaboradores que cuidan cada detalle. Si eres director/a, guionista o DP y buscas una productora que prepare obsesivamente, proteja tu visión y mantenga el set en movimiento — escríbeme.',

      /* ── Director — highlights ────────────── */
      'dir.hl1.org':        'IFFBoston · 2026',
      'dir.hl1.title':      'Muestra de Cine Estudiantil',
      'dir.hl1.desc':       'Si Solamente seleccionada para proyección en Somerville Theater',
      'dir.hl2.org':        'Redstone Film Festival · 2026',
      'dir.hl2.title':      'Mejor Película',
      'dir.hl2.desc':       'Festival de cine estudiantil del Departamento de Cine y TV de BU',
      'dir.hl3.org':        'NATAS · 2024',
      'dir.hl3.title':      'Premio al Programa Universitario Deportivo',
      'dir.hl3.desc':       'Editora en Jefe, Live With TY Temporada 1',
      'dir.hl4.org':        'AdLab · Primavera 2026',
      'dir.hl4.title':      'Premio Above & Beyond',
      'dir.hl4.desc':       'La agencia de publicidad estudiantil más grande del país',

      /* ── Director — contact ───────────────── */
      'dir.contact.h':      'Contacto',
      'dir.contact.p1':     'Graduándome en agosto de 2026 y disponible para trabajo freelance como productora ahora mismo. Si estás trabajando en algo — un corto, un largometraje, un documental, cualquier narrativa — envíamelo. Me tomo el trabajo en serio y soy fácil de tener cerca.',

      /* ── Stalker ──────────────────────────── */
      'stk.kicker':         'Encontraste la página secreta.',
      'stk.heading':        'OFICIALMENTE UNA FAN.',
      'stk.tagline':        'Fuiste a buscar. Me encontraste. Tiene sentido.',
      'stk.desc':           'Esta no es la versión profesional. Esta es la real.',
      'stk.nav.home':       'Inicio',
      'stk.nav.vibes':      'Ambiente',
      'stk.nav.bts':        'BTS',
      'stk.nav.exit':       'Salir',
      'stk.stats.h':        'Los Números',
      'stk.shorts.h':       'Contenido de Formato Corto',
      'stk.bts.h':          'Detrás de Cámara',

      /* ── Deep Cut modals (index.html) ─────── */
      'dc.eyebrow':         '⏸  ¿Sigues viendo?',
      'dc.title':           '¿Sigues\nviendo?',
      'dc.body':            'Llegaste más allá del portafolio oficial. Hay una versión menos formal si la quieres.',
      'dc.stay':            'Quedarme aquí',
      'dc.unlock':          'Ver la versión completa',
      'dc.hint.eyebrow':    '🔒  Perfil Bloqueado',
      'dc.hint.title':      'Todavía No',
      'dc.hint.body':       'Algunos perfiles solo aparecen si te quedas el tiempo suficiente.',
      'dc.hint.ok':         'Entendido',

      /* ── Hover card project summaries ─────── */
      'hs.Acceso Total - Hollywood Premiere':        'Entrevista en campo y cobertura de entretenimiento de la pasantía en Telemundo 52 / NBCUniversal.',
      'hs.Acceso Total - Independence Days':         'Segmento cultural en español producido para Acceso Total durante la pasantía en Telemundo.',
      'hs.Live With TY':                             'Episodio universitario de deportes reconocido por NATAS, conformado a través de edición en jefe y ritmo de broadcast.',
      'hs.Zona de Estrellas':                        'Experiencia en televisión de variedades en vivo desde una pasantía internacional en Santiago, Chile.',
      'hs.Sabores':                                  'Apoyo en producción televisiva de estilo de vida desde la pasantía en Zona Latina / TVI America.',
      'hs.Bay State - Seasons 48-50':                'Producción de TV de ficción en múltiples temporadas con flujo de trabajo grabado en vivo y tres cámaras en estudio.',
      'hs.Si Solamente':                             'Cortometraje SAG-AFTRA de micro-presupuesto con una producción de 5 días y 8 locaciones.',
      'hs.The Stories We Tell Ourselves':            'Cortometraje narrativo independiente construido en torno a planificación de producción, control de presupuesto y coordinación en set.',
      'hs.Pajuyuk Ancestral Knowledge':              'Apoyo en producción documental que requirió cuidado, organización y sensibilidad cultural.',
      'hs.Bird\'s Eye View':                         'Drama corto donde la producción y edición conectaron el flujo del set con la historia final.',
      'hs.Alike Loves':                              'Cortometraje rom-com en solitario sobre dos personas preparándose para una cita y las pequeñas expectativas detrás de algo aparentemente simple.',
      'hs.Lucky Streak':                             'Documental narrativo sobre un hombre que se proclama crónicamente sin suerte pero dice no haber perdido nunca al póker.',
      'hs.Till Death Do Us Part':                    'Cortometraje de comedia sobre una pareja que termina en un concurso del más allá tras un desafortunado accidente de auto.',
      'hs.Cine Final':                               'Final de Introducción a la Cinematografía replicando una escena de Amélie con actuación, dirección y trabajo de DP reimaginados.',
      'hs.The In Between':                           'Asistencia de dirección en videoclip con entrega rápida, disciplina de horario e impulso en set.',
      'hs.By Design':                                'Primer crédito como asistente de dirección enfocado en schedules diarios, flujo del set y mantener al elenco y equipo en tarea.',
      'hs.El Futuro para Mama y Yo':                 'Primer crédito como asistente de dirección con coordinación de producción en español, programación y comunicación en set.',
      'hs.Vestido para Mama':                        'Crédito de supervisión de guion rastreando continuidad, notas de guion y detalles de producción durante el rodaje.',
      'hs.Growing Pains':                            'Crédito de supervisión de guion apoyando continuidad, seguimiento de escenas y comunicación clara entre departamentos.',
      'hs.Chameleon':                                'Crédito de supervisión de guion enfocado en continuidad, seguimiento de guion y organización de producción.',
      'hs.Aftershock':                               'Crédito de segundo asistente de cámara apoyando el flujo del departamento de cámara y coordinación técnica en set.',

      /* ══════════════════════════════════════
         PROJECT DETAIL PAGES — shared chrome
         ══════════════════════════════════════ */
      'proj.nav.logo':          "Portafolio de Sofia",
      'proj.nav.production':    "Producción",
      'proj.nav.overview':      "Resumen",
      'proj.nav.media':         "Multimedia",
      'proj.nav.gallery':       "Galería",
      'proj.nav.back.prod':     "← Volver a Producción",
      'proj.card.snapshot':     "Resumen del Proyecto",
      'proj.card.internship':   "Resumen de Pasantía",
      'proj.card.label.role':   "Rol",
      'proj.card.label.org':    "Organización",
      'proj.card.label.format': "Formato",
      'proj.card.label.focus':  "Enfoque",
      'proj.card.label.output': "Entregables",
      'proj.sec.overview':      "Resumen del Proyecto",
      'proj.sec.whatidid':      "Lo Que Hice",
      'proj.sec.details':       "Detalles del Proyecto",
      'proj.sec.scope':         "Alcance de Producción",
      'proj.sec.press':         "Prensa y Reconocimientos",
      'proj.sec.bts':           "Detrás de Cámara",
      'proj.sec.stills':        "Fotogramas del Film",
      'proj.sec.gallery':       "Tráiler y Kit de Prensa",
      'proj.sec.media':         "Medios Seleccionados",
      'proj.sec.dual':          "Rol Dual",
      'proj.sec.intro':         "Intro del Show",
      'proj.sec.why':           "Por Qué Este Proyecto Importa",
      'proj.sec.whyexp':        "Por Qué Esta Experiencia Importa",
      'proj.sec.selected':      "Trabajo Seleccionado de Esta Experiencia",
      'proj.sec.shortseg':      "Hot Takes with Ty — Segmentos de Formato Corto",
      'proj.sec.pressmat':      "Si Solamente — Materiales de Prensa",
      'proj.detail.category':   "Categoría",
      'proj.detail.year':       "Año",
      'proj.detail.years':      "Años",
      'proj.detail.context':    "Contexto",
      'proj.detail.strengths':  "Puntos Fuertes Principales",
      'proj.detail.scale':      "Escala de Producción",
      'proj.detail.team':       "Equipo",
      'proj.cta.browse':        "Continúa explorando",
      'proj.cta.explore':       "Sigue explorando",
      'proj.cta.text.prod':     "Vuelve a la página de producción para explorar más trabajo de broadcast, cine y televisión.",
      'proj.cta.text.rest':     "Vuelve a la página de producción para ver el resto del portafolio.",
      'proj.cta.btn':           "Volver a Producción",
      'proj.footer':            "© 2026 Sofia González Irigoyen · Página de Proyecto",
      'proj.btn.back':          "← Volver a Producción",
      'proj.btn.watch':         "▶ Ver",
      'proj.btn.watchseg':      "▶ Ver Segmento",
      'proj.btn.watchep':       "▶ Ver Ep. 11",
      'proj.btn.watchintro':    "Ver Intro",
      'proj.btn.watchtrailer':  "▶ Ver Tráiler",
      'proj.btn.watchfeatured': "▶ Ver Segmento Destacado",
      'proj.btn.details':       "Detalles del Proyecto",
      'proj.btn.presskit':      "Material de Kit de Prensa",
      'proj.press.read':        "Leer artículo ↗",
      'proj.press.imdb':        "Ver IMDb ↗",
      'proj.press.reel':        "Ver reel ↗",
      'proj.press.lbox':        "Abrir Letterboxd ↗",

      /* ── Si Solamente ──────────────────────── */
      'ss.eyebrow':   "Cortometraje Narrativo",
      'ss.sub':       "Cortometraje SAG-AFTRA de micro-presupuesto. 5 días de rodaje, 8 locaciones, elenco de 10 personas, equipo de 30 — producido en Boston University, 2026.",
      'ss.card.format': "Cortometraje narrativo SAG-AFTRA de micro-presupuesto",
      'ss.card.focus':  "Presupuesto, cumplimiento normativo, logística de elenco/equipo, coordinación creativa",
      'ss.overview':  "Si Solamente es un cortometraje narrativo que refleja mi interés en la producción orientada a la historia y mi capacidad de gestionar la estructura de un proyecto de ficción. Como productora, me centré en mantener la producción organizada, avanzar el proyecto y apoyar las condiciones para que el trabajo creativo se realizara bien.",
      'ss.b1':        "Desarrollé y gestioné un presupuesto de producción de $8K manteniendo a los departamentos dentro de las restricciones de micro-presupuesto.",
      'ss.b2':        "Produje un rodaje de 5 días en 8 locaciones cumpliendo con los requisitos de SAG-AFTRA Micro-Budget y trabajo de menores.",
      'ss.b3':        "Gestioné la logística de un elenco de 10 personas, incluyendo talento de otros estados, y coordiné un equipo de 30 personas.",
      'ss.b4':        "Mantuve los departamentos alineados y los días de rodaje en horario durante una semana de producción en 8 locaciones.",
      'ss.detail.cat':   "Narrativa / Drama",
      'ss.detail.ctx':   "Cortometraje SAG-AFTRA de micro-presupuesto",
      'ss.detail.str':   "Presupuesto, logística, cumplimiento normativo, flujo de trabajo de ficción",
      'ss.detail.scale': "$8K presupuesto · 5 días de rodaje · 8 locaciones",
      'ss.detail.team':  "Elenco de 10 · Equipo de 30",
      'ss.scope':     "SAG-AFTRA Micro-Budget. Presupuesto de $8K. 5 días de rodaje. 8 locaciones. Elenco de 10 personas (incluyendo talento de otros estados). Equipo de 30 personas. Cumplimiento de trabajo de menores. Crédito completo de productora desde la preproducción hasta la entrega.",
      'ss.press.p1.k':  "BU Today · Abril 2026",
      'ss.press.p1.t':  "Primer Lugar en el Festival de Cine Redstone",
      'ss.press.p1.d':  "Cobertura de Boston University sobre Si Solamente ganando el primer lugar en el Festival de Cine Redstone de COM, con Sofia acreditada como productora.",
      'ss.press.p2.k':  "IMDb",
      'ss.press.p2.t':  "Listado Oficial del Film",
      'ss.press.p2.d':  "Listado de IMDb para el drama corto de 2026, acreditando a Kerlin Campos como escritora/directora y a Sofía González Irigoyen como productora.",
      'ss.press.p3.k':  "Reel de Instagram",
      'ss.press.p3.t':  "Momento de Festival / Prensa",
      'ss.press.p3.d':  "Video social vinculado a la vida pública del film, útil para mostrar el proyecto más allá de la página.",
      'ss.press.p4.k':  "Letterboxd",
      'ss.press.p4.t':  "¡Reseñanos en Letterboxd!",
      'ss.press.p4.d':  "¿Viste el film? Deja una reseña en Letterboxd — cada registro ayuda al film a llegar a más personas.",
      'ss.gallery.title': "Si Solamente — Materiales de Prensa",
      'ss.gallery.p':   "El kit de prensa incluye el póster oficial, fotogramas del film y fotografía detrás de cámara. Juntos, los materiales muestran tanto el mundo visual terminado del film como la escala de la producción detrás de él.",
      'ss.cap1':  "Escena en la mesa de la cocina.",
      'ss.cap2':  "Fotograma en close-up de personaje.",
      'ss.cap3':  "Escena de interior.",
      'ss.cap4':  "Escena exterior en campo.",
      'ss.cap5':  "Escena en el comedor.",
      'ss.btscap1': "Preparación en exteriores y posicionamiento del equipo.",
      'ss.btscap2': "Iluminación interior y preparación de producción.",
      'ss.btscap3': "Vista desde la cámara durante la producción.",
      'ss.btscap4': "Preparación en locación exterior.",
      'ss.btscap5': "Coordinación del equipo en exteriores.",
      'ss.btscap6': "Colaboración en set.",
      'ss.btscap7': "Foto grupal de elenco y equipo.",
      'ss.btscap8': "Detalle de propiedades y departamento de arte.",
      'ss.cta.text': "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── Acceso Total Telemundo 52 ─────────── */
      'at.eyebrow':    "Telemundo 52 / NBCUniversal",
      'at.sub':        "Experiencia de pasantía en broadcast con Telemundo 52 / NBCUniversal, incluyendo segmentos de Acceso Total de cobertura de entretenimiento y cultural. Esta página agrupa las piezas relacionadas como una experiencia profesional de broadcast.",
      'at.card.title': "Resumen de Pasantía",
      'at.card.role':  "Productora de Segmentos / Entrevistadora",
      'at.card.format':"Segmentos de broadcast de Acceso Total",
      'at.card.focus': "Producción bilingüe, entrevistas en campo, ejecución de segmentos",
      'at.overview':   "Mi trabajo en Acceso Total forma parte de una sola experiencia de pasantía en Telemundo 52 / NBCUniversal. A lo largo de estos segmentos, trabajé en un entorno profesional de broadcast en español donde la claridad narrativa, el timing, la conexión con la audiencia y la disciplina de producción importaban al mismo tiempo.",
      'at.b1':  "Apoyé el trabajo de segmentos de Acceso Total en un entorno profesional de broadcast en español.",
      'at.b2':  "Trabajé en cobertura de entretenimiento y cultural, incluyendo un estreno en Hollywood y un segmento de Día de la Independencia.",
      'at.b3':  "Contribuí como entrevistadora y productora de segmentos según las necesidades de cada pieza.",
      'at.b4':  "Desarrollé experiencia en ritmo de broadcast, producción en campo, comunicación bilingüe y presentación frente a audiencia.",
      'at.detail.cat': "Broadcast / Televisión en español",
      'at.detail.ctx': "Pasantía en Telemundo 52 / NBCUniversal",
      'at.detail.str': "Producción de segmentos, entrevistas, fluidez cultural, ejecución de broadcast",
      'at.why':   "Esta experiencia importa porque demuestra mi encaje en entornos de redes y broadcast. El trabajo combina producción bilingüe, conciencia en campo y la capacidad de contribuir a segmentos reales bajo expectativas profesionales.",
      'at.sel.p1.t':   "Acceso Total - Estreno en Hollywood",
      'at.sel.p1.d':   "Cobertura de entretenimiento donde trabajé en un contexto de entrevista en cámara.",
      'at.sel.p2.t':   "Acceso Total - Días de la Independencia",
      'at.sel.p2.d':   "Segmento cultural de broadcast relacionado con la cobertura del Día de la Independencia.",
      'at.cta.text':   "Vuelve a la página de producción para ver el resto del portafolio.",

      /* ── Baystate 48–50 ───────────────────── */
      'bs.eyebrow':    "Drama de TV",
      'bs.sub':        "Tres temporadas de drama televisivo de ficción producido en Boston University / BUTV con un flujo de trabajo de multicámara en estudio.",
      'bs.card.format':"Drama televisivo de ficción recurrente",
      'bs.card.focus': "Producción en múltiples temporadas, coordinación de equipo, continuidad entre ciclos de producción",
      'bs.overview':   "Baystate representa uno de los ejemplos más sólidos de mi experiencia sostenida en producción. Trabajar en múltiples temporadas significó contribuir no solo a un único rodaje, sino a un ritmo de producción recurrente donde la planificación, la comunicación y el seguimiento debían mantenerse consistentes a lo largo del tiempo.",
      'bs.b1':  "Trabajé como productora en múltiples temporadas de un drama televisivo de ficción.",
      'bs.b2':  "Coordiné la programación, el casting y la logística de producción en tres temporadas.",
      'bs.b3':  "Gestioné desglose de guiones, listas de planos y preparación del estudio para rodajes multicámara.",
      'bs.b4':  "Mantuve la continuidad entre ciclos de producción — mismo equipo, elenco en rotación, deadlines recurrentes.",
      'bs.detail.cat': "Drama de TV / Serie de Ficción",
      'bs.detail.ctx': "Producción de Boston University / BUTV",
      'bs.detail.str': "Producción sostenida, coordinación de equipo, continuidad de producción",
      'bs.scope':  "Tres temporadas. Formato multicámara en estudio. Deadlines recurrentes, elenco rotativo, equipo constante. Productora en las Temporadas 48–50 del drama de ficción de larga trayectoria de Bay State en BUTV.",
      'bs.cta.text':   "Vuelve a la página de producción para explorar más trabajo de broadcast, cine y producción.",

      /* ── Bird's Eye View ──────────────────── */
      'bev.eyebrow':    "Cortometraje de Drama",
      'bev.sub':        "Drama corto producido y editado en Boston University. Rol dual de productora-editora — desde la logística del rodaje hasta el corte final.",
      'bev.card.format':"Cortometraje de drama",
      'bev.card.focus': "Producción, edición, narración en formato corto",
      'bev.overview':   "Bird's Eye View refleja un rol dual que me exigió pensar tanto en set como en la sala de edición. Producir y editar el proyecto me dio una visión más clara de cómo las decisiones tomadas durante la producción determinan lo que es posible en la post.",
      'bev.b1':  "Trabajé como productora y editora de un cortometraje dramático.",
      'bev.b2':  "Produje el rodaje con las decisiones editoriales ya mapeadas — cobertura, continuidad, ritmo.",
      'bev.b3':  "Edité el corte final: de ensamblaje hasta picture lock.",
      'bev.b4':  "Llevé el mismo proyecto desde el set hasta la sala de edición — sin handoff, sin brecha de comunicación.",
      'bev.detail.cat': "Narrativa / Drama",
      'bev.detail.ctx': "Producción de cortometraje en Boston University",
      'bev.detail.str': "Perspectiva productora-editora, estructura narrativa, ejecución práctica",
      'bev.dual':  "Productora y editora en el mismo proyecto — las decisiones de cobertura en set se mapearon directamente en las decisiones editoriales en la post. El tipo de experiencia de rol dual que hace ambas fases más rápidas y ajustadas.",
      'bev.cap1':  "Fotograma de producción de Bird's Eye View.",
      'bev.cta.text':   "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── Live With TY ─────────────────────── */
      'lwt.eyebrow':    "Broadcast · Premio NATAS",
      'lwt.sub':        "Episodio de BUTV reconocido con premio donde fui Editora en Jefe. El proyecto refleja mi capacidad de aportar estructura, ritmo y pulido a un formato de televisión en vivo.",
      'lwt.card.format':"Televisión en vivo universitaria · Temporada 1",
      'lwt.card.output':"10 entregables/semana · ESPN, YouTube y redes sociales",
      'lwt.intro.desc':"Intro de motion graphics creada en After Effects — diseñada, construida y entregada como parte del paquete visual completo del programa.",
      'lwt.intro.label':"After Effects · Motion Graphics",
      'lwt.intro.title':"Live With TY — Intro de Temporada 1",
      'lwt.overview':  "Live With TY fue parte de un flujo de trabajo de televisión en vivo donde el timing, la energía y la claridad debían trasladarse de la producción al corte final. Como Editora en Jefe, ayudé a dar forma al episodio terminado y contribuí a la calidad de post-producción de un programa reconocido por NATAS.",
      'lwt.b1':  "Entregué 10 paquetes de video por semana, formateados para ESPN, YouTube y redes sociales durante toda la temporada.",
      'lwt.b2':  "Lideré un equipo de 4 editores, coordinando el flujo de trabajo y manteniendo la consistencia en todos los entregables semanales.",
      'lwt.b3':  "Diseñé y construí el paquete gráfico y la secuencia de intro del programa desde cero.",
      'lwt.b4':  "Colaboré con los productores en la estrategia de publicación y el ritmo del episodio en múltiples plataformas.",
      'lwt.b5':  "Gané un Premio al Programa Universitario Deportivo de NATAS por S1 Ep. 11 — el episodio que definió la voz editorial de la temporada.",
      'lwt.detail.cat': "Televisión en Vivo",
      'lwt.detail.ctx': "Programa de televisión en vivo de BUTV",
      'lwt.detail.str': "Edición en jefe, ritmo de broadcast, flujo de trabajo deportivo/entretenimiento",
      'lwt.why':   "Este proyecto importa porque demuestra que puedo trabajar más allá de la logística en set y entrar en la ejecución editorial. Muestra criterio en ritmo, continuidad y entrega final, todo dentro de un entorno de broadcast donde el producto terminado debe sentirse enérgico y limpio.",
      'lwt.cap1':  "Miniatura del episodio del segmento reproducible.",
      'lwt.cap2':  "Foto de BTS en estudio.",
      'lwt.shortseg': "Segmentos semanales de comentarios deportivos de formato corto editados y formateados para YouTube y redes sociales como parte del flujo de 10 entregables por semana.",
      'lwt.cta.text':   "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── Pajuyuk Ancestral Knowledge ─────── */
      'pak.eyebrow':    "Documental",
      'pak.sub':        "Documental con A Posteriori Entertainment. Rol de asistente ejecutiva de producción — logística, apoyo de investigación y coordinación de producción para trabajo de no ficción con temática indígena.",
      'pak.card.format':"Cortometraje documental",
      'pak.card.focus': "Apoyo documental, sensibilidad en la investigación, logística de producción",
      'pak.overview':   "Pajuyuk Ancestral Knowledge se sitúa en el lado documental de mi portafolio, donde el apoyo de producción debe ser reflexivo, organizado y sensible a la temática. El trabajo refleja mi interés en la narrativa de no ficción y los proyectos con base cultural.",
      'pak.b1':  "Apoyé las necesidades de producción documental como asistente ejecutiva de producción.",
      'pak.b2':  "Gestioné la logística de producción y la programación para un rodaje documental.",
      'pak.b3':  "Me acerqué al proyecto con atención al contexto cultural y la narrativa responsable.",
      'pak.b4':  "Coordiné la logística manteniendo atención al contexto cultural de la temática.",
      'pak.detail.cat': "Documental",
      'pak.detail.ctx': "Producción documental con A Posteriori Entertainment",
      'pak.detail.str': "Flujo de trabajo documental, asistencia de producción, apoyo narrativo",
      'pak.context':    "Producción documental con una empresa profesional. Logística de no ficción, sujetos reales y temática culturalmente específica — exigencias distintas al trabajo narrativo de ficción.",
      'pak.cap1':  "Miniatura principal del proyecto Pajuyuk Ancestral Knowledge.",
      'pak.cap2':  "Fotograma de producción de Pajuyuk Ancestral Knowledge.",
      'pak.cta.text':   "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── The In Between ──────────────────── */
      'tib.eyebrow':    "Videoclip",
      'tib.sub':        "Producción de videoclip donde trabajé como 1ra DA. El proyecto destaca mi capacidad de apoyar el horario, la comunicación y el impulso en set.",
      'tib.card.format':"Producción de videoclip",
      'tib.card.focus': "Trabajo de 1ra DA, disciplina de horario, impulso en set",
      'tib.overview':   "The In Between me dio experiencia en un entorno de videoclip, donde el ritmo de producción es visual, sensible al tiempo y altamente dependiente de una coordinación clara. Como 1ra DA, mi rol apoyó el flujo del rodaje y las necesidades prácticas del equipo.",
      'tib.b1':  "Trabajé como 1ra DA para una producción de videoclip.",
      'tib.b2':  "Apoyé la disciplina de horario y la comunicación en set.",
      'tib.b3':  "Ayudé a mantener el rodaje en movimiento preservando el espacio para la actuación creativa y los visuales.",
      'tib.b4':  "Desarrollé experiencia en un formato donde el timing, la energía y la coordinación son fundamentales.",
      'tib.detail.cat': "Videoclip",
      'tib.detail.ctx': "Producción de videoclip para Veritus Miller",
      'tib.detail.str': "Trabajo de 1ra DA, gestión del tiempo, comunicación en set",
      'tib.why':   "Este proyecto importa porque demuestra que puedo asumir un rol de liderazgo-apoyo en set. También añade otro formato a mi portafolio, demostrando comodidad en broadcast, narrativa, documental y producción de videoclip.",
      'tib.cap1':  "Miniatura reproducible del videoclip.",
      'tib.cap2':  "Usa este espacio para una segunda imagen, fotograma de actuación o fotografía de detrás de cámara.",
      'tib.cta.text':   "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── The Stories We Tell Ourselves ────── */
      'tst.eyebrow':    "Cortometraje Narrativo",
      'tst.sub':        "Cortometraje narrativo independiente producido con un equipo freelance fuera de una estructura universitaria o de red.",
      'tst.card.format':"Cortometraje de ficción",
      'tst.card.focus': "Producción, coordinación en set, flujo de trabajo de cine independiente",
      'tst.overview':   "The Stories We Tell Ourselves representa mi trabajo de producción independiente, donde el productor tiene que crear suficiente estructura para que el equipo creativo realice un trabajo sólido. El proyecto requirió coordinación, comunicación y seguimiento práctico desde la preproducción hasta la producción.",
      'tst.b1':  "Produje un cortometraje narrativo independiente con un equipo creativo freelance.",
      'tst.b2':  "Construí el cronograma de producción, gestioné la comunicación del equipo y manejé la logística práctica de principio a fin.",
      'tst.b3':  "Dirigí la logística en set y mantuve el rodaje en horario.",
      'tst.b4':  "Entregué un cortometraje terminado bajo las limitaciones de la producción independiente.",
      'tst.detail.cat': "Narrativa / Drama",
      'tst.detail.ctx': "Producción de cortometraje narrativo freelance",
      'tst.detail.str': "Producción independiente, logística creativa, comunicación en set",
      'tst.context':    "Producción independiente con un equipo freelance — sin apoyo institucional, sin infraestructura. Construida desde cero y entregada.",
      'tst.cap1':  "Fotograma de producción de The Stories We Tell Ourselves.",
      'tst.cta.text':   "Vuelve a la página de producción para ver más trabajo de broadcast, narrativa y televisión.",

      /* ── Zona Latina Chile ───────────────── */
      'zl.eyebrow':    "Santiago, Chile",
      'zl.sub':        "Experiencia como asistente de producción con Zona Latina / TVI America en Santiago, Chile, abarcando televisión de variedades en vivo y de estilo de vida. Esta página agrupa Zona de Estrellas y Sabores como una sola pasantía televisiva internacional.",
      'zl.card.title': "Resumen de Pasantía",
      'zl.card.role':  "Asistente de Producción",
      'zl.card.format':"Televisión de variedades en vivo y de estilo de vida",
      'zl.card.focus': "Apoyo en estudio, flujo de trabajo en vivo, producción en español",
      'zl.overview':   "Mi trabajo con Zona Latina / TVI America en Santiago forma parte de una sola experiencia televisiva internacional. A través de Zona de Estrellas y Sabores, obtuve exposición práctica a la producción de estudio en español, al ritmo de un show en vivo y al trabajo de apoyo práctico requerido en set.",
      'zl.b1':  "Apoyé las necesidades de producción en formatos televisivos en español en Santiago, Chile.",
      'zl.b2':  "Asistí con el flujo de trabajo en set, el timing y la comunicación en un entorno profesional de estudio.",
      'zl.b3':  "Trabajé en programación de variedades en vivo y de estilo de vida, adaptándome a las necesidades de cada formato.",
      'zl.b4':  "Desarrollé confianza operando en un contexto de producción internacional con equipos de ritmo rápido y flujos de trabajo en español.",
      'zl.detail.cat': "Producción televisiva internacional",
      'zl.detail.ctx': "Zona Latina / TVI America, Santiago, Chile",
      'zl.detail.str': "Asistencia de producción, adaptabilidad, flujo de trabajo en estudio, medios en español",
      'zl.why':   "Esta experiencia importa porque demuestra que puedo adaptarme a un nuevo país, equipo y ritmo de producción siendo útil en set. También refleja la experiencia televisiva en español y transcultural que define el tipo de productora en que me estoy convirtiendo.",
      'zl.sel.p1.t':   "Zona de Estrellas",
      'zl.sel.p1.d':   "Experiencia en televisión de variedades en vivo en Santiago, Chile.",
      'zl.sel.p2.t':   "Sabores",
      'zl.sel.p2.d':   "Experiencia en producción televisiva de estilo de vida con Zona Latina / TVI America.",
      'zl.cta.text':   "Vuelve a la página de producción para ver el resto del portafolio.",
    }

  };

  /* ─────────────────────────────────────────
     Core API
  ───────────────────────────────────────── */
  var STORAGE_KEY = 'sg-lang';
  var SUPPORTED   = ['en', 'es'];

  function detectBrowserLang() {
    var nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('es') ? 'es' : 'en';
  }

  function getLang() {
    var param = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search).get('lang')
      : null;
    if (param && SUPPORTED.indexOf(param) !== -1) {
      try { localStorage.setItem(STORAGE_KEY, param); } catch(e) {}
      return param;
    }
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch(e) {}
    return detectBrowserLang();
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}
    document.documentElement.lang = lang;
    var url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    history.replaceState({}, '', url.toString());
  }

  function t(key) {
    var lang = getLang();
    var set  = T[lang] || T['en'];
    if (set[key] !== undefined) return set[key];
    if (T['en'][key] !== undefined) return T['en'][key];
    return key;
  }

  /* Walk the DOM and apply data-i18n / data-i18n-html */
  function applyPage() {
    var lang = getLang();
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      el.innerHTML = t(el.dataset.i18nHtml).replace(/\n/g, '<br>');
    });
    /* Update aria-labels that use data-i18n-aria */
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    /* Sync toggle button states */
    document.querySelectorAll('.sg-lang-btn').forEach(function(btn) {
      var isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    /* Propagate lang param to profile-card links (index.html) */
    document.querySelectorAll('a[data-profile-link]').forEach(function(a) {
      var base = a.dataset.profileLink;
      if (!base) return;
      var u = new URL(base, window.location.href);
      if (lang === 'en') {
        u.searchParams.delete('lang');
      } else {
        u.searchParams.set('lang', lang);
      }
      a.href = u.toString();
    });
  }

  /* Build the compact EN · ES switcher and insert it into `container` */
  function buildSwitcher(container) {
    var wrap = document.createElement('div');
    wrap.className = 'sg-lang-switcher';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', t('nav.lang.label'));

    SUPPORTED.forEach(function(code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sg-lang-btn';
      btn.dataset.lang = code;
      btn.textContent = code.toUpperCase();
      btn.setAttribute('aria-pressed', String(getLang() === code));
      btn.addEventListener('click', function() {
        setLang(code);
        applyPage();
        /* Fire custom event so page scripts can react */
        document.dispatchEvent(new CustomEvent('sg:langchange', { detail: { lang: code } }));
      });
      wrap.appendChild(btn);
    });

    container.appendChild(wrap);
    return wrap;
  }

  window.sgI18n = { getLang: getLang, setLang: setLang, t: t, applyPage: applyPage, buildSwitcher: buildSwitcher };

})();
