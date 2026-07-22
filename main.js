/**
 * MAIN
 * ----
 * Renders the project index from PROJECTS (see js/projects-data.js)
 * and wires up the hover/click interactions. No build step, no
 * dependencies — safe to open straight from a static host or
 * GitHub Pages.
 */

// Refreshing the home page should always land back on the intro
// animation, not wherever the visitor last scrolled to — browsers
// restore scroll position on reload by default, so that has to be
// turned off explicitly and the page reset to the top.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  syncHeaderHeight();
  setupIntroAnimation();
  renderWorkPhotoGrid();
  setupPreviewPanel();
  renderWorkGallery();
  setupGalleryArrows();
  renderProjectPage();
  setupMobileNav();
  alignWordmarkToGridColumn();
  alignPreviewToGridColumn();
  alignGalleryToGridColumn();
  alignWorkPageElementsToGrid();
  alignHomeSectionsToGrid();
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Every section's height (and the header-clearance for scroll-snap)
// is built around --header-height, but a hardcoded pixel value can
// drift a fraction of a pixel off the header's true rendered height
// (font rendering, zoom, responsive breakpoints) — leaving a hairline
// gap that shows the previous section's background peeking through.
// Measuring it directly keeps every section flush with the header
// exactly, not approximately.
function syncHeaderHeight() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const apply = () => {
    document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
  };
  apply();
  window.addEventListener("resize", apply);
}

/* ---------- Intro block-letter animation ---------- */

// 5x5 pixel-grid letterforms — 1 = falling block, 0 = empty cell
const LETTER_SHAPES = {
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  // Square-cornered bracket, not a rounded "C" — every corner is a
  // full block so the shape stays hard-edged and blocky.
  C: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
};

// Total time from the very first block leaving the top of the screen
// to the very last one landing — deliberately long and deliberate on
// the first visit, like blocks being placed one at a time.
const TOTAL_ANIMATION_MS = 7000;
// Each block's own fall takes this long, eased so it starts slow and
// speeds up toward landing (see the ease-in curve on .letter-block).
const BLOCK_FALL_DURATION_MS = 900;

// Replays (scrolling back up to the top) play the exact same
// choreography, just compressed into ~1.5s instead of ~7.5s — same
// ratio of fall-duration to total time, so nothing about the motion
// itself changes, only its speed.
const REPLAY_SPEED_FACTOR = 1500 / TOTAL_ANIMATION_MS;
const REPLAY_TOTAL_ANIMATION_MS = Math.round(TOTAL_ANIMATION_MS * REPLAY_SPEED_FACTOR);
const REPLAY_BLOCK_FALL_DURATION_MS = Math.round(BLOCK_FALL_DURATION_MS * REPLAY_SPEED_FACTOR);

// Row fall order (used within each column): "A" is the bottom row of
// each letter, "E" is the top row — each column fills from the
// ground up as it falls.
const ROW_FALL_ORDER = ["A", "B", "C", "D", "E"];
// Column fall order: one continuous 1-10 numbering in true left to
// right screen order — column 1 is E's leftmost column, column 5 is
// E's rightmost; column 6 is C's leftmost, column 10 is C's
// rightmost — so the whole animation sweeps left to right.
const COLUMN_FALL_ORDER = Array.from({ length: 10 }, (_, i) => {
  const colInLetter = i % 5; // 0 = leftmost, 4 = rightmost, within its letter
  return {
    label: i + 1,
    letter: i < 5 ? "E" : "C",
    colIndex: colInLetter,
  };
});

let introTimeoutId = null;
let introScrollBound = false;
// Tracks whether the page has actually scrolled away from the very
// top at least once — replay should only fire once the user is fully
// back at scrollY 0, not just mostly back (and not on first load,
// since we're already there then).
let hasScrolledAwayFromTop = false;

