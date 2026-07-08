---
name: design-review
description: Critique the current visual design of the site against real design principles — distinctiveness, typography, hierarchy, restraint — and flag anything that reads as generic or AI-templated. Use when the user asks for design feedback, a design review, or "does this look good/professional."
allowed-tools: Read, Grep, Glob
disable-model-invocation: false
---

# Design Review

Review this site's current design the way a design lead at a small
studio would review a junior designer's work: specific, honest,
constructive, and allergic to generic defaults.

## What to check

1. **Read the actual files first** — `styles.css` (design tokens under
   `:root`), `index.html` (structure/copy), `projects-data.js` (content).
   Don't review from memory of what the site used to look like.

2. **Distinctiveness check.** AI-generated design right now clusters
   around a few defaults: warm cream + high-contrast serif + terracotta
   accent; near-black + single neon accent; broadsheet hairline-rule
   layouts. Does the current design read as one of these defaults, or
   does it make choices specific to *this* subject (architecture,
   drawing sets, blueprints, precedent)? Say plainly if something has
   drifted toward generic.

3. **Typography.** Is there an intentional type scale? Are the display
   and body faces paired deliberately, or just "a serif and a sans"?
   Is anything set at a default browser size or weight that should be
   intentional instead?

4. **Hierarchy and structure.** Does the layout guide the eye in an
   order that matches how a visitor should actually read this content?
   Are structural devices (numbering, labels, dividers) meaningful, or
   decorative?

5. **Restraint.** Is there one clear signature moment, with everything
   else quiet around it — or is attention spread thin across too many
   "cool" details? Flag anything that should be cut.

6. **Consistency.** Do colors, spacing, and type actually trace back to
   the tokens in `:root`, or has anything drifted into one-off magic
   numbers?

7. **Accessibility basics.** Visible focus states, color contrast on
   text, `prefers-reduced-motion` respected, alt text on meaningful
   images.

## Output format

Give feedback as a short prioritized list:
- **Keep** — the 1-2 things that are working and shouldn't change
- **Fix** — specific, actionable issues, each with *why* it matters and
  roughly *how* to fix it (file + property, not just "improve spacing")
- **Consider** — optional stretch ideas, clearly marked as optional

Don't rewrite the CSS as part of this review unless asked — this is a
critique pass, not an implementation pass. Keep the whole review
readable in under a minute.
