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
  renderWorkIndex();
  setupPreviewPanel();
  renderWorkGallery();
  setupGalleryArrows();
  setupMobileNav();
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

/* ---------- Work index ---------- */

function renderWorkIndex() {
  const list = document.getElementById("work-index");
  if (!list || typeof PROJECTS === "undefined") return;

  PROJECTS.forEach((project, index) => {
    const row = document.createElement("li");
    row.className = "work-row";
    row.dataset.index = String(index);

    row.innerHTML = `
      <button class="row-summary" style="all:unset; display:contents; cursor:pointer;" aria-expanded="false">
        <span class="row-num">${project.num}</span>
        <span class="row-title">${project.title}</span>
        <span class="row-typology">${project.typology}</span>
        <span class="row-year">${project.year}</span>
      </button>
      <div class="row-detail">
        <div class="row-detail-inner">
          <div>
            <p>${project.description}</p>
            ${project.quote ? `<blockquote>${project.quote}</blockquote>` : ""}
          </div>
          <dl class="spec-table">
            <div><dt>Status</dt><dd>${project.status}</dd></div>
            <div><dt>Program</dt><dd>${project.program}</dd></div>
            <div><dt>Site area</dt><dd>${project.siteArea}</dd></div>
            <div><dt>Location</dt><dd>${project.location}</dd></div>
          </dl>
        </div>
      </div>
    `;

    // Click to expand / collapse this row's detail panel
    row.querySelector(".row-summary").addEventListener("click", () => {
      const isOpen = row.classList.contains("is-open");
      list.querySelectorAll(".work-row.is-open").forEach((openRow) => {
        openRow.classList.remove("is-open");
        openRow.querySelector(".row-summary").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        row.classList.add("is-open");
        row.querySelector(".row-summary").setAttribute("aria-expanded", "true");
      }
    });

    // Hover to swap the blueprint preview panel (desktop)
    row.addEventListener("mouseenter", () => showPreview(index));

    list.appendChild(row);
  });

  // Prime the preview panel with the first project
  showPreview(0);
}

/* ---------- Preview panel ---------- */

function setupPreviewPanel() {
  const list = document.getElementById("work-index");
  if (!list) return;
  list.addEventListener("mouseleave", () => {
    const openIndex = getOpenIndex();
    showPreview(openIndex !== null ? openIndex : 0);
  });
}

function getOpenIndex() {
  const openRow = document.querySelector(".work-row.is-open");
  return openRow ? Number(openRow.dataset.index) : null;
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

// One card module per project — square photo, name bottom-left,
// date bottom-right — reused identically for every entry so the
// gallery reads as one cohesive system rather than one-off layouts.
function renderWorkGallery() {
  const track = document.getElementById("work-gallery");
  if (!track || typeof PROJECTS === "undefined") return;

  PROJECTS.forEach((project) => {
    const card = document.createElement("li");
    card.className = "gallery-card";
    card.innerHTML = `
      <div class="gallery-card-frame">
        <div class="gallery-card-photo">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          <div class="gallery-card-caption">
            <span class="gallery-card-name">${project.title}</span>
            <span class="gallery-card-date">${project.year}</span>
          </div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

// Arrow buttons scroll the track by roughly one viewport-width of
// cards at a time — native scroll-snap handles settling each card
// into place, this just gives it a nudge in either direction.
function setupGalleryArrows() {
  const gallery = document.querySelector(".gallery");
  const track = document.getElementById("work-gallery");
  const prev = gallery ? gallery.querySelector(".gallery-arrow--prev") : null;
  const next = gallery ? gallery.querySelector(".gallery-arrow--next") : null;
  if (!gallery || !track || !prev || !next) return;

  const scrollByAmount = () => track.clientWidth * 0.8;
  prev.addEventListener("click", () => track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: scrollByAmount(), behavior: "smooth" }));

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