function setupIntroAnimation() {
  // Visitors are never trapped on the animation — they can scroll
  // away immediately, even mid-fall, instead of being forced to
  // watch it finish.
  runIntroSequence({ isReplay: false });

  // Replay the whole sequence once the user scrolls all the way back
  // to the top of the page, so revisiting it re-triggers the fall
  // instead of leaving the letters sitting there static forever.
  if (introScrollBound) return;
  introScrollBound = true;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      hasScrolledAwayFromTop = true;
      return;
    }
    if (hasScrolledAwayFromTop && document.body.classList.contains("intro-done")) {
      hasScrolledAwayFromTop = false;
      document.body.classList.remove("intro-done");
      runIntroSequence({ isReplay: true });
    }
  });
}

// Builds (or rebuilds) the falling blocks and schedules the
// "intro-done" flag once the whole sequence has landed. Replays use
// the same cell order and easing as the first run, just compressed
// in time (see REPLAY_SPEED_FACTOR).
function runIntroSequence({ isReplay }) {
  const totalMs = isReplay ? REPLAY_TOTAL_ANIMATION_MS : TOTAL_ANIMATION_MS;
  const fallMs = isReplay ? REPLAY_BLOCK_FALL_DURATION_MS : BLOCK_FALL_DURATION_MS;

  const hosts = { E: document.getElementById("letter-E"), C: document.getElementById("letter-C") };
  Object.values(hosts).forEach((host) => host && (host.innerHTML = ""));

  // Row-major, bottom row first, left to right within each row: every
  // row's ten columns (some empty, skipped) before moving to the next
  // row up — "A1..A10, then B1..B10," and so on.
  const cells = [];
  ROW_FALL_ORDER.forEach((rowLabel, rowPosition) => {
    const rowIndex = ROW_FALL_ORDER.length - 1 - rowPosition; // A = bottom row
    COLUMN_FALL_ORDER.forEach((col) => {
      const host = hosts[col.letter];
      const grid = LETTER_SHAPES[col.letter];
      if (!host || !grid[rowIndex][col.colIndex]) return;
      cells.push({ host, rowIndex, colIndex: col.colIndex, label: `${rowLabel}${col.label}` });
    });
  });

  if (cells.length === 0) {
    document.body.classList.add("intro-done");
    return;
  }

  const delayStep = cells.length > 1 ? (totalMs - fallMs) / (cells.length - 1) : 0;

  cells.forEach((cell, order) => {
    const block = document.createElement("div");
    block.className = "letter-block";
    block.style.gridRowStart = String(cell.rowIndex + 1);
    block.style.gridColumnStart = String(cell.colIndex + 1);
    block.style.setProperty("--fall-delay", `${Math.round(order * delayStep)}ms`);
    block.style.setProperty("--fall-duration", `${fallMs}ms`);
    cell.host.appendChild(block);
  });

  clearTimeout(introTimeoutId);
  introTimeoutId = setTimeout(() => {
    document.body.classList.add("intro-done");
  }, totalMs + 150);
}

/* ---------- Work photo grid ---------- */

// Replaces the old text list entirely — a 3-column photo grid
// reusing the exact same card module as the home page's gallery
// (buildGalleryCard, defined below), just laid out in a plain fluid
// grid instead of a horizontal infinite-loop carousel. Hovering any
// card swaps the blueprint preview panel (see showPreview()) — the
// same interaction the old list rows used to trigger on hover.
function renderWorkPhotoGrid() {
  const grid = document.getElementById("work-photo-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  PROJECTS.forEach((project, index) => {
    const card = buildGalleryCard(project, false);
    card.addEventListener("mouseenter", () => showPreview(index));
    grid.appendChild(card);
  });

  // Prime the preview panel with the first project
  showPreview(0);
}

/* ---------- Preview panel ---------- */

function setupPreviewPanel() {
  const grid = document.getElementById("work-photo-grid");
  if (!grid) return;
  grid.addEventListener("mouseleave", () => showPreview(0));
}

