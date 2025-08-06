const firebaseConfig = {
  // Replace with your config
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const movies = [
  { title: "Fantastic 4: First Steps", genre: "Action", lang: "English", format: "1080p", img: "fantastic4.jpeg" },
  { title: "Avengers: Doomsday", genre: "Action", lang: "English", format: "4K", img: "avengers.jpg" },
  { title: "Oppenheimer", genre: "Historical", lang: "English", format: "1080p", img: "oppenheimer.jpg" },
  { title: "Superman: The Last Hope", genre: "Action", lang: "English", format: "1080p", img: "superman.jpeg" },
  { title: "Interstellar", genre: "Sci-Fi", lang: "English", format: "4K", img: "interstellar.jpg" },
  { title: "Inception", genre: "Sci-Fi", lang: "English", format: "1080p", img: "inception.jpg" },
  { title: "28 Years Later", genre: "Thriller", lang: "English", format: "1080p", img: "28yearslater.jpeg" },
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

const movieContainer = document.getElementById("movieContainer");
const genreFilter = document.getElementById("genreFilter");
const languageFilter = document.getElementById("languageFilter");
const resolutionFilter = document.getElementById("resolutionFilter");
const searchBar = document.getElementById("searchBar");

function renderMovies() {
  const genre = genreFilter.value;
  const lang = languageFilter.value;
  const res = resolutionFilter.value;
  const query = searchBar.value.toLowerCase();

  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    if ((genre === "All" || movie.genre === genre) &&
        (lang === "All" || movie.lang === lang) &&
        (res === "All" || movie.format === res) &&
        movie.title.toLowerCase().includes(query)) {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="images/${movie.img}" alt="${movie.title}">
        <h3>${movie.title.replace(":", "<br>")}</h3>
        <div class="actions">
          <button>Watch Now</button>
          <button>+</button>
        </div>
      `;
      movieContainer.appendChild(card);
    }
  });
}

[genreFilter, languageFilter, resolutionFilter, searchBar].forEach(el => {
  el.addEventListener("input", renderMovies);
});

renderMovies();

document.getElementById("menu-toggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "flex" ? "none" : "flex";
});

auth.onAuthStateChanged(user => {
  const sidebarLinks = document.getElementById("sidebarLinks");
  sidebarLinks.innerHTML = "";

  if (user) {
    ["Profile", "Watchlist", "Already Watched", "Settings", "Logout"].forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.onclick = () => {
        if (item === "Logout") auth.signOut();
      };
      sidebarLinks.appendChild(li);
    });
  } else {
    ["Login", "Signup"].forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.onclick = () => location.href = `${item.toLowerCase()}.html`;
      sidebarLinks.appendChild(li);
    });
  }
});
