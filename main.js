// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Movie Search
const searchInput = document.querySelector('.search-bar');
const movieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    movieCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

// Filters
const genreFilter = document.getElementById('genreFilter');
const languageFilter = document.getElementById('languageFilter');
const formatFilter = document.getElementById('formatFilter');

function applyFilters() {
    const genreVal = genreFilter.value.toLowerCase();
    const langVal = languageFilter.value.toLowerCase();
    const formatVal = formatFilter.value.toLowerCase();

    movieCards.forEach(card => {
        const genre = card.getAttribute('data-genre').toLowerCase();
        const lang = card.getAttribute('data-language').toLowerCase();
        const format = card.getAttribute('data-format').toLowerCase();

        const genreMatch = genreVal === 'all' || genre.includes(genreVal);
        const langMatch = langVal === 'all' || lang.includes(langVal);
        const formatMatch = formatVal === 'all' || format.includes(formatVal);

        card.style.display = (genreMatch && langMatch && formatMatch) ? 'block' : 'none';
    });
}

[genreFilter, languageFilter, formatFilter].forEach(filter => {
    filter.addEventListener('change', applyFilters);
});

// Watchlist
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function updateWatchlistButtons() {
    document.querySelectorAll('.watchlist-btn').forEach(button => {
        const movieId = button.dataset.id;
        if (watchlist.includes(movieId)) {
            button.textContent = '✓';
        } else {
            button.textContent = '+';
        }
    });
}

document.querySelectorAll('.watchlist-btn').forEach(button => {
    button.addEventListener('click', () => {
        const movieId = button.dataset.id;
        if (watchlist.includes(movieId)) {
            watchlist = watchlist.filter(id => id !== movieId);
        } else {
            watchlist.push(movieId);
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        updateWatchlistButtons();
    });
});

updateWatchlistButtons();

// Navbar Logo Click Refresh
document.querySelector('.navbar h1').addEventListener('click', () => {
    window.location.reload();
});
