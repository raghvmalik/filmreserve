const firebaseConfig = {
  apiKey: "...",
  authDomain: "film-reserve-255bc.firebaseapp.com",
  projectId: "film-reserve-255bc",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "1:856235605413:web:your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const movies = [
  { title: "Fantastic 4: First Steps", genre: "Action", lang: "English", format: "1080p", img: "fantastic4.jpeg" },
  { title: "Avengers: Doomsday", genre: "Action", lang: "English", format: "4K", img: "avengers.jpg" },
  { title: "Oppenheimer", genre: "Historical", lang: "English", format: "1080p", img: "oppenheimer.jpg" },
  { title: "Superman: The Last Hope", genre: "Action", lang: "English", format: "1080p", img: "superman.jpeg" },
  { title: "Interstellar", genre: "Sci-Fi", lang: "English", format: "4K", img: "interstellar.jpg" },
  { title: "Inception", genre: "Sci-Fi", lang: "English", format: "1080p", img: "inception.jpg" },
  { title: "28 Days Later", genre: "Thriller", lang: "English", format: "1080p", img: "28yearslater.jpeg" },
  { title: "Minecraft", genre: "Animation", lang: "English", format: "1080p", img: "minecraft.jpeg" },
  { title: "F1", genre: "Drama", lang: "English", format: "1080p", img: "F1.jpg" },
  { title: "Final Destination", genre: "Thriller", lang: "English", format: "1080p", img: "finaldestination.jpeg" },
  { title: "Dune", genre: "Sci-Fi", lang: "English", format: "4K", img: "dune.jpg" },
  { title: "Wicked", genre: "Drama", lang: "English", format: "1080p", img: "wicked.avif" },
  { title: "Thunderbolts", genre: "Action", lang: "English", format: "4K", img: "thunderbolts.jpg" },
  { title: "Spider-Man: No Way Home", genre: "Action", lang: "English", format: "1080p", img: "spiderman.jpg" },
  { title: "Matrix Resurrections", genre: "Sci-Fi", lang: "English", format: "4K", img: "matrix.jpg" },
  { title: "Kalki 2898 AD", genre: "Sci-Fi", lang: "Hindi", format: "4K", img: "kalki.jpg" },
  { title: "Emergency", genre: "Historical", lang: "Hindi", format: "1080p", img: "emergency.jpeg" },
  { title: "Jurassic World", genre: "Action", lang: "English", format: "4K", img: "jurassicworld.jpg" },
  { title: "Joker 2", genre: "Drama", lang: "English", format: "1080p", img: "joker2.jpg" },
  { title: "Flash", genre: "Action", lang: "English", format: "1080p", img: "flash.webp" },
  { title: "Deadpool and Wolverine", genre: "Action", lang: "English", format: "4K", img: "deadpool.jpg" },
  { title: "Batman", genre: "Action", lang: "English", format: "4K", img: "batman.jpg" },
  { title: "Ballerina", genre: "Drama", lang: "English", format: "1080p", img: "ballerina.jpg" },
  { title: "Avatar", genre: "Sci-Fi", lang: "English", format: "4K", img: "avatar.jpg" },
];

const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const languageFilter = document.getElementById("language-filter");
const formatFilter = document.getElementById("format-filter");
const sidebar = document.querySelector(".sidebar");
const hamburger = document.getElementById("hamburger");

function isLoggedIn() {
  return !!localStorage.getItem("loggedInUser");
}

function getWatchlist() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`${user}_watchlist`) || "[]");
}

function toggleWatchlist(title) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) return;
  let watchlist = getWatchlist();
  if (watchlist.includes(title)) {
    watchlist = watchlist.filter(item => item !== title);
  } else {
    watchlist.push(title);
  }
  localStorage.setItem(`${user}_watchlist`, JSON.stringify(watchlist));
  renderMovies();
}

function createMovieCard(movie) {
  const inWatchlist = getWatchlist().includes(movie.title);
  return `
    <div class="movie-card" data-genre="${movie.genre}" data-lang="${movie.lang}" data-format="${movie.format}">
      <img src="./images/${movie.img}" alt="${movie.title}">
      <div class="card-content">
        <h3>${movie.title.split(":")[0]}${movie.title.includes(":") ? "<br>" + movie.title.split(":")[1] : ""}</h3>
        ${isLoggedIn() ? `
        <div class="hover-buttons">
          <a href="watch.html?title=${encodeURIComponent(movie.title)}" class="watch-btn">Watch Now</a>
          <button class="watchlist-btn" onclick="toggleWatchlist('${movie.title}')">${inWatchlist ? "✓" : "+"}</button>
        </div>` : ""}
      </div>
    </div>
  `;
}

function renderMovies() {
  const search = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  const lang = languageFilter.value;
  const format = formatFilter.value;

  movieList.innerHTML = "";

  movies.forEach(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search);
    const matchGenre = genre === "" || movie.genre === genre;
    const matchLang = lang === "" || movie.lang === lang;
    const matchFormat = format === "" || movie.format === format;

    if (matchSearch && matchGenre && matchLang && matchFormat) {
      movieList.innerHTML += createMovieCard(movie);
    }
  });
}

searchInput.addEventListener("input", renderMovies);
genreFilter.addEventListener("change", renderMovies);
languageFilter.addEventListener("change", renderMovies);
formatFilter.addEventListener("change", renderMovies);

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.getElementById("logo").addEventListener("click", () => {
  window.location.reload();
});

window.onload = function () {
  const sidebarLinks = document.querySelector(".sidebar-links");
  if (isLoggedIn()) {
    sidebarLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="profile.html">Profile</a>
      <a href="#" onclick="logout()">Logout</a>
      <a href="watchlist.html">Watchlist</a>
    `;
  } else {
    sidebarLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    `;
    const watchlistBtn = document.getElementById("watchlist-nav");
    if (watchlistBtn) watchlistBtn.style.display = "none";
  }

  renderMovies();
};

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}
