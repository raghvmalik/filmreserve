document.addEventListener("DOMContentLoaded", () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  document.querySelectorAll(".watchlist-btn").forEach((btn, index) => {
    const card = btn.closest(".movie-card");
    const movieId = index;

    if (watchlist.includes(movieId)) {
      btn.textContent = "✓";
    }

    btn.addEventListener("click", () => {
      const inList = watchlist.includes(movieId);
      if (inList) {
        watchlist.splice(watchlist.indexOf(movieId), 1);
        btn.textContent = "+";
      } else {
        watchlist.push(movieId);
        btn.textContent = "✓";
      }
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    });
  });

  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");
  const formatFilter = document.getElementById("formatFilter");
  const languageFilter = document.getElementById("languageFilter");

  function filterMovies() {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedFormat = formatFilter.value;
    const selectedLanguage = languageFilter.value;

    document.querySelectorAll(".movie-card").forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      const matchesSearch = title.includes(searchText);
      const matchesGenre = !selectedGenre || card.dataset.genre === selectedGenre;
      const matchesFormat = !selectedFormat || card.dataset.format === selectedFormat;
      const matchesLanguage = !selectedLanguage || card.dataset.language === selectedLanguage;

      if (matchesSearch && matchesGenre && matchesFormat && matchesLanguage) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterMovies);
  genreFilter.addEventListener("change", filterMovies);
  formatFilter.addEventListener("change", filterMovies);
  languageFilter.addEventListener("change", filterMovies);
});
