// ===== FIREBASE CONFIG =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// ===== MOVIE DATA =====
const movies = [
  { title: "Fantastic 4: First Steps", genre: "Action", language: "English", resolution: "4k", image: "fantastic4.jpeg", link: "trailers/fantastic4.mp4" },
  { title: "Avengers: Doomsday", genre: "Action", language: "English", resolution: "4k", image: "avengers.jpeg", link: "trailers/avengers.mp4" },
  { title: "Oppenheimer", genre: "Drama", language: "English", resolution: "1080p", image: "oppenheimer.jpeg", link: "movie.html" },
  { title: "Superman: The Last Hope", genre: "Action", language: "English", resolution: "4k", image: "superman.jpeg", link: "trailers/superman.mp4" },
  { title: "Interstellar", genre: "Sci-Fi", language: "English", resolution: "1080p", image: "interstellar.jpeg", link: "movie.html" },
  { title: "Inception", genre: "Sci-Fi", language: "English", resolution: "1080p", image: "inception.jpeg", link: "movie.html" },
  { title: "28 Years Later", genre: "Horror", language: "English", resolution: "1080p", image: "28yearslater.jpeg", link: "trailers/28yearslater.mp4" },
  { title: "Minecraft", genre: "Animation", language: "English", resolution: "1080p", image: "minecraft.jpeg", link: "movie.html" },
  { title: "F1", genre: "Sports", language: "English", resolution: "4k", image: "f1.jpeg", link: "trailers/f1.mp4" },
  { title: "Final Destination", genre: "Horror", language: "English", resolution: "1080p", image: "finaldestination.jpeg", link: "movie.html" },
  { title: "Dune", genre: "Sci-Fi", language: "English", resolution: "4k", image: "dune.jpeg", link: "movie.html" },
  { title: "Wicked", genre: "Musical", language: "English", resolution: "1080p", image: "wicked.avif", link: "movie.html" },
  { title: "Thunderbolts", genre: "Action", language: "English", resolution: "4k", image: "thunderbolts.jpeg", link: "movie.html" },
  { title: "Spider-Man: No Way Home", genre: "Action", language: "English", resolution: "4k", image: "spiderman.jpeg", link: "movie.html" },
  { title: "Matrix Resurrections", genre: "Sci-Fi", language: "English", resolution: "1080p", image: "matrix.jpeg", link: "movie.html" },
  { title: "Kalki 2898 AD", genre: "Action", language: "Hindi", resolution: "4k", image: "kalki.jpeg", link: "movie.html" },
  { title: "Emergency", genre: "Drama", language: "Hindi", resolution: "1080p", image: "emergency.jpeg", link: "movie.html" },
  { title: "Jurassic World", genre: "Adventure", language: "English", resolution: "4k", image: "jurassic.jpeg", link: "trailers/jurassic.mp4" },
  { title: "Joker 2", genre: "Drama", language: "English", resolution: "4k", image: "joker2.jpeg", link: "movie.html" },
  { title: "Flash", genre: "Action", language: "English", resolution: "1080p", image: "flash.jpeg", link: "movie.html" },
  { title: "Deadpool and Wolverine", genre: "Action", language: "English", resolution: "4k", image: "deadpool.jpeg", link: "movie.html" },
  { title: "Batman", genre: "Action", language: "English", resolution: "4k", image: "batman.jpeg", link: "movie.html" },
  { title: "Ballerina", genre: "Action", language: "English", resolution: "1080p", image: "ballerina.jpeg", link: "movie.html" },
  { title: "Avatar", genre: "Sci-Fi", language: "English", resolution: "4k", image: "avatar.jpeg", link: "movie.html" }
];

// ===== SIDEBAR LOGIN STATE =====
onAuthStateChanged(auth, (user) => {
  const sidebarMenu = document.getElementById("sidebarMenu");
  sidebarMenu.innerHTML = `
    <li><a href="index.html">Home</a></li>
    ${user ? `
      <li><a href="profile.html">Profile</a></li>
      <li><a href="watchlist.html">Watchlist</a></li>
      <li><a href="settings.html">Settings</a></li>
      <li><a href="#" id="logoutLink">Logout</a></li>
    ` : `
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Signup</a></li>
    `}
  `;
  if (user) {
    document.getElementById("logoutLink").addEventListener("click", () => {
      signOut(auth);
    });
  }
});

// ===== RENDER MOVIES =====
const movieList = document.getElementById("movieList");
function renderMovies(list) {
  movieList.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="images/${movie.image}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title.replace(":", "<br>")}</h3>
        <div class="movie-buttons">
          <a href="${movie.link}" class="play-btn">Play</a>
          <button class="watchlist-btn" data-title="${movie.title}">+</button>
        </div>
      </div>
    `;
    movieList.appendChild(card);
  });
  attachWatchlistEvents();
}
renderMovies(movies);

// ===== FILTERS =====
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("languageFilter").addEventListener("change", applyFilters);
document.getElementById("resolutionFilter").addEventListener("change", applyFilters);

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const genre = document.getElementById("genreFilter").value;
  const language = document.getElementById("languageFilter").value;
  const resolution = document.getElementById("resolutionFilter").value;

  const filtered = movies.filter(movie =>
    (movie.title.toLowerCase().includes(search)) &&
    (genre === "all" || movie.genre === genre) &&
    (language === "all" || movie.language === language) &&
    (resolution === "all" || movie.resolution === resolution)
  );
  renderMovies(filtered);
}

// ===== WATCHLIST =====
function attachWatchlistEvents() {
  document.querySelectorAll(".watchlist-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Login to use watchlist");
        return;
      }
      let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const title = btn.getAttribute("data-title");
      if (watchlist.includes(title)) {
        watchlist = watchlist.filter(m => m !== title);
        btn.textContent = "+";
      } else {
        watchlist.push(title);
        btn.textContent = "✓";
      }
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    });
  });
}
