/**
 * PROJECT DATA
 * ------------
 * This is the only file you need to edit to update your portfolio content.
 * Add, remove, or reorder objects in the PROJECTS array below.
 *
 * Fields:
 *   num         – catalog number, convention is YY–sequence (e.g. "24–01")
 *   title       – project name
 *   typology    – building type (Residential, Cultural, Civic, etc.)
 *   year        – completion or design year
 *   location    – city, country
 *   status      – "Built", "Under Construction", "Competition", "Unbuilt"
 *   program     – short program description
 *   siteArea    – e.g. "1,200 m²"
 *   image       – square placeholder photo URL used by the home page's
 *                 work gallery (swap for real project photography later)
 *   slug        – URL-safe id used by project.html (project.html?id=slug)
 *   gallery     – array of { src, size } shown on the project page,
 *                 scrolling below the description. size is one of
 *                 "wide" | "tall" | "square" | "large" — see the
 *                 .project-gallery grid in styles.css
 *   description – 2–4 sentences on the project
 *   quote       – optional short pull-quote about the project's idea
 *   thumb       – inline SVG markup used for the index illustration
 *                 (two groups: .mass = filled massing, .lines = drafting linework)
 */

const PROJECTS = [
  {
    num: "24–01",
    title: "Pueblo Train Station",
    typology: "Transportation",
    year: "2024",
    location: "Pueblo, Colorado",
    status: "Academic Project",
    program: "Regional Amtrak station, transit plaza, sustainable site landscape",
    siteArea: "≈196,000 sq ft (4.5-acre site)",
    image: "IMAGES/pueblo-train-station/building-view.jpg",
    slug: "pueblo-train-station",
    gallery: [
      { src: "IMAGES/pueblo-train-station/final-drawing.jpg", size: "large" },
      { src: "IMAGES/pueblo-train-station/building-view.jpg", size: "wide" },
      { src: "IMAGES/pueblo-train-station/platform-view.jpg", size: "wide" },
      { src: "IMAGES/pueblo-train-station/interior-view.jpg", size: "square" },
      { src: "IMAGES/pueblo-train-station/site-plan.jpg", size: "square" },
      { src: "IMAGES/pueblo-train-station/area-plan.jpg", size: "square" },
      { src: "IMAGES/pueblo-train-station/wall-section.jpg", size: "square" },
    ],
    description:
      "A new stop on the existing Amtrak line, conceived as a civic hub that reflects Pueblo's rich architectural history. Structural steel columns and beams form the station's primary frame, an homage to the city's legacy as a producer of architectural steel, while a curtain wall is wrapped in a secondary perforated steel screen whose perforation density is tuned to the sun path, layering shifting light and shadow across the interior through the day. The design extends past the building envelope to the surrounding site, including an accessible bus and car drop-off, outdoor seating, and an ADA-compliant route to the platform. Sustainable strategies are integrated throughout: a stormwater detention pond manages heavy runoff, an accessible green roof carries photovoltaic panels, and the perforated facade doubles as natural ventilation, an acoustic buffer, and a thermal moderator through winter.",
    quote:
      "The screen is cut from the same material Pueblo once shipped by rail — sized, this time, to the path of the sun.",
    thumb: `
      <g class="mass">
        <rect x="50" y="110" width="300" height="18" opacity="0.85" />
        <rect x="50" y="128" width="300" height="70" opacity="0.35" />
      </g>
      <g class="lines">
        <rect x="50" y="110" width="300" height="18" />
        <line x1="80" y1="128" x2="80" y2="220" />
        <line x1="150" y1="128" x2="150" y2="220" />
        <line x1="220" y1="128" x2="220" y2="220" />
        <line x1="290" y1="128" x2="290" y2="220" />
        <line x1="50" y1="220" x2="350" y2="220" />
        <path d="M60 90 Q200 40 340 90" stroke-dasharray="4 4" />
        <circle cx="120" cy="150" r="4" />
        <circle cx="160" cy="150" r="4" />
        <circle cx="200" cy="150" r="4" />
        <circle cx="240" cy="150" r="4" />
        <circle cx="280" cy="150" r="4" />
      </g>`,
  },
  {
    num: "25–01",
    title: "Rome's Heritage Machine",
    typology: "Cultural",
    year: "2025",
    location: "Rome, Italy",
    status: "Academic Project",
    program: "Museum, raised public archive, private research facility, education space",
    siteArea: "≈24,000 sq ft building on a 3.5-acre site",
    image: "IMAGES/romes-heritage-machine/image-2.jpg",
    slug: "romes-heritage-machine",
    gallery: [
      { src: "IMAGES/romes-heritage-machine/image-2.jpg", size: "wide" },
      { src: "IMAGES/romes-heritage-machine/parti-diagram.jpg", size: "wide" },
      { src: "IMAGES/romes-heritage-machine/ground-floor-plan.jpg", size: "wide" },
      { src: "IMAGES/romes-heritage-machine/site-floor-plan.jpg", size: "tall" },
      { src: "IMAGES/romes-heritage-machine/image-6.jpg", size: "wide" },
      { src: "IMAGES/romes-heritage-machine/image-3.jpg", size: "tall" },
      { src: "IMAGES/romes-heritage-machine/image-4.jpg", size: "square" },
      { src: "IMAGES/romes-heritage-machine/final-sections.jpg", size: "wide" },
      { src: "IMAGES/romes-heritage-machine/wall-detail.jpg", size: "wide" },
    ],
    description:
      "A cultural museum set directly alongside the Aqueduct Claudio, working double duty as a public gathering place and a private research facility for archaeologists studying finds recovered on site. Three concrete cores lift a public archive above the ground plane, echoing the way the aqueduct's own channel was carried on a colonnade — freeing the ground below for public gathering, shaded from the sun. Cast in concrete and pigmented red as a nod to ancient Roman brick, the building bends to follow the existing street while running parallel to the aqueduct itself.",
    quote: "The aqueduct once carried water on a colonnade. Here, the colonnade carries an archive instead.",
    thumb: `
      <g class="mass">
        <rect x="60" y="90" width="280" height="20" opacity="0.85" />
        <rect x="90" y="110" width="24" height="80" opacity="0.55" />
        <rect x="188" y="110" width="24" height="80" opacity="0.55" />
        <rect x="286" y="110" width="24" height="80" opacity="0.55" />
      </g>
      <g class="lines">
        <rect x="60" y="90" width="280" height="20" />
        <line x1="90" y1="110" x2="90" y2="190" />
        <line x1="114" y1="110" x2="114" y2="190" />
        <line x1="188" y1="110" x2="188" y2="190" />
        <line x1="212" y1="110" x2="212" y2="190" />
        <line x1="286" y1="110" x2="286" y2="190" />
        <line x1="310" y1="110" x2="310" y2="190" />
        <line x1="60" y1="190" x2="340" y2="190" stroke-dasharray="4 4" />
        <path d="M40 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
        <path d="M90 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
        <path d="M140 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
        <path d="M190 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
        <path d="M240 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
        <path d="M290 70 a20 20 0 0 1 40 0" stroke-dasharray="2 3" />
      </g>`,
  },
  {
    num: "23–01",
    title: "De Menil Museum Precedent Study",
    typology: "Precedent Study",
    year: "2023",
    location: "Houston, Texas",
    status: "Academic Project",
    program: "Site, section, and detail models, plus a full walkthrough presentation",
    image: "IMAGES/de-menil-museum-precedent-study/detail-model-01.jpg",
    slug: "de-menil-precedent-study",
    gallery: [
      { src: "IMAGES/de-menil-museum-precedent-study/detail-model-01.jpg", size: "wide" },
      { src: "IMAGES/de-menil-museum-precedent-study/section-model.jpg", size: "wide" },
      { src: "IMAGES/de-menil-museum-precedent-study/site-model.jpg", size: "tall" },
      { src: "IMAGES/de-menil-museum-precedent-study/space-frame-01.jpg", size: "wide" },
      { src: "IMAGES/de-menil-museum-precedent-study/space-frame-02.jpg", size: "wide" },
      { src: "IMAGES/de-menil-museum-precedent-study/detail-model-03.jpg", size: "wide" },
      { src: "IMAGES/de-menil-museum-precedent-study/detail-model-roof.jpg", size: "wide" },
    ],
    description:
      "A precedent study built around Renzo Piano's Menil Collection in Houston, assigned to trace how architects fold daylighting and structure into a single design move. Rather than a drawing set, the assignment asked for three physical models plus a walkthrough presentation carrying the same idea from site to construction detail. The Menil's defining move is its roof: curved ferrocement \"leaves,\" cast to a profile tuned to bounce north light rather than pass it straight through, carried on a steel space-frame truss that reads almost like furniture inside the gallery below. The site model studies the building's massing and bay rhythm from a distance; the long section model cuts through a full run of galleries to show the trusses repeating down the building's length; and the detail models isolate a single leaf-and-truss bay at a large enough scale to show exactly how the curved leaf, the space-frame, and the column meet.",
    quote: "The roof doesn't block the sun here — it teaches the room how much of it to let in.",
    thumb: `
      <g class="mass">
        <path d="M281.6,170.3 L262.7,161.8 L248.1,151.1 L241.7,151.1 L238.6,154.9 L233.6,156.7 L206.4,159.0 L185.0,157.7 L178.7,155.7 L171.5,151.1 L164.9,151.1 L158.0,170.3 L141.6,199.4 L115.6,234.6 L97.1,255.0 L101.4,259.6 L121.5,238.5 L157.0,195.1 L169.2,184.1 L182.7,175.9 L199.0,170.3 L220.8,167.3 L253.7,168.3 L270.2,171.6 L279.1,174.9 Z" />
        <path d="M202.8,67.9 L200.0,71.3 L199.8,76.8 L185.5,110.9 L174.8,131.8 L164.9,147.3 L171.8,147.2 L190.4,110.9 L190.6,118.0 L194.1,124.9 L198.7,128.7 L201.8,130.0 L209.1,130.5 L216.0,127.7 L220.8,122.6 L222.6,118.0 L222.8,110.7 L232.2,130.4 L241.2,146.8 L248.3,147.3 L238.9,132.8 L224.9,105.0 L213.8,78.3 L212.9,70.5 L210.9,68.2 L208.1,66.9 Z M203.3,80.1 L204.6,80.2 L204.9,80.6 L206.1,80.7 L208.2,80.6 L209.1,80.1 L209.9,80.2 L211.7,84.8 L212.0,85.2 L212.0,85.7 L212.5,86.3 L212.5,86.8 L213.0,87.6 L214.5,91.8 L214.8,92.1 L215.3,93.9 L216.3,95.6 L216.3,96.1 L216.7,96.4 L216.8,97.4 L217.3,98.0 L217.6,99.4 L218.1,99.8 L218.6,101.5 L219.0,101.8 L219.0,102.3 L219.9,104.1 L219.8,104.5 L219.0,103.8 L219.0,103.5 L217.6,102.2 L213.8,99.5 L211.7,98.9 L211.4,98.5 L210.6,98.5 L208.9,98.0 L204.3,98.0 L204.1,98.2 L204.0,98.0 L202.8,98.5 L202.0,98.5 L201.5,98.9 L200.5,99.0 L200.2,99.4 L198.5,100.0 L198.0,100.5 L197.7,100.5 L197.5,100.8 L197.2,100.8 L195.9,101.8 L194.1,103.6 L193.7,104.3 L193.4,104.5 L193.2,104.3 L193.7,103.5 L193.7,102.8 L194.1,102.5 L194.2,101.8 L194.6,101.7 L195.2,99.4 L195.5,99.2 L197.0,95.2 L197.4,95.1 L197.4,94.4 L197.9,93.7 L197.9,93.3 L198.4,92.4 L198.5,91.6 L198.8,91.3 L199.3,89.6 L199.7,89.3 L199.8,88.3 L200.2,88.1 L200.3,87.2 L201.2,85.7 Z" fill-rule="evenodd" />
      </g>
      <g class="lines">
        <path d="M281.6,170.3 L262.7,161.8 L248.1,151.1 L241.7,151.1 L238.6,154.9 L233.6,156.7 L206.4,159.0 L185.0,157.7 L178.7,155.7 L171.5,151.1 L164.9,151.1 L158.0,170.3 L141.6,199.4 L115.6,234.6 L97.1,255.0 L101.4,259.6 L121.5,238.5 L157.0,195.1 L169.2,184.1 L182.7,175.9 L199.0,170.3 L220.8,167.3 L253.7,168.3 L270.2,171.6 L279.1,174.9 Z" />
        <path d="M202.8,67.9 L200.0,71.3 L199.8,76.8 L185.5,110.9 L174.8,131.8 L164.9,147.3 L171.8,147.2 L190.4,110.9 L190.6,118.0 L194.1,124.9 L198.7,128.7 L201.8,130.0 L209.1,130.5 L216.0,127.7 L220.8,122.6 L222.6,118.0 L222.8,110.7 L232.2,130.4 L241.2,146.8 L248.3,147.3 L238.9,132.8 L224.9,105.0 L213.8,78.3 L212.9,70.5 L210.9,68.2 L208.1,66.9 Z" />
        <path d="M203.3,80.1 L204.6,80.2 L204.9,80.6 L206.1,80.7 L208.2,80.6 L209.1,80.1 L209.9,80.2 L211.7,84.8 L212.0,85.2 L212.0,85.7 L212.5,86.3 L212.5,86.8 L213.0,87.6 L214.5,91.8 L214.8,92.1 L215.3,93.9 L216.3,95.6 L216.3,96.1 L216.7,96.4 L216.8,97.4 L217.3,98.0 L217.6,99.4 L218.1,99.8 L218.6,101.5 L219.0,101.8 L219.0,102.3 L219.9,104.1 L219.8,104.5 L219.0,103.8 L219.0,103.5 L217.6,102.2 L213.8,99.5 L211.7,98.9 L211.4,98.5 L210.6,98.5 L208.9,98.0 L204.3,98.0 L204.1,98.2 L204.0,98.0 L202.8,98.5 L202.0,98.5 L201.5,98.9 L200.5,99.0 L200.2,99.4 L198.5,100.0 L198.0,100.5 L197.7,100.5 L197.5,100.8 L197.2,100.8 L195.9,101.8 L194.1,103.6 L193.7,104.3 L193.4,104.5 L193.2,104.3 L193.7,103.5 L193.7,102.8 L194.1,102.5 L194.2,101.8 L194.6,101.7 L195.2,99.4 L195.5,99.2 L197.0,95.2 L197.4,95.1 L197.4,94.4 L197.9,93.7 L197.9,93.3 L198.4,92.4 L198.5,91.6 L198.8,91.3 L199.3,89.6 L199.7,89.3 L199.8,88.3 L200.2,88.1 L200.3,87.2 L201.2,85.7 Z" />
        <line x1="97.1" y1="273.6" x2="281.6" y2="273.6" stroke-dasharray="3 4" />
        <line x1="97.1" y1="268.6" x2="97.1" y2="278.6" />
        <line x1="281.6" y1="268.6" x2="281.6" y2="278.6" />
        <line x1="83.1" y1="66.9" x2="83.1" y2="259.6" stroke-dasharray="3 4" />
        <line x1="78.1" y1="66.9" x2="88.1" y2="66.9" />
        <line x1="78.1" y1="259.6" x2="88.1" y2="259.6" />
      </g>`,
  },
  {
    num: "24–03",
    title: "Design Diversity Resource",
    typology: "Editorial Design",
    year: "2024",
    location: "University Park, Pennsylvania",
    status: "Published",
    image: "IMAGES/design-diversity-resource/cover.jpg",
    slug: "design-diversity-resource",
    gallery: [
      { src: "IMAGES/design-diversity-resource/cover.jpg", size: "square" },
      { src: "IMAGES/design-diversity-resource/spread-intro-toc.jpg", size: "wide" },
      { src: "IMAGES/design-diversity-resource/spread-lovell-international-school.jpg", size: "wide" },
      { src: "IMAGES/design-diversity-resource/spread-el-blok.jpg", size: "wide" },
      { src: "IMAGES/design-diversity-resource/spread-zeus-eyewear.jpg", size: "wide" },
    ],
    description:
      "A monthly magazine issued to Penn State NOMAS members, with a physical copy also kept in the Stuckeman Library. Built around a \"design for all\" philosophy, the DDR highlights marginalized designers, students and professionals alike, as a record of what's possible for its readers. This first issue was designed while serving as NOMAS secretary.",
    quote: "A resource built to widen the record of who gets called a designer.",
    thumb: `
      <g class="mass">
        <rect x="80" y="80" width="110" height="150" opacity="0.15" />
        <rect x="210" y="80" width="110" height="150" opacity="0.55" />
      </g>
      <g class="lines">
        <rect x="80" y="80" width="110" height="150" />
        <rect x="210" y="80" width="110" height="150" />
        <line x1="200" y1="70" x2="200" y2="240" stroke-dasharray="3 4" />
        <line x1="95" y1="110" x2="175" y2="110" />
        <line x1="95" y1="130" x2="175" y2="130" />
        <line x1="95" y1="150" x2="175" y2="150" />
        <line x1="95" y1="170" x2="160" y2="170" />
      </g>`,
  },
  {
    num: "24–02",
    title: "State College Middle School",
    typology: "Education",
    year: "2024",
    location: "State College, Pennsylvania",
    status: "Academic Project",
    program: "Classrooms, cafeteria and library, auxiliary classrooms, gymnasium",
    siteArea: "≈65,000 sq ft building on an 8-acre forested park site",
    image: "IMAGES/state-college-middle-school/area-plan.jpg",
    slug: "state-college-middle-school",
    gallery: [
      { src: "IMAGES/state-college-middle-school/area-plan.jpg", size: "square" },
      { src: "IMAGES/state-college-middle-school/facade.jpg", size: "square" },
      { src: "IMAGES/state-college-middle-school/entrance-elevation.jpg", size: "wide" },
      { src: "IMAGES/state-college-middle-school/classroom-side.jpg", size: "wide" },
      { src: "IMAGES/state-college-middle-school/section-hvac.jpg", size: "wide" },
    ],
    description:
      "A middle school for the State College Area School District, set in a densely forested public park alongside an existing soccer field and sloped terrain. The design turns inward: four buildings — classrooms, a cafeteria and library, auxiliary classroom space, and a gymnasium — wrap an internal forest courtyard that works as circulation, program space, and a shared view back into the trees for students and faculty. Construction is primarily cross-laminated timber, milled in part from trees cleared during construction, with operable wood louvers that let occupants tune daylight and passive cooling at each window. Geothermal heating supplements the mechanical system, drawing on the site's own climate instead of working against it.",
    quote: "The trees the building displaced came back as its walls.",
    thumb: `
      <g class="mass">
        <rect x="90" y="90" width="220" height="40" opacity="0.7" />
        <rect x="90" y="210" width="220" height="40" opacity="0.7" />
        <rect x="90" y="130" width="60" height="80" opacity="0.7" />
        <rect x="250" y="130" width="60" height="80" opacity="0.7" />
      </g>
      <g class="lines">
        <rect x="90" y="90" width="220" height="160" />
        <rect x="150" y="130" width="100" height="80" stroke-dasharray="3 3" />
        <circle cx="60" cy="70" r="10" />
        <circle cx="340" cy="80" r="14" />
        <circle cx="330" cy="260" r="11" />
        <circle cx="55" cy="255" r="9" />
        <circle cx="200" cy="60" r="8" />
        <circle cx="200" cy="275" r="8" />
      </g>`,
  },
];
