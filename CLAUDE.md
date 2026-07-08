# ArchitecturePortfolio — Project Instructions

## What this is
A single-page architecture portfolio site: vanilla HTML/CSS/JS, no
framework, no build step, deployed on GitHub Pages.

- `index.html` — page structure (hero, work index, about, contact)
- `styles.css` — all styling; design tokens live at the top under `:root`
- `projects-data.js` — project content (the only file with "my content" in it)
- `main.js` — renders the project index and handles interactions

## Who you're working with
I'm an architecture student, not a CS student. I know how to think in
systems, structure, and precedent (that's what architecture school
trains), but I'm picking up programming and AI tooling from close to
zero. Treat this repo as a learning project, not just a deliverable.

## How I want you to work — teaching mode by default

1. **Narrate the "why," briefly, before the "what."** When you introduce
   a concept I haven't clearly used before in this repo (e.g. closures,
   event delegation, the DOM, CSS specificity, `async`/`await`, git
   branching), give me 2-4 sentences on what it is and why it's the
   right tool here — *before* or alongside the code, not buried in a
   comment I'll skim past.
2. **Use architecture analogies where they genuinely fit** — plan vs.
   section vs. detail, load path, structural vs. finish work, precedent
   study — but don't force one if it doesn't actually clarify anything.
   A bad analogy is worse than a plain explanation.
3. **Prefer small, reviewable diffs over big rewrites**, especially for
   anything you're introducing for the first time. I want to be able to
   read the diff and follow the logic, not just trust that it works.
4. **After finishing a task, give me a short "what you'd search to learn
   more" pointer** — one or two terms (e.g. "CSS Grid `minmax()`",
   "event delegation") I could look up if I want to go deeper.
5. **Don't dumb down the code itself.** Write it the way you'd write it
   for a real project. The teaching is in the explanation layer, not in
   using worse patterns so they're easier to read.
6. If I ask you to just make a change with no explanation, that's fine —
   say so and I'll ask for the walkthrough separately. Default is
   explain-as-you-go; opt-out is one sentence away.

## Conventions
- No build tooling, no bundler, no npm dependencies for the site itself
  — keep it that way unless I explicitly ask to add tooling.
- Keep `projects-data.js` as the single source of truth for project
  content; don't hardcode project details into `index.html`.
- Commit messages: short, imperative, no fluff ("Add dark mode toggle",
  not "Added a dark mode toggle feature for users").
- Before pushing, tell me what changed in plain language — I'll do the
  `git push` myself unless I ask you to.

## PW (Portfolio Website) rules

"PW" is shorthand for this portfolio website, used in conversation and
below. These rules are permanent — follow them in every session unless
I explicitly say to change one.

### Page terminology
- **Home Page Terminology** — the page that loads when the site's URL
  is opened is always called the "home page."
- **Project Page Terminology** — the page/view shown when a project
  title is clicked is always called the "project page."

### Design rules
- **Sticky Navigation Bar** — a bar must always be fixed to the top of
  the home page, staying visible while scrolling, containing: the
  website name, and links to Work, About, and Contact.
- **Opaque Navigation Bar** — the navigation bar's background must be
  fully solid (100% opacity) — no page content should show through it.
- **Two-Font System** — the site uses exactly two font families:
  Roboto as the primary font (used for nearly everything — headings,
  body, labels), and Roboto Serif as a sparing complementary accent
  (currently used only for pull-quotes). Do not introduce a third
  font family.
- **Modular Spacing System** — all margin, padding, and gap values
  must use one of the `--space-1` through `--space-12` tokens defined
  in `styles.css` (a scale from 4px to 120px). Never hardcode a raw
  pixel value for spacing between elements. Border widths and
  structural component widths (e.g. grid column sizes) are a separate
  concern and are not part of this scale.

## Useful skills in this repo
- `/explain-concept` — deep-dive on the CS/programming idea behind a
  piece of code, with an architecture analogy.
- `/design-review` — critiques the current visual design against real
  design principles (not just "looks fine"), and flags anything that
  reads as generic/AI-templated.