function showPreview(index) {
  const project = PROJECTS[index];
  const svgHost = document.getElementById("preview-svg");
  const numEl = document.getElementById("preview-num");
  const statusEl = document.getElementById("preview-status");
  if (!project || !svgHost) return;

  svgHost.classList.remove("is-active");
  svgHost.innerHTML = project.thumb;
  numEl.textContent = `${project.num} — ${project.title}`;
  statusEl.textContent = project.status;

  // Trigger the blueprint line-draw animation on the next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => svgHost.classList.add("is-active"));
  });
}

/* ---------- Work gallery (home page) ---------- */

// One card module per project — full-bleed square photo, name
// bottom-left, date bottom-right — reused identically for every
// entry so the gallery reads as one cohesive system.
function buildGalleryCard(project, isClone) {
  const card = document.createElement("li");
  card.className = "gallery-card";
  // Clones exist only to give the loop room to scroll into — hide
  // them from screen readers so each project is only announced once.
  if (isClone) card.setAttribute("aria-hidden", "true");
  const tabindex = isClone ? ' tabindex="-1"' : "";
  card.innerHTML = `
    <a class="gallery-card-frame" href="project.html?id=${project.slug}"${tabindex}>
      <div class="gallery-card-photo">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <div class="gallery-card-caption">
          <span class="gallery-card-name">${project.title}</span>
          <span class="gallery-card-date">${project.year}</span>
        </div>
      </div>
    </a>
  `;
  return card;
}

// Width of one card plus one gap — the unit the loop and the arrow
// buttons both move by. Measured from the live DOM/CSS rather than
// duplicated as a magic number, so it never drifts out of sync with
// the actual card size or gap defined in styles.css.
function getGalleryStep(track) {
  const firstCard = track.children[0];
  if (!firstCard) return track.clientWidth;
  const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
  return firstCard.getBoundingClientRect().width + gap;
}

function renderWorkGallery() {
  const track = document.getElementById("work-gallery");
  if (!track || typeof PROJECTS === "undefined") return;

  // Three back-to-back copies of the project list give an infinite
  // loop in either direction: the visible view starts in the middle
  // copy, and drifting into either neighboring copy silently resets
  // back into the equivalent spot in the middle one (see
  // setupInfiniteGalleryLoop), so there's always more to scroll to.
  [0, 1, 2].forEach((copy) => {
    PROJECTS.forEach((project) => track.appendChild(buildGalleryCard(project, copy !== 1)));
  });

  setupInfiniteGalleryLoop(track);
}

// Keeps the track scrolled somewhere within a generous safe zone
// centered on the middle copy of cards — [0.5, 2.5] list-widths, i.e.
// the middle copy plus a half-copy buffer on either side. Only once a
// scroll (dragging, the wheel, or the arrow buttons) actually crosses
// out of that buffer does it jump silently (no animation) back by one
// list-width, so the loop never runs out in either direction.
//
// The buffer matters: thresholds sitting exactly at the middle copy's
// own edges (1x/2x) fire the instant you scroll away from the very
// first or last card in it, cancelling the click before it can even
// animate — that's what made "prev" look stuck on the first project.
// A half-copy of breathing room on each side means correction only
// ever fires deep into a neighboring copy, never on the click that
// just crossed into it.
function setupInfiniteGalleryLoop(track) {
  const oneListWidth = getGalleryStep(track) * PROJECTS.length;
  track.scrollLeft = oneListWidth;

  track.addEventListener("scroll", () => {
    if (track.scrollLeft < oneListWidth * 0.5) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft += oneListWidth;
      requestAnimationFrame(() => { track.style.scrollBehavior = ""; });
    } else if (track.scrollLeft > oneListWidth * 2.5) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft -= oneListWidth;
      requestAnimationFrame(() => { track.style.scrollBehavior = ""; });
    }
  });
}

