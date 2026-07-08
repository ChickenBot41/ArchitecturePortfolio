# Nora Kessler — Architecture Portfolio

A single-page architecture portfolio site. No build step, no framework,
no dependencies — just HTML, CSS, and vanilla JS, so it runs straight
on GitHub Pages.

**Design concept:** the site borrows its structure from a drawing set.
Projects are listed like sheets in an index (catalog numbers, typology,
year); hovering a project reveals a hand-off between its massing and
its blueprint linework in the preview panel.

## File structure

```
architecture-portfolio/
├── index.html          ← page structure (hero, work index, about, contact)
├── css/
│   └── styles.css      ← all styling, design tokens at the top
├── js/
│   ├── projects-data.js← YOUR PROJECT CONTENT — edit this file
│   └── main.js         ← rendering + interactions, shouldn't need edits
└── README.md
```

## Quick start — publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `my-portfolio`).
2. Upload the contents of this folder to the repository (drag-and-drop
   on github.com works fine, or use git):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a
   branch`, branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a URL, usually
   `https://YOUR-USERNAME.github.io/my-portfolio/`, live within a minute
   or two.

## Customizing content

**Everything you need to change project content lives in
`js/projects-data.js`.** Each project is one object in the `PROJECTS`
array:

```js
{
  num: "24–01",
  title: "Kiln House",
  typology: "Residential",
  year: "2024",
  location: "Alentejo, Portugal",
  status: "Built",
  program: "Single-family house, ceramics studio",
  siteArea: "3,400 m²",
  description: "…",
  quote: "…",       // optional
  thumb: `<svg …>`  // see below
}
```

Add, remove, or reorder objects to change the index — the page
re-renders from this array automatically.

### Replacing the placeholder illustrations with real photos

Each project currently ships with a small inline line-drawing
placeholder (the `thumb` field) so the site works out of the box with
no images required. To use real project photography instead:

1. Add your images to a folder, e.g. `assets/projects/kiln-house.jpg`.
2. In `js/main.js`, inside `showPreview()`, swap the SVG injection for
   an `<img>` tag pointing at your photo, or keep the SVG as a hover
   state and crossfade to a photo underneath — either works with the
   existing CSS in `.work-preview`.

### Editing text elsewhere on the page

- **Name / hero copy / bio / contact details** — edit directly in
  `index.html`, they're plain text, not data-driven.
- **Colors, type, spacing** — all defined as CSS custom properties at
  the top of `css/styles.css` under `:root`. Change a value there and
  it updates everywhere it's used.

## Browser support

Vanilla HTML/CSS/JS with no build tooling — works in all current
browsers. Layout gracefully collapses to a single column below 900px
and shows a full-screen menu below 640px. Animations respect
`prefers-reduced-motion`.

## License

This template is yours to use, modify, and publish freely.
