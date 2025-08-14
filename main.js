// main.js - FilmReserve Homepage
// Author: Raghav
// Handles sidebar, navbar, watchlist, filters, search, and play buttons

document.addEventListener("DOMContentLoaded", () => {
  const watchlistKey = "filmreserveWatchlist"; // Key for storing watchlist in localStorage

  // ---------- NAVBAR & SIDEBAR ----------
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const filmreserveLogo = document.querySelector(".logo");
  const searchInput = document.querySelector("#search");

  // Toggle sidebar when hamburger menu is clicked
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Refresh homepage when clicking FilmReserve logo
  if (filmreserveLogo) {
    filmreserveLogo.addEventListener("click", () => {
      location.reload();
    });
  }

  // ---------- LOGIN / LOGOUT MENU ----------
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (sidebarMenu) {
    sidebarMenu.innerHTML = isLoggedIn
      ? `<li><a href="profile.html">Profile</a></li>
         <li><a href="#" id="logout">Logout</a></li>
         <li><a href="watchlist.html">Watchlist</a></li>`
      : `<li><a href="login.html">Login</a></li>
         <li><a href="signup.html">Signup</a></li>`;

    if (isLoggedIn) {
      const logoutBtn = document.querySelector("#logout");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.setItem("loggedIn", "false");
          location.reload();
        });
      }
    }
  }

  // ---------- WATCHLIST HANDLING ----------
  let watchlist = JSON.parse(localStorage.getItem(watchlistKey)) || [];

  // Update all watchlist buttons (+ / ✓)
  const updateWatchlistButtons = () => {
    document.querySelectorAll(".watchlist-btn").forEach((btn) => {
      const movieId = btn.dataset.id;
      if (!movieId) return; // safety check
      btn.textContent = watchlist.includes(movieId) ? "✓" : "+";
    });
  };

  updateWatchlistButtons();

  // Handle watchlist button clicks
  document.querySelectorAll(".watchlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!isLoggedIn) {
        alert("Please log in to manage your watchlist.");
        return;
      }
      const movieId = btn.dataset.id;
      if (!movieId) return; // safety check

      if (watchlist.includes(movieId)) {
        // Remove from watchlist
        watchlist = watchlist.filter((id) => id !== movieId);
      } else {
        // Add to watchlist
        watchlist.push(movieId);
      }
      localStorage.setItem(watchlistKey, JSON.stringify(watchlist));
      updateWatchlistButtons();
    });
  });

  // ---------- FILTERS & SEARCH ----------
  const genreFilter = document.querySelector("#genreFilter");
  const languageFilter = document.querySelector("#languageFilter");
  const formatFilter = document.querySelector("#formatFilter");
  const movieCards = document.querySelectorAll(".movie-card");

  const applyFilters = () => {
    const genre = genreFilter ? genreFilter.value.toLowerCase() : "all";
    const language = languageFilter ? languageFilter.value.toLowerCase() : "all";
    const format = formatFilter ? formatFilter.value.toLowerCase() : "all";
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";

    movieCards.forEach((card) => {
      if (!card.dataset) return; // safety check

      const cardGenre = card.dataset.genre?.toLowerCase() || "";
      const cardLanguage = card.dataset.language?.toLowerCase() || "";
      const cardFormat = card.dataset.format?.toLowerCase() || "";
      const cardTitle = card.dataset.title?.toLowerCase() || "";

      const match =
        (genre === "all" || cardGenre === genre) &&
        (language === "all" || cardLanguage === language) &&
        (format === "all" || cardFormat === format) &&
        cardTitle.includes(searchQuery);

      card.style.display = match ? "block" : "none";
    });
  };

  // Event listeners for filters and search
  if (genreFilter) genreFilter.addEventListener("change", applyFilters);
  if (languageFilter) languageFilter.addEventListener("change", applyFilters);
  if (formatFilter) formatFilter.addEventListener("change", applyFilters);
  if (searchInput) searchInput.addEventListener("input", applyFilters);

  // ---------- PLAY BUTTONS (▶) ----------
  document.querySelectorAll(".watch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.dataset.watch) return; // safety check

      if (!isLoggedIn) {
        window.location.href = "login.html";
      } else {
        window.location.href = btn.dataset.watch;
      }
    });
  });

  // ---------- INITIALIZATION ----------
  applyFilters(); // Apply filters on page load
  updateWatchlistButtons(); // Update buttons on page load
});