// Arrow buttons scroll exactly one card (plus its gap) at a time.
function setupGalleryArrows() {
  const gallery = document.querySelector(".gallery");
  const track = document.getElementById("work-gallery");
  const prev = gallery ? gallery.querySelector(".gallery-arrow--prev") : null;
  const next = gallery ? gallery.querySelector(".gallery-arrow--next") : null;
  if (!gallery || !track || !prev || !next) return;

  prev.addEventListener("click", () => track.scrollBy({ left: -getGalleryStep(track), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: getGalleryStep(track), behavior: "smooth" }));

  // Many browsers redirect a plain vertical wheel gesture into
  // horizontal scroll for horizontal-only overflow elements like this
  // track — which silently eats the scroll instead of letting the
  // page continue past Work, feeling like a second, stuck stop.
  // A pure vertical gesture (no horizontal delta) should always
  // scroll the page, never the card row.
  track.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY !== 0 && e.deltaX === 0) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY });
      }
    },
    { passive: false }
  );
}

/* ---------- Project page (project.html) ---------- */

// project.html is one template shared by every project — the actual
// content comes from PROJECTS, matched via the ?id= slug in the URL.
// This keeps projects-data.js the single source of truth instead of
// hand-writing six near-identical HTML files.
function renderProjectPage() {
  const heroInner = document.getElementById("project-hero-inner");
  const galleryList = document.getElementById("project-gallery");
  if (!heroInner || typeof PROJECTS === "undefined") return;

  const slug = new URLSearchParams(location.search).get("id");
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    document.querySelector(".project-hero").innerHTML = `
      <div class="project-not-found">
        <p class="project-eyebrow">Not found</p>
        <h1 class="project-title">No project here</h1>
        <p class="project-lede">
          <a href="work.html">Back to Selected Work →</a>
        </p>
      </div>
    `;
    if (galleryList) galleryList.remove();
    return;
  }

  document.title = `${project.title} — Eric Chen`;

  heroInner.innerHTML = `
    <p class="project-eyebrow">${project.num} — ${project.typology} — ${project.year}</p>
    <h1 class="project-title">${project.title}</h1>
    <p class="project-lede">${project.description}</p>
    ${project.quote ? `<blockquote class="project-quote">${project.quote}</blockquote>` : ""}
    <dl class="project-meta">
      <div><dt>Status</dt><dd>${project.status}</dd></div>
      <div><dt>Program</dt><dd>${project.program}</dd></div>
      <div><dt>Site area</dt><dd>${project.siteArea}</dd></div>
      <div><dt>Location</dt><dd>${project.location}</dd></div>
    </dl>
  `;

  if (galleryList && Array.isArray(project.gallery)) {
    project.gallery.forEach((photo) => {
      const item = document.createElement("li");
      item.className = `project-gallery-item size-${photo.size}`;
      item.innerHTML = `<img src="${photo.src}" alt="${project.title}" loading="lazy" />`;
      galleryList.appendChild(item);
    });
  }
}

/* ---------- Mobile nav ---------- */

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Header wordmark (every page) ---------- */

// Snaps "Eric Chen" in the fixed header onto lettered column E
// (index 4) of the fluid --site-unit grid — same live-measured
// margin-left technique used everywhere else in this file. .wordmark
// is a flex child of .site-header, so (unlike the CSS Grid "stretch"
// issue solved elsewhere) a plain margin-left works here without
// needing any extra override — flex layout doesn't have that quirk.
// Runs on every page, since the header markup is identical on all of
// them and .site-header spans the full viewport width starting at
// its own left edge (position: fixed; left: 0), so no section
// reference is needed the way work.html's/home page's snaps needed
// their own section's bounding rect.
function alignWordmarkToGridColumn() {
  const wordmark = document.querySelector(".wordmark");
  if (!wordmark) return;

  const E_COLUMN_INDEX = 4; // A=0, B=1, C=2, D=3, E=4

  const align = () => {
    const GRID_STEP = getSiteUnit(document.documentElement);
    const targetLeftX = E_COLUMN_INDEX * GRID_STEP;

    const wordmarkRect = wordmark.getBoundingClientRect();
    const currentMarginLeft = parseFloat(getComputedStyle(wordmark).marginLeft) || 0;
    wordmark.style.marginLeft = `${currentMarginLeft + (targetLeftX - wordmarkRect.left)}px`;
  };

  align();
  window.addEventListener("resize", align);
}

