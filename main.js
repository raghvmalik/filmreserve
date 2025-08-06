const genreFilter = document.getElementById('genreFilter');
const languageFilter = document.getElementById('languageFilter');
const resolutionFilter = document.getElementById('resolutionFilter');
const searchBar = document.getElementById('searchBar');
const movieCards = document.querySelectorAll('.movie-card');

function filterMovies() {
  const genre = genreFilter.value;
  const language = languageFilter.value;
  const resolution = resolutionFilter.value;
  const searchQuery = searchBar.value.toLowerCase();

  movieCards.forEach(card => {
    const matchesGenre = !genre || card.dataset.genre === genre;
    const matchesLanguage = !language || card.dataset.language === language;
    const matchesResolution = !resolution || card.dataset.resolution === resolution;
    const matchesSearch = card.innerText.toLowerCase().includes(searchQuery);

    if (matchesGenre && matchesLanguage && matchesResolution && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

genreFilter.addEventListener('change', filterMovies);
languageFilter.addEventListener('change', filterMovies);
resolutionFilter.addEventListener('change', filterMovies);
searchBar.addEventListener('input', filterMovies);

document.querySelectorAll('.watchlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent === '+') {
      btn.textContent = '✓';
      btn.classList.add('in-watchlist');
    } else {
      btn.textContent = '+';
      btn.classList.remove('in-watchlist');
    }
  });
});
