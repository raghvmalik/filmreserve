// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const isOpen = sidebar.style.left === "0px";
    sidebar.style.left = isOpen ? "-260px" : "0px";
    sidebar.setAttribute("aria-hidden", isOpen);
}

// Fake login state using localStorage
function checkLoginStatus() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    document.getElementById("watchlistLink").style.display = loggedIn ? "block" : "none";
    document.getElementById("profileLink").style.display = loggedIn ? "block" : "none";
    document.getElementById("settingsLink").style.display = loggedIn ? "block" : "none";
    document.getElementById("logoutLink").style.display = loggedIn ? "block" : "none";

    document.getElementById("loginLink").style.display = loggedIn ? "none" : "block";
    document.getElementById("signupLink").style.display = loggedIn ? "none" : "block";
}

// Simulate logout
function logout() {
    localStorage.setItem("loggedIn", "false");
    alert("You have been logged out!");
    checkLoginStatus();
}

// Watchlist handling
function toggleWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const index = watchlist.indexOf(movieId);

    if (index === -1) {
        watchlist.push(movieId);
    } else {
        watchlist.splice(index, 1);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlistButtons();
}

function updateWatchlistButtons() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    document.querySelectorAll(".watchlist-btn").forEach(btn => {
        const movieId = btn.getAttribute("data-id");
        if (watchlist.includes(movieId)) {
            btn.textContent = "✓";
        } else {
            btn.textContent = "+";
        }
    });
}

// Search & Filters
function applyFilters() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const genreValue = document.getElementById("genreFilter").value;
    const languageValue = document.getElementById("languageFilter").value;
    const formatValue = document.getElementById("formatFilter").value;

    document.querySelectorAll(".movie-card").forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const genre = card.getAttribute("data-genre");
        const language = card.getAttribute("data-language");
        const format = card.getAttribute("data-format");

        const matchesSearch = title.includes(searchValue);
        const matchesGenre = !genreValue || genre === genreValue;
        const matchesLanguage = !languageValue || language === languageValue;
        const matchesFormat = !formatValue || format === formatValue || formatValue === "All";

        card.style.display = (matchesSearch && matchesGenre && matchesLanguage && matchesFormat) ? "block" : "none";
    });
}

// Event Listeners
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("languageFilter").addEventListener("change", applyFilters);
document.getElementById("formatFilter").addEventListener("change", applyFilters);

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    updateWatchlistButtons();

    // Add click events for watchlist buttons
    document.querySelectorAll(".watchlist-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const movieId = btn.getAttribute("data-id");
            toggleWatchlist(movieId);
        });
    });
});
