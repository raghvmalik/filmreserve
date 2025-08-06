import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMPr-C_p--9isHVBmH6QuOxCR93dgscYs",
  authDomain: "film-reserve-255bc.firebaseapp.com",
  projectId: "film-reserve-255bc",
  storageBucket: "film-reserve-255bc.appspot.com",
  messagingSenderId: "856235605413",
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

function renderMovies() {
  movieList.innerHTML = "";
  const genre = document.getElementById("genre-filter").value;
  const lang = document.getElementById("language-filter").value;
  const format = document.getElementById("format-filter").value;
  const search = document.getElementById("search-input").value.toLowerCase();

  movies.forEach(movie => {
    if ((genre === "All" || movie.genre === genre) &&
        (lang === "All" || movie.lang === lang) &&
        (format === "All" || movie.format === format) &&
        movie.title.toLowerCase().includes(search)) {

      const [line1, line2] = movie.title.split(":");
      movieList.innerHTML += `
        <div class="movie-card">
          <img src="posters/${movie.img}" alt="${movie.title}" />
          <h3>${line1}${line2 ? `<br>${line2.trim()}` : ""}</h3>
          <div class="actions">
            <button onclick="watchMovie('${movie.title}')">Watch Now</button>
            <button onclick="toggleWatchlist('${movie.title}')">+</button>
          </div>
        </div>
      `;
    }
  });
}

window.watchMovie = (title) => {
  const user = auth.currentUser;
  if (!user) {
    window.location.href = "login.html";
  } else {
    window.location.href = "watch.html?title=" + encodeURIComponent(title);
  }
};

window.toggleWatchlist = (title) => {
  const user = auth.currentUser;
  if (!user) return;
  let list = JSON.parse(localStorage.getItem("watchlist") || "[]");
  if (list.includes(title)) {
    list = list.filter(t => t !== title);
  } else {
    list.push(title);
  }
  localStorage.setItem("watchlist", JSON.stringify(list));
};

["genre-filter", "language-filter", "format-filter", "search-input"].forEach(id =>
  document.getElementById(id).addEventListener("input", renderMovies)
);

document.getElementById("logo").onclick = () => location.reload();
document.getElementById("menu-btn").onclick = () =>
  document.getElementById("sidebar").classList.toggle("hidden");

onAuthStateChanged(auth, (user) => {
  const menu = document.getElementById("menu-items");
  menu.innerHTML = "";
  if (user) {
    menu.innerHTML += `
      <li onclick="location.href='profile.html'">Profile</li>
      <li onclick="location.href='watchlist.html'">Watchlist</li>
      <li onclick="location.href='watched.html'">Already Watched</li>
      <li onclick="location.href='settings.html'">Settings</li>
      <li onclick="logout()">Logout</li>
    `;
  } else {
    menu.innerHTML += `
      <li onclick="location.href='login.html'">Login</li>
      <li onclick="location.href='signup.html'">Signup</li>
    `;
  }
});

window.logout = () => {
  signOut(auth);
};

renderMovies();
