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
 *   description – 2–4 sentences on the project
 *   quote       – optional short pull-quote about the project's idea
 *   thumb       – inline SVG markup used for the index illustration
 *                 (two groups: .mass = filled massing, .lines = drafting linework)
 */

const PROJECTS = [
  {
    num: "24–01",
    title: "Kiln House",
    typology: "Residential",
    year: "2024",
    location: "Alentejo, Portugal",
    status: "Built",
    program: "Single-family house, ceramics studio",
    siteArea: "3,400 m²",
    description:
      "A rammed-earth house organized around a working kiln. The plan splits living quarters from the studio with a firebreak courtyard, so the ritual of firing pottery is visible from the kitchen table.",
    quote: "The hearth moved outside, and the house grew around it.",
    thumb: `
      <g class="mass">
        <polygon points="60,190 200,110 340,190 340,240 60,240" />
        <rect x="150" y="150" width="50" height="90" opacity="0.55" />
      </g>
      <g class="lines">
        <polyline points="60,190 200,110 340,190" />
        <line x1="60" y1="190" x2="60" y2="240" />
        <line x1="340" y1="190" x2="340" y2="240" />
        <line x1="60" y1="240" x2="340" y2="240" />
        <line x1="150" y1="150" x2="150" y2="240" />
        <line x1="200" y1="150" x2="200" y2="240" />
        <circle cx="285" cy="205" r="10" />
        <line x1="285" y1="195" x2="285" y2="215" />
        <line x1="20" y1="240" x2="20" y2="110" stroke-dasharray="4 4" />
        <line x1="14" y1="110" x2="26" y2="110" />
        <line x1="14" y1="240" x2="26" y2="240" />
      </g>`,
  },
  {
    num: "23–07",
    title: "Riverside Reading Room",
    typology: "Cultural",
    year: "2023",
    location: "Portland, USA",
    status: "Built",
    program: "Public library annex, reading hall, archive",
    siteArea: "980 m²",
    description:
      "A single-span timber hall cantilevered over the flood line. Structure and shelving are the same system — glulam ribs widen into reading nooks, then narrow again to hold the roof.",
    quote: "The books needed a room that could flood beneath them.",
    thumb: `
      <g class="mass">
        <rect x="40" y="150" width="320" height="90" />
        <path d="M40 150 Q200 90 360 150 Z" opacity="0.55" />
      </g>
      <g class="lines">
        <path d="M40 150 Q200 90 360 150" />
        <line x1="40" y1="150" x2="40" y2="240" />
        <line x1="360" y1="150" x2="360" y2="240" />
        <line x1="40" y1="240" x2="360" y2="240" />
        <line x1="100" y1="150" x2="100" y2="240" stroke-dasharray="3 5" />
        <line x1="160" y1="150" x2="160" y2="240" stroke-dasharray="3 5" />
        <line x1="220" y1="150" x2="220" y2="240" stroke-dasharray="3 5" />
        <line x1="280" y1="150" x2="280" y2="240" stroke-dasharray="3 5" />
        <line x1="40" y1="260" x2="360" y2="260" />
        <line x1="40" y1="254" x2="40" y2="266" />
        <line x1="360" y1="254" x2="360" y2="266" />
      </g>`,
  },
  {
    num: "23–02",
    title: "Courtyard Clinic",
    typology: "Civic",
    year: "2023",
    location: "Kumasi, Ghana",
    status: "Built",
    program: "Maternal health clinic, waiting court, staff housing",
    siteArea: "2,100 m²",
    description:
      "An L-shaped clinic wrapped around a shaded waiting court. Cross-ventilation replaces mechanical cooling; the deep veranda is the actual waiting room, and the enclosed spaces are reserved for exams.",
    quote: "The corridor is the clinic. Everything else is a room off it.",
    thumb: `
      <g class="mass">
        <rect x="50" y="120" width="90" height="120" />
        <rect x="50" y="200" width="260" height="40" />
      </g>
      <g class="lines">
        <rect x="50" y="120" width="90" height="120" />
        <rect x="50" y="200" width="260" height="40" />
        <line x1="140" y1="150" x2="300" y2="150" stroke-dasharray="2 5" />
        <line x1="90" y1="120" x2="90" y2="80" />
        <line x1="84" y1="80" x2="96" y2="80" />
        <path d="M180 220 h20 M220 220 h20 M260 220 h20" />
        <circle cx="200" cy="175" r="18" stroke-dasharray="3 3" />
      </g>`,
  },
  {
    num: "22–11",
    title: "Threshold Pavilion",
    typology: "Pavilion",
    year: "2022",
    location: "Kyoto, Japan",
    status: "Competition — 1st Place",
    program: "Tea pavilion and garden threshold",
    siteArea: "140 m²",
    description:
      "A single deep eave held on four columns, sized to the act of removing one's shoes. The roof plane tilts a half-degree toward the garden so rain becomes part of the approach sequence.",
    quote: "One roof, four columns, and a half-degree of weather.",
    thumb: `
      <g class="mass">
        <rect x="90" y="190" width="220" height="12" opacity="0.6" />
        <rect x="85" y="90" width="230" height="14" />
      </g>
      <g class="lines">
        <rect x="85" y="90" width="230" height="14" />
        <line x1="110" y1="104" x2="110" y2="200" />
        <line x1="290" y1="104" x2="290" y2="200" />
        <line x1="150" y1="104" x2="150" y2="200" />
        <line x1="250" y1="104" x2="250" y2="200" />
        <line x1="90" y1="220" x2="310" y2="220" />
        <line x1="200" y1="90" x2="200" y2="60" stroke-dasharray="3 4" />
        <path d="M190 60 h20" />
        <text x="205" y="55" font-size="9">0.5°</text>
      </g>`,
  },
  {
    num: "21–05",
    title: "Terraced Studios",
    typology: "Residential",
    year: "2021",
    location: "Medellín, Colombia",
    status: "Built",
    program: "Six live-work units, shared roof garden",
    siteArea: "1,850 m²",
    description:
      "Six studios stepped up a hillside so every unit keeps a private terrace and a view line to the valley. Structure is exposed concrete frame; infill walls are left to each tenant to finish.",
    quote: "The section did the planning. The plan just followed it downhill.",
    thumb: `
      <g class="mass">
        <rect x="60" y="200" width="280" height="40" />
        <rect x="90" y="160" width="220" height="40" opacity="0.75" />
        <rect x="120" y="120" width="160" height="40" opacity="0.55" />
      </g>
      <g class="lines">
        <rect x="60" y="200" width="280" height="40" />
        <rect x="90" y="160" width="220" height="40" />
        <rect x="120" y="120" width="160" height="40" />
        <line x1="60" y1="260" x2="340" y2="260" stroke-dasharray="4 4" />
        <line x1="60" y1="254" x2="60" y2="266" />
        <line x1="340" y1="254" x2="340" y2="266" />
        <line x1="150" y1="120" x2="150" y2="90" stroke-dasharray="2 4" />
        <line x1="144" y1="90" x2="156" y2="90" />
      </g>`,
  },
  {
    num: "20–03",
    title: "Silo Exchange",
    typology: "Adaptive Reuse",
    year: "2020",
    location: "Rotterdam, Netherlands",
    status: "Built",
    program: "Grain silo converted to co-working exchange, café",
    siteArea: "1,100 m² (existing structure)",
    description:
      "Twelve concrete silos re-cored into a vertical circulation spine, with floor plates threaded between the untouched shells. The original hopper geometry sets the ceiling height on every level.",
    quote: "We didn't add a building. We subtracted one from inside a bigger one.",
    thumb: `
      <g class="mass">
        <rect x="90" y="80" width="40" height="160" rx="18" />
        <rect x="140" y="80" width="40" height="160" rx="18" opacity="0.8" />
        <rect x="190" y="80" width="40" height="160" rx="18" opacity="0.6" />
        <rect x="240" y="80" width="40" height="160" rx="18" opacity="0.8" />
        <rect x="290" y="80" width="40" height="160" rx="18" />
      </g>
      <g class="lines">
        <rect x="90" y="80" width="40" height="160" rx="18" />
        <rect x="140" y="80" width="40" height="160" rx="18" />
        <rect x="190" y="80" width="40" height="160" rx="18" />
        <rect x="240" y="80" width="40" height="160" rx="18" />
        <rect x="290" y="80" width="40" height="160" rx="18" />
        <line x1="70" y1="80" x2="70" y2="240" stroke-dasharray="3 5" />
        <line x1="64" y1="80" x2="76" y2="80" />
        <line x1="64" y1="240" x2="76" y2="240" />
      </g>`,
  },
];
