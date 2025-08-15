// Sidebar Toggle
document.querySelector(".sidebar-toggle").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("active");
});

// Search Filter
document.getElementById("searchInput").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    document.querySelectorAll(".movie-card").forEach(card => {
        let title = card.querySelector(".movie-title").innerText.toLowerCase();
        card.style.display = title.includes(searchValue) ? "block" : "none";
    });
});

// Genre/Language/Format Filters
function applyFilters() {
    let genre = document.getElementById("genreFilter").value;
    let language = document.getElementById("languageFilter").value;
    let format = document.getElementById("formatFilter").value;

    document.querySelectorAll(".movie-card").forEach(card => {
        let matchGenre = genre === "" || card.dataset.genre === genre;
        let matchLanguage = language === "" || card.dataset.language === language;
        let matchFormat = format === "" || card.dataset.format === format;

        card.style.display = (matchGenre && matchLanguage && matchFormat) ? "block" : "none";
    });
}

document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("languageFilter").addEventListener("change", applyFilters);
document.getElementById("formatFilter").addEventListener("change", applyFilters);

// Watchlist Functionality
document.querySelectorAll(".plus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let movieId = btn.dataset.id;
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
