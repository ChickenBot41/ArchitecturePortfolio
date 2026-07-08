/**
 * MAIN
 * ----
 * Renders the project index from PROJECTS (see js/projects-data.js)
 * and wires up the hover/click interactions. No build step, no
 * dependencies — safe to open straight from a static host or
 * GitHub Pages.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderWorkIndex();
  setupPreviewPanel();
  setupMobileNav();
  setupSmoothAnchors();
  document.getElementById("year").textContent = new Date().getFullYear();
});

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

/* ---------- Smooth anchor scrolling ---------- */

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