/* ---------- Work layout column + alignment grid overlay (work.html) ---------- */

// Reads --site-unit's live computed pixel value off any element (it's
// defined on :root, so it inherits everywhere) — the grid step is
// fluid (a clamp(), see :root in styles.css), so this can't be a
// fixed constant like the old GRID_STEP = 32; it has to be re-read
// each time, since it changes as the viewport resizes.
function getSiteUnit(el) {
  return parseFloat(getComputedStyle(el).getPropertyValue("--site-unit")) || 32;
}

// Snaps .work-preview's right edge onto a specific lettered column
// line of the alignment grid ("BC") instead of an arbitrary fluid
// offset. Column letters run A-Z (0-25), then AA, AB… (26+), then
// BA, BB, BC… (52+) — "BC" is index 54 (52 + the 2 letters from A to
// C). Measured live with getBoundingClientRect() rather than a fixed
// calc(), since the grid's fluid column widths mean the pixel
// position of "BC" moves as the viewport resizes — a plain CSS value
// can't track that, only a live measurement can.
function alignPreviewToGridColumn() {
  const workPage = document.querySelector(".work-page");
  const preview = document.querySelector(".work-preview");
  if (!workPage || !preview) return;

  const BC_COLUMN_INDEX = 54; // A=0 … Z=25, AA=26 … AZ=51, BA=52, BB=53, BC=54

  const alignToColumn = () => {
    // .work-preview is display:none below the 1400px breakpoint —
    // getBoundingClientRect() on a hidden element returns all zeros,
    // which would otherwise compute a nonsense offset; skip until
    // it's actually visible again.
    if (getComputedStyle(preview).display === "none") return;

    const GRID_STEP = getSiteUnit(workPage);
    const pageRect = workPage.getBoundingClientRect();
    const targetRightEdgeX = pageRect.left + BC_COLUMN_INDEX * GRID_STEP;

    const previewRect = preview.getBoundingClientRect();
    // .work-preview is now a plain block box (no longer a grid item
    // with justify-self: end), so it's left-anchored by default —
    // margin-left shifts its rendered position, margin-right no
    // longer does anything (confirmed empirically: changing
    // margin-right produced zero movement once it left the grid;
    // margin-left moved it immediately).
    const currentMarginLeft = parseFloat(getComputedStyle(preview).marginLeft) || 0;
    const delta = targetRightEdgeX - previewRect.right;

    preview.style.marginLeft = `${currentMarginLeft + delta}px`;
  };

  alignToColumn();
  window.addEventListener("resize", alignToColumn);
}

// Snaps the leftmost edge of .work-photo-grid onto lettered column
// "H" of the alignment grid (index 7: A=0, B=1, C=2, D=3, E=4, F=5,
// G=6, H=7) — same live-measurement approach as
// alignPreviewToGridColumn(), for
// the same reason: the grid's column widths are fluid, so a fixed
// calc() can't reliably land on an arbitrary lettered line.
function alignGalleryToGridColumn() {
  const workPage = document.querySelector(".work-page");
  const gallery = document.querySelector(".work-photo-grid");
  if (!workPage || !gallery) return;

  const H_COLUMN_INDEX = 7; // A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7

  const alignToColumn = () => {
    const GRID_STEP = getSiteUnit(workPage);
    const pageRect = workPage.getBoundingClientRect();
    const targetLeftEdgeX = pageRect.left + H_COLUMN_INDEX * GRID_STEP;

    const galleryRect = gallery.getBoundingClientRect();
    const currentMarginLeft = parseFloat(getComputedStyle(gallery).marginLeft) || 0;
    const delta = targetLeftEdgeX - galleryRect.left;

    gallery.style.marginLeft = `${currentMarginLeft + delta}px`;
  };

  alignToColumn();
  window.addEventListener("resize", alignToColumn);
}

