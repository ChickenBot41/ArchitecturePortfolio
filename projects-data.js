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
  },
];
