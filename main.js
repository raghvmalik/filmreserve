<script>
// === SIDEBAR ===
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  const isOpen = sidebar.style.left === "0px";
  sidebar.style.left = isOpen ? "-260px" : "0px";
  sidebar.setAttribute("aria-hidden", isOpen ? "true" : "false");
}
window.toggleSidebar = toggleSidebar; // needed for inline onclick

// === LOGIN STATE (localStorage-based) ===
function checkLoginStatus() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const show = (id, on) => {
    const el = document.getElementById(id);
    if (el) el.style.display = on ? "block" : "none";
  };

  show("watchlistLink", loggedIn);
  show("profileLink", loggedIn);
  show("settingsLink", loggedIn);
  show("logoutLink", loggedIn);

  show("loginLink", !loggedIn);
  show("signupLink", !loggedIn);
}

function bindAuthForms() {
  // Works if your login.html / signup.html have these IDs
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("loggedIn", "true");
      location.href = "index.html";
    });
  }
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("loggedIn", "true");
      location.href = "index.html";
    });
  }
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  checkLoginStatus();
  alert("You have been logged out!");
}
window.logout = logout;

// === WATCHLIST ===
function getWatchlist() {
  try { return JSON.parse(localStorage.getItem("watchlist")) || []; }
  catch { return []; }
}
function saveWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}
function normalizeId(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function getCardIdFromDom(btn) {
  // Prefer explicit data-id
  let id = btn.getAttribute("data-id");
  if (id) return id;

  const card = btn.closest(".movie-card");
  if (!card) return "";

  // Try overlay-title, then any h3 inside the card, then image alt
  const titleEl = card.querySelector(".overlay-title") || card.querySelector("h3");
  if (titleEl) return normalizeId(titleEl.textContent.trim());

  const imgAlt = card.querySelector("img")?.getAttribute("alt");
  if (imgAlt) return normalizeId(imgAlt);

  return "";
}
function toggleWatchlistById(id) {
  if (!id) return;
  const list = getWatchlist();
  const i = list.indexOf(id);
  if (i === -1) list.push(id); else list.splice(i, 1);
  saveWatchlist(list);
  updateWatchlistButtons();
}
function updateWatchlistButtons() {
  const list = getWatchlist();
  document.querySelectorAll(".add-watchlist, .watchlist-btn").forEach(btn => {
    const id = btn.getAttribute("data-id") || getCardIdFromDom(btn);
    const added = list.includes(id);
    btn.textContent = added ? "✓" : "+";
    btn.setAttribute("aria-pressed", added ? "true" : "false");
    if (!btn.getAttribute("data-id") && id) btn.setAttribute("data-id", id);
  });
}

// === FILTERS & SEARCH ===
function applyFilters() {
  const sVal = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const gVal = document.getElementById("genreFilter")?.value || "";
  const lVal = document.getElementById("languageFilter")?.value || "";
  const fVal = document.getElementById("formatFilter")?.value || "";

  document.querySelectorAll(".movie-card").forEach(card => {
    const title =
      (card.querySelector(".overlay-title")?.textContent ||
       card.querySelector("h3")?.textContent || "").toLowerCase();

    const genre = card.getAttribute("data-genre") || "";
    const lang  = card.getAttribute("data-language") || "";
    const fmt   = card.getAttribute("data-format") || "";

    const matchesSearch   = title.includes(sVal);
    const matchesGenre    = !gVal || genre === gVal;
    const matchesLanguage = !lVal || lang === lVal;
    const matchesFormat   = !fVal || fVal === "All" || fmt === fVal;

    card.style.display = (matchesSearch && matchesGenre && matchesLanguage && matchesFormat) ? "" : "none";
  });
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  // ensure sidebar starts closed
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.left = "-260px";
    sidebar.setAttribute("aria-hidden", "true");
  }

  checkLoginStatus();
  bindAuthForms();

  // Bind watchlist clicks (supports both .add-watchlist and .watchlist-btn)
  document.querySelectorAll(".add-watchlist, .watchlist-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id") || getCardIdFromDom(btn);
      toggleWatchlistById(id);
    });
  });

  // Filters & search
  const search = document.getElementById("searchInput");
  if (search) search.addEventListener("input", applyFilters);

  const g = document.getElementById("genreFilter");
  const l = document.getElementById("languageFilter");
  const f = document.getElementById("formatFilter");
  if (g) g.addEventListener("change", applyFilters);
  if (l) l.addEventListener("change", applyFilters);
  if (f) f.addEventListener("change", applyFilters);

  applyFilters();
});
</script>