// Snaps four more elements onto specific lettered/numbered alignment
// grid lines, the same live-measured way as the two functions above
// (margin, not top/left/right — a sticky element's inset properties
// only define its scroll-stuck threshold, they don't shift its
// static/resting position the way margin does; see
// alignPreviewToGridColumn()'s notes on justify-self for the
// horizontal-axis version of this same lesson):
//   - .section-head: left edge -> column H (A=0, B=1, C=2, D=3, E=4,
//     F=5, G=6, H=7), bottom edge -> row 10
//   - .work-photo-grid: top edge -> row 12
//   - .work-preview: top edge -> row 12
function alignWorkPageElementsToGrid() {
  const workPage = document.querySelector(".work-page");
  const sectionHead = document.querySelector(".section-head");
  const gallery = document.querySelector(".work-photo-grid");
  const preview = document.querySelector(".work-preview");
  if (!workPage) return;

  const H_COLUMN_INDEX = 7; // A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7
  const ROW_10_INDEX = 9; // row label "10" sits at i=9 (labels are 1-based)
  const ROW_12_INDEX = 11; // row label "12" sits at i=11

  const nudgeMargin = (el, property, currentValue, targetValue) => {
    const current = parseFloat(getComputedStyle(el)[property]) || 0;
    el.style[property] = `${current + (targetValue - currentValue)}px`;
  };

  const align = () => {
    const GRID_STEP = getSiteUnit(workPage);
    const pageRect = workPage.getBoundingClientRect();

    if (sectionHead) {
      // .section-head has its own padding-left (a fluid clamp, see
      // .work-page .section-head in styles.css) — snapping the box's
      // own left edge to column H would still leave the actual
      // visible text sitting padding-left further right, looking
      // unaligned even though the box technically lines up. Target
      // where the text starts (box left + padding-left) instead.
      const paddingLeft = parseFloat(getComputedStyle(sectionHead).paddingLeft) || 0;
      const targetTextStartX = pageRect.left + H_COLUMN_INDEX * GRID_STEP;
      const targetBoxLeftX = targetTextStartX - paddingLeft;
      const headRect = sectionHead.getBoundingClientRect();
      nudgeMargin(sectionHead, "marginLeft", headRect.left, targetBoxLeftX);

      // re-measure after the horizontal nudge — a left shift alone
      // shouldn't move the bottom edge, but the two are set via
      // separate inline styles, so measuring fresh avoids relying on
      // that assumption
      const targetBottomY = pageRect.top + ROW_10_INDEX * GRID_STEP;
      const headRectAfter = sectionHead.getBoundingClientRect();
      nudgeMargin(sectionHead, "marginTop", headRectAfter.bottom, targetBottomY);
    }

    const targetTopY = pageRect.top + ROW_12_INDEX * GRID_STEP;

    if (gallery) {
      const galleryRect = gallery.getBoundingClientRect();
      nudgeMargin(gallery, "marginTop", galleryRect.top, targetTopY);
    }

    if (preview) {
      const previewRect = preview.getBoundingClientRect();
      nudgeMargin(preview, "marginTop", previewRect.top, targetTopY);
    }
  };

  align();
  window.addEventListener("resize", align);
}

