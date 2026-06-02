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
