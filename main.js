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
  { title: "Avatar", genre: "Sci-Fi", lang: "English", format: "4K", img: "avatar.jpg" }
];

// Utility to split titles like "Fantastic 4: First Steps"
function formatTitle(title) {
  const parts = title.split(":");
  return parts.length > 1 ? `${parts[0]}<br><span>${parts[1].trim()}</span>` : title;
}

// Load all movies on page
function displayMovies(list) {
  const container = document.getElementById("movie-list");
  container.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.genre = movie.genre;
    card.dataset.lang = movie.lang;
    card.dataset.format = movie.format;

    card.innerHTML = `
      <img src="posters/${movie.img}" alt="${movie.title}">
      <div class="card-overlay">
        <div class="watch-now"><a href="watch.html">Watch Now</a></div>
        <div class="add-watchlist">+</div>
      </div>
      <h3 class="movie-title">${formatTitle(movie.title)}</h3>
    `;

    container.appendChild(card);
  });

  setupWatchlist();
}

displayMovies(movies);

// Search functionality
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
  displayMovies(filtered);
});

// Filter by genre/language/format
["genre", "lang", "format"].forEach(filterId => {
  document.getElementById(filterId).addEventListener("change", function () {
    const genre = document.getElementById("genre").value;
    const lang = document.getElementById("lang").value;
    const format = document.getElementById("format").value;

    const filtered = movies.filter(movie =>
      (genre === "" || movie.genre === genre) &&
      (lang === "" || movie.lang === lang) &&
      (format === "" || movie.format === format)
    );

    displayMovies(filtered);
  });
});

// Hover behavior
document.addEventListener("mouseover", function (e) {
  if (e.target.closest(".movie-card")) {
    e.target.closest(".movie-card").classList.add("hovered");
  }
});
document.addEventListener("mouseout", function (e) {
  if (e.target.closest(".movie-card")) {
    e.target.closest(".movie-card").classList.remove("hovered");
  }
});

// Sidebar menu toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

// Sidebar login/logout visibility
function updateSidebarMenu() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  document.querySelector(".sidebar .login").style.display = loggedIn ? "none" : "block";
  document.querySelector(".sidebar .signup").style.display = loggedIn ? "none" : "block";
  document.querySelector(".sidebar .logout").style.display = loggedIn ? "block" : "none";
  document.querySelector(".watchlist-link").style.display = loggedIn ? "block" : "none";
}
updateSidebarMenu();

// Logo click refresh
document.getElementById("logo").addEventListener("click", () => location.reload());

// Watchlist management
function setupWatchlist() {
  document.querySelectorAll(".add-watchlist").forEach(btn => {
    btn.addEventListener("click", function () {
      const title = this.closest(".movie-card").querySelector(".movie-title").innerText.replace(/\n/g, ": ").replace(/\s+/g, ' ').trim();
      let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

      if (watchlist.includes(title)) {
        watchlist = watchlist.filter(item => item !== title);
        this.textContent = "+";
      } else {
        watchlist.push(title);
        this.textContent = "✓";
      }

      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    });

    // Show ✓ if already added
    const title = btn.closest(".movie-card").querySelector(".movie-title").innerText.replace(/\n/g, ": ").replace(/\s+/g, ' ').trim();
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (watchlist.includes(title)) {
      btn.textContent = "✓";
    }
  });
}