// Snaps the Hero/Work/About/Contact sections' primary content blocks
// onto grid column E (index 4 — same convention as work.html), the
// same live-measured margin-left technique used throughout this
// file. Hero's four elements (eyebrow, title, sub, meta) are included
// here at the user's explicit request — this overrides Hero's
// previous exclusion (it has its own bespoke, carefully-tuned
// --content-left-gutter/"avoid 64px lines" alignment rules from
// earlier in the project, which this snap now takes priority over
// for the left edge specifically).
function alignHomeSectionsToGrid() {
  const E_COLUMN_INDEX = 4; // A=0, B=1, C=2, D=3, E=4
  const H_COLUMN_INDEX = 7; // A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7

  // Class selectors (.work, .about, .contact), not #work/#about/
  // #contact — work.html's own section also happens to use id="work",
  // so an ID-based query here was unintentionally also matching (and
  // re-snapping) work.html's .section-head after its own H-column
  // snap had already run, since main.js is shared across pages and
  // this function runs on every page unconditionally. The home
  // page's sections use these classes uniquely; work.html's
  // equivalent section uses .work-page instead.
  const targets = [
    { section: document.querySelector(".hero"), el: document.querySelector(".hero-eyebrow") },
    // -3px optical correction: Roboto at weight 800 (this heading) has
    // more built-in left side-bearing than the lighter weights used by
    // the other three Hero elements, so a mathematically-identical
    // left edge reads as visually shifted right — the box/text-layout
    // measurements match exactly (confirmed via getBoundingClientRect
    // and Range.getClientRects()), but the actual ink doesn't. This
    // nudges just the bold heading left to compensate, by eye rather
    // than by calculation.
    { section: document.querySelector(".hero"), el: document.querySelector(".hero-title"), opticalAdjust: -3 },
    { section: document.querySelector(".hero"), el: document.querySelector(".hero-sub") },
    { section: document.querySelector(".hero"), el: document.querySelector(".hero-meta") },
    // index.html's Work section only — left snapped to column H
    // instead of the shared column E the other home-page sections use.
    // Targets .gallery-track (the actual card-holding element)
    // specifically, not the outer .gallery wrapper — the prev/next
    // .gallery-arrow buttons are separate, absolutely-positioned
    // siblings inside that wrapper and are deliberately left alone.
    { section: document.querySelector(".work"), el: document.querySelector(".work .section-head"), columnIndex: H_COLUMN_INDEX },
    { section: document.querySelector(".work"), el: document.querySelector(".work .gallery-track"), columnIndex: H_COLUMN_INDEX },
    // About's section head and portrait — both snapped to column H
    // (the portrait's visible left edge, not just .about-layout's box
    // edge, since the padding-left-aware math below already accounts
    // for .about-layout's own padding-left, which is exactly where
    // the portrait starts)
    { section: document.querySelector(".about"), el: document.querySelector(".about .section-head"), columnIndex: H_COLUMN_INDEX },
    { section: document.querySelector(".about"), el: document.querySelector(".about .about-layout"), columnIndex: H_COLUMN_INDEX },
    { section: document.querySelector(".contact"), el: document.querySelector(".contact .contact-inner") },
    { section: document.querySelector(".contact"), el: document.querySelector(".contact-footer-copyright") },
  ].filter((t) => t.section && t.el);

  if (targets.length === 0) return;

  const align = () => {
    targets.forEach(({ section, el, opticalAdjust = 0, columnIndex = E_COLUMN_INDEX }) => {
      const GRID_STEP = getSiteUnit(section);
      const sectionRect = section.getBoundingClientRect();
      // Target where the VISIBLE content starts, not just the box's
      // own edge — .section-head (and anything else with its own
      // padding-left, e.g. the shared clamp() on .section-head) would
      // otherwise have its box aligned to the grid while the actual
      // text sits padding-left further right, looking unaligned even
      // though the box technically lines up (same issue already
      // solved for work.html's .section-head in
      // alignWorkPageElementsToGrid()). Harmless for elements with no
      // padding-left (it's just 0), so this applies safely to every
      // target uniformly.
      const paddingLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const targetContentStartX = sectionRect.left + columnIndex * GRID_STEP + opticalAdjust;
      const targetLeftX = targetContentStartX - paddingLeft;

      const elRect = el.getBoundingClientRect();
      const currentMarginLeft = parseFloat(getComputedStyle(el).marginLeft) || 0;
      el.style.marginLeft = `${currentMarginLeft + (targetLeftX - elRect.left)}px`;
    });
  };

  align();
  window.addEventListener("resize", align);
}

