// ===== SIDEBAR TOGGLE =====
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// ===== FILTER & SEARCH =====
const searchBar = document.querySelector(".search-bar");
const genreFilter = document.getElementById("genre-filter");
const languageFilter = document.getElementById("language-filter");
const formatFilter = document.getElementById("format-filter");
const movies = document.querySelectorAll(".movie-card");

function filterMovies() {
    const searchTerm = searchBar.value.toLowerCase();
    const genre = genreFilter.value;
    const language = languageFilter.value;
    const format = formatFilter.value;

    movies.forEach(movie => {
        const title = movie.querySelector("h3").innerText.toLowerCase();
        const movieGenre = movie.dataset.genre;
        const movieLanguage = movie.dataset.language;
        const movieFormat = movie.dataset.format;

        if (
            (title.includes(searchTerm) || searchTerm === "") &&
            (genre === "" || movieGenre === genre) &&
            (language === "" || movieLanguage === language) &&
            (format === "" || movieFormat === format)
        ) {
            movie.style.display = "";
        } else {
            movie.style.display = "none";
        }
    });
}

searchBar.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
languageFilter.addEventListener("change", filterMovies);
formatFilter.addEventListener("change", filterMovies);

// ===== WATCHLIST =====
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function toggleWatchlist(id) {
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(item => item !== id);
    } else {
        watchlist.push(id);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlistButtons();
}

function updateWatchlistButtons() {
    document.querySelectorAll(".add-watchlist").forEach(btn => {
        const id = btn.dataset.id;
        btn.textContent = watchlist.includes(id) ? "✓" : "+";
    });
}

document.querySelectorAll(".add-watchlist").forEach(btn => {
    btn.addEventListener("click", () => {
        toggleWatchlist(btn.dataset.id);
    });
});

updateWatchlistButtons();
