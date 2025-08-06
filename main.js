const movies = [
  { title: "Fantastic 4: First Steps", img: "fantastic4.jpg" },
  { title: "Avengers: Doomsday", img: "avengers.jpg" },
  { title: "Oppenheimer", img: "oppenheimer.jpg" },
  { title: "Superman: The Last Hope", img: "superman.jpeg" },
  { title: "Interstellar", img: "interstellar.jpg" },
  { title: "Inception", img: "inception.jpg" },
  { title: "28 Days Later", img: "28yearslater.jpeg" },
  { title: "Minecraft", img: "minecraft.jpeg" },
  { title: "F1", img: "f1.jpg" },
  { title: "Final Destination", img: "finaldestination.jpeg" },
  { title: "Dune", img: "dune.jpg" },
  { title: "Wicked", img: "wicked.avif" },
  { title: "Thunderbolts", img: "thunderbolts.jpg" },
  { title: "Spider-Man: No Way Home", img: "spiderman.jpg" },
  { title: "Matrix Resurrections", img: "matrix.jpg" },
  { title: "Kalki 2898 AD", img: "kalki.jpg" },
  { title: "Emergency", img: "emergency.jpeg" },
  { title: "Jurassic World", img: "jurassic.jpg" },
  { title: "Joker 2", img: "joker2.jpg" },
  { title: "Flash", img: "flash.jpg" },
  { title: "Deadpool and Wolverine", img: "deadpool.jpg" },
  { title: "Batman", img: "batman.jpg" },
  { title: "Ballerina", img: "ballerina.jpg" },
  { title: "Avatar", img: "avatar.jpg" },
];

function renderMovies() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";
  movies.forEach((movie, i) => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.dataset.index = i;
    div.innerHTML = `
      <img src="images/${movie.img}" alt="${movie.title}">
      <div class="movie-info">${movie.title.replace(":", "<br>")}</div>
      <div class="card-actions">
        <button onclick="watchMovie(${i})">Watch Now</button>
        <button onclick="toggleWatchlist(${i})">${isInWatchlist(i) ? "✓" : "+"}</button>
      </div>
    `;
    movieList.appendChild(div);
  });
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
  updateSidebar();
}

function updateSidebar() {
  const sidebar = document.getElementById("sidebar");
  const isLoggedIn = !!localStorage.getItem("user");
  sidebar.innerHTML = "";

  if (isLoggedIn) {
    ["Profile", "Watchlist", "Already Watched", "Settings", "Logout"].forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item;
      btn.onclick = () => {
        if (item === "Logout") {
          localStorage.removeItem("user");
          updateSidebar();
          alert("Logged out");
        }
      };
      sidebar.appendChild(btn);
    });
  } else {
    ["Login", "Signup"].forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item;
      btn.onclick = () => alert(`${item} clicked`);
      sidebar.appendChild(btn);
    });
  }
}

function watchMovie(index) {
  if (!localStorage.getItem("user")) {
    alert("Please login to watch");
    window.location.href = "login.html";
    return;
  }
  window.location.href = "watch.html";
}

function toggleWatchlist(index) {
  if (!localStorage.getItem("user")) {
    alert("Please login to use watchlist");
    return;
  }
  let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
  if (watchlist.includes(index)) {
    watchlist = watchlist.filter(i => i !== index);
  } else {
    watchlist.push(index);
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  renderMovies();
}

function isInWatchlist(index) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
  return watchlist.includes(index);
}

document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".movie-card").forEach(card => {
    const text = card.querySelector(".movie-info").textContent.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
});

["genreFilter", "languageFilter", "resolutionFilter"].forEach(id => {
  document.getElementById(id).addEventListener("change", () => {
    // Add your logic if filtering by genre/lang/res
  });
});

renderMovies();
updateSidebar();
