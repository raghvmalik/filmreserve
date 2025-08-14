// ======= Sidebar Toggle =======
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// ======= Refresh Page on FilmReserve Click =======
document.querySelector('.logo')?.addEventListener('click', () => {
    location.reload();
});

// ======= Login Status & Sidebar Links =======
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const sidebarMenu = document.querySelector('.sidebar-menu');

if (sidebarMenu) {
    if (isLoggedIn) {
        sidebarMenu.innerHTML = `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#" id="logoutBtn">Logout</a></li>
            <li><a href="watchlist.html">Watchlist</a></li>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            location.reload();
        });
    } else {
        sidebarMenu.innerHTML = `
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Signup</a></li>
        `;
    }
}

// ======= Watch Now Button Login Enforcement =======
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to watch this movie.");
            window.location.href = "login.html";
        } else {
            window.location.href = "watch.html";
        }
    });
});

// ======= Watchlist Add/Remove =======
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to add to watchlist.");
            window.location.href = "login.html";
            return;
        }

        const card = btn.closest('.movie-card');
        const movieTitle = card?.getAttribute('data-title');
        if (!movieTitle) return;

        let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

        if (watchlist.includes(movieTitle)) {
            watchlist = watchlist.filter(m => m !== movieTitle);
            btn.textContent = '+';
        } else {
            watchlist.push(movieTitle);
            btn.textContent = '✓';
        }

        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    });
});

// ======= Search Functionality =======
const searchInput = document.getElementById('searchBar');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.movie-card').forEach(card => {
            const title = card.getAttribute('data-title')?.toLowerCase() || '';
            card.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// ======= Filter Functionality =======
const genreSelect = document.getElementById('genreFilter');
const languageSelect = document.getElementById('languageFilter');
const formatSelect = document.getElementById('formatFilter');

function filterMovies() {
    const genre = genreSelect?.value.toLowerCase() || '';
    const language = languageSelect?.value.toLowerCase() || '';
    const format = formatSelect?.value.toLowerCase() || '';

    document.querySelectorAll('.movie-card').forEach(card => {
        const matchesGenre = !genre || card.getAttribute('data-genre')?.toLowerCase() === genre;
        const matchesLanguage = !language || card.getAttribute('data-language')?.toLowerCase() === language;
        const matchesFormat = !format || card.getAttribute('data-format')?.toLowerCase() === format;

        card.style.display = matchesGenre && matchesLanguage && matchesFormat ? 'block' : 'none';
    });
}

[genreSelect, languageSelect, formatSelect].forEach(select => {
    select?.addEventListener('change', filterMovies);
});

// ======= Initialize Watchlist Buttons (✓ if already added) =======
if (isLoggedIn) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    document.querySelectorAll('.movie-card').forEach(card => {
        const title = card.getAttribute('data-title');
        const btn = card.querySelector('.add-btn');
        if (title && watchlist.includes(title)) {
            btn.textContent = '✓';
        }
    });
}
