// Sidebar Toggle
document.querySelector(".sidebar-toggle")?.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("active");
});

// Search Filter
document.getElementById("searchInput")?.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll(".movie-card").forEach(card => {
        const title = card.querySelector(".movie-title")?.innerText.toLowerCase();
        card.style.display = title?.includes(searchValue) ? "block" : "none";
    });
});

// Genre/Language/Format Filters
function applyFilters() {
    const genre = document.getElementById("genreFilter")?.value;
    const language = document.getElementById("languageFilter")?.value;
    const format = document.getElementById("formatFilter")?.value;

    document.querySelectorAll(".movie-card").forEach(card => {
        const matchGenre = !genre || card.dataset.genre === genre;
        const matchLanguage = !language || card.dataset.language === language;
        const matchFormat = !format || card.dataset.format === format;

        card.style.display = (matchGenre && matchLanguage && matchFormat) ? "block" : "none";
    });
}

["genreFilter", "languageFilter", "formatFilter"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", applyFilters);
});

// Watchlist Functionality
document.querySelectorAll(".plus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const movieId = btn.dataset.id;
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.includes(movieId)) {
            watchlist = watchlist.filter(id => id !== movieId);
            btn.textContent = "+";
        } else {
            watchlist.push(movieId);
            btn.textContent = "✓";
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    });
});

// Optional: Highlight watchlist buttons if already saved
window.addEventListener("load", () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    document.querySelectorAll(".plus-btn").forEach(btn => {
        if (watchlist.includes(btn.dataset.id)) btn.textContent = "✓";
    });
});