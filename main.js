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
  renderWorkGallery();
  setupGalleryArrows();
  renderProjectPage();
  setupMobileNav();
  alignWordmarkToGridColumn();
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
  runIntroSequence();

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
      runIntroSequence();
    }
  });
}

// Builds (or rebuilds) the falling blocks and schedules the
// "intro-done" flag once the whole sequence has landed. Every run —
// first load or replay — uses the same timing, so the choreography
// never feels rushed on a replay.
function runIntroSequence() {
  const totalMs = TOTAL_ANIMATION_MS;
  const fallMs = BLOCK_FALL_DURATION_MS;

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

// Replaces the old text list entirely — a photo grid reusing the
// exact same card module as the home page's gallery (buildGalleryCard,
// defined below), just laid out in a plain fluid grid instead of a
// horizontal infinite-loop carousel.
function renderWorkPhotoGrid() {
  const grid = document.getElementById("work-photo-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  PROJECTS.forEach((project) => {
    const card = buildGalleryCard(project, false);
    grid.appendChild(card);
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
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-name">${project.title}</span>
        <span class="gallery-card-date">${project.year}</span>
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
  const heroMedia = document.getElementById("project-hero-media");
  const textSection = document.getElementById("project-text");
  const carousel = document.getElementById("project-carousel");
  if (!heroMedia || typeof PROJECTS === "undefined") return;

  const slug = new URLSearchParams(location.search).get("id");
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    document.getElementById("project-hero").classList.add("project-hero--not-found");
    document.querySelector(".project-hero").innerHTML = `
      <div class="project-not-found">
        <p class="project-eyebrow">Not found</p>
        <h1 class="project-title">No project here</h1>
        <p class="project-lede">
          <a href="work.html">Back to Selected Work →</a>
        </p>
      </div>
    `;
    if (textSection) textSection.remove();
    if (carousel) carousel.remove();
    return;
  }

  document.title = `${project.title} — Eric Chen`;

  const photos = Array.isArray(project.gallery) ? project.gallery : [];

  heroMedia.innerHTML = photos[0] ? `<img src="${photos[0].src}" alt="${project.title}" />` : "";

  const heroText = document.createElement("div");
  heroText.className = "project-hero-text";
  heroText.innerHTML = `
    <p class="project-eyebrow">${project.num} — ${project.typology} — ${project.year}</p>
    <h1 class="project-title">${project.title}</h1>
  `;
  heroMedia.after(heroText);

  if (textSection) {
    // Not every project has a program/site area worth showing (e.g. a
    // print piece has no "site area") — only render the facts that
    // actually exist on this project instead of a blank value.
    const facts = [
      ["Status", project.status],
      ["Program", project.program],
      ["Site area", project.siteArea],
      ["Location", project.location],
    ].filter(([, value]) => value);

    textSection.innerHTML = `
      <dl class="project-meta">
        ${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
      </dl>
      <p class="project-lede">${project.description}</p>
    `;
  }

  setupCarousel(photos, project.title);
  setupLightbox();
}

/* ---------- Project gallery carousel (one image, prev/next arrows) ---------- */

function setupCarousel(photos, altText) {
  const media = document.getElementById("project-carousel-media");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!media || !prevBtn || !nextBtn) return;

  if (photos.length === 0) {
    document.getElementById("project-carousel").remove();
    return;
  }

  let index = 0;
  const render = () => {
    media.innerHTML = `
      <button type="button">
        <img src="${photos[index].src}" alt="${altText}" loading="lazy" />
      </button>
    `;
  };

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + photos.length) % photos.length;
    render();
  });
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % photos.length;
    render();
  });

  // A single photo can't cycle anywhere, so the arrows would just be
  // decorative — hide them rather than show controls that do nothing.
  if (photos.length < 2) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
  }

  render();
}

/* ---------- Lightbox (full-image preview on click) ---------- */

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const media = document.getElementById("project-carousel-media");
  if (!lightbox || !lightboxImg || !closeBtn || !media) return;

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
  };
  const close = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
  };

  // Delegate from the media container rather than binding a listener
  // to each rendered photo — the carousel replaces that photo on every
  // prev/next click, so a direct listener would need re-attaching too.
  media.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const img = button.querySelector("img");
    if (img) open(img.src, img.alt);
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightboxImg) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
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

// Snaps two elements onto specific numbered alignment grid rows, the
// same live-measured margin technique used throughout this file
// (margin, not top/left/right — a sticky element's inset properties
// only define its scroll-stuck threshold, they don't shift its
// static/resting position the way margin does). Horizontal position
// for both is left to ordinary centered CSS (.section-head and
// .work-layout's own max-width + margin: 0 auto) instead of being
// pinned to a lettered column — pinning the gallery's left edge to a
// fixed column while .work-layout centers on max-width independently
// used to leave a lopsided gap on wide viewports, wider on the right
// than the left.
//   - .section-head: bottom edge -> row 10
//   - .work-photo-grid: top edge -> row 12
function alignWorkPageElementsToGrid() {
  const workPage = document.querySelector(".work-page");
  const sectionHead = document.querySelector(".section-head");
  const gallery = document.querySelector(".work-photo-grid");
  if (!workPage) return;

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
      const targetBottomY = pageRect.top + ROW_10_INDEX * GRID_STEP;
      const headRect = sectionHead.getBoundingClientRect();
      nudgeMargin(sectionHead, "marginTop", headRect.bottom, targetBottomY);
    }

    if (gallery) {
      const targetTopY = pageRect.top + ROW_12_INDEX * GRID_STEP;
      const galleryRect = gallery.getBoundingClientRect();
      nudgeMargin(gallery, "marginTop", galleryRect.top, targetTopY);
    }
  };

  align();
  window.addEventListener("resize", align);
}

// Snaps the Hero/Work/Contact sections' primary content blocks
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

  // Class selectors (.work, .contact), not #work/#contact —
  // work.html's own section also happens to use id="work",
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
    // index.html's Work section heading only — left snapped to column
    // H instead of the shared column E the other home-page sections
    // use. .gallery-track itself is deliberately NOT snapped here
    // (it used to be): pulling the track's left edge onto column H
    // shrinks the gap .gallery-arrow--prev sits in (that arrow is a
    // separate, absolutely-positioned sibling at the wrapper's own
    // edge, not aware of this nudge), and at wider viewports that gap
    // shrinks enough for the arrow to overlap the first photo. The
    // track now keeps its ordinary padding-defined position instead,
    // which already lines up close enough to column H and leaves the
    // arrow its full clearance.
    { section: document.querySelector(".work"), el: document.querySelector(".work .section-head"), columnIndex: H_COLUMN_INDEX },
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

