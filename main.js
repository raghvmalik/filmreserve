// main.js

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Refresh homepage on FilmReserve click
document.getElementById('logo').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Simulate login status (replace with real auth check)
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Sidebar links update based on login status
function updateSidebarLinks() {
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = '';

    if (isLoggedIn) {
        sidebarMenu.innerHTML = `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="watchlist.html">Watchlist</a></li>
            <li id="logout-btn"><a href="#">Logout</a></li>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'false');
            isLoggedIn = false;
            updateSidebarLinks();
        });
    } else {
        sidebarMenu.innerHTML = `
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Signup</a></li>
        `;
    }
}
updateSidebarLinks();

// Watchlist feature
function toggleWatchlist(movieId, btn) {
    if (!isLoggedIn) {
        alert('Please log in to use the watchlist.');
        return;
    }

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlist.includes(movieId)) {
        watchlist = watchlist.filter(id => id !== movieId);
        btn.textContent = '+';
    } else {
        watchlist.push(movieId);
        btn.textContent = '✓';
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Apply watchlist state on load
function loadWatchlistState() {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    document.querySelectorAll('.watchlist-btn').forEach(btn => {
        const movieId = btn.dataset.movieId;
        if (watchlist.includes(movieId)) {
            btn.textContent = '✓';
        }
    });
}
loadWatchlistState();

// Attach click events to watchlist buttons
document.querySelectorAll('.watchlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const movieId = btn.dataset.movieId;
        toggleWatchlist(movieId, btn);
    });
});

// Filters
function applyFilters() {
    const genre = document.getElementById('genre-filter').value;
    const language = document.getElementById('language-filter').value;
    const format = document.getElementById('format-filter').value;
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();

    document.querySelectorAll('.movie-card').forEach(card => {
        const matchesGenre = genre === '' || card.dataset.genre === genre;
        const matchesLanguage = language === '' || card.dataset.language === language;
        const matchesFormat = format === '' || card.dataset.format === format;
        const matchesSearch = card.querySelector('h3').textContent.toLowerCase().includes(searchQuery);

        if (matchesGenre && matchesLanguage && matchesFormat && matchesSearch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById('genre-filter').addEventListener('change', applyFilters);
document.getElementById('language-filter').addEventListener('change', applyFilters);
document.getElementById('format-filter').addEventListener('change', applyFilters);
document.getElementById('search-bar').addEventListener('input', applyFilters);
