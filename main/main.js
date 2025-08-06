const movies = [
  { title: "Avengers: Doomsday", image: "avengers.jpg", genre: "action", language: "english", format: "3D" },
  { title: "Batman: Rise", image: "batman.jpg", genre: "action", language: "english", format: "2D" },
  { title: "Ballerina: Vengeance", image: "ballerina.jpg", genre: "thriller", language: "english", format: "2D" },
  { title: "Deadpool: Unleashed", image: "deadpool.jpg", genre: "action", language: "english", format: "3D" },
  { title: "Emergency: India 2023", image: "emergency.jpg", genre: "thriller", language: "hindi", format: "2D" },
  { title: "Fantastic 4: First Steps", image: "fantastic4.jpg", genre: "sci-fi", language: "english", format: "3D" },
  { title: "Flashwave: Dimensions", image: "flashwave.jpg", genre: "action", language: "english", format: "3D" },
  { title: "Inception: Layers", image: "inception.jpg", genre: "sci-fi", language: "english", format: "2D" },
  { title: "Interstellar: Beyond", image: "interstellar.jpg", genre: "sci-fi", language: "english", format: "2D" },
  { title: "Joker 2: Laugh's End", image: "joker2.jpg", genre: "thriller", language: "english", format: "2D" },
  { title: "Jurassic World: Extinct", image: "jurassicworld.jpg", genre: "sci-fi", language: "english", format: "3D" },
  { title: "Kalki 2898 AD", image: "kalki.jpg", genre: "sci-fi", language: "hindi", format: "3D" },
  { title: "Matrix: Reloaded", image: "matrix.jpg", genre: "sci-fi", language: "english", format: "2D" },
  { title: "Minecraft: Realm", image: "minecraft.jpg", genre: "animated", language: "english", format: "2D" },
  { title: "Oppenheimer: Legacy", image: "oppenheimer.jpg", genre: "thriller", language: "english", format: "2D" },
  { title: "Spiderman: No Hope", image: "spiderman.jpg", genre: "action", language: "english", format: "3D" },
  { title: "Superman: Return", image: "superman.jpg", genre: "action", language: "english", format: "2D" },
  { title: "Thunderbolt: Surge", image: "thunderbolt.jpg", genre: "action", language: "english", format: "2D" }
];

const container = document.getElementById("movieContainer");

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.setAttribute("data-genre", movie.genre);
  card.setAttribute("data-language", movie.language);
  card.setAttribute("data-format", movie.format);

  const titleParts = movie.title.split(":");

  card.innerHTML = `
    <img src="images/${movie.image}" alt="${movie.title}">
    <button class="watchlist-btn">+</button>
    <div class="movie-title">
      <span>${titleParts[0]}</span>
      <span>${titleParts[1] || ""}</span>
    </div>
    <button class="watch-now" onclick="handleWatch('${movie.title}')">Watch Now</button>
  `;

  const watchlistBtn = card.querySelector(".watchlist-btn");
  const saved = localStorage.getItem(movie.title);
  if (saved === "true") watchlistBtn.textContent = "✓";

  watchlistBtn.addEventListener("click", () => {
    const isSaved = localStorage.getItem(movie.title) === "true";
    localStorage.setItem(movie.title, !isSaved);
    watchlistBtn.textContent = !isSaved ? "✓" : "+";
  });

  return card;
}

function renderMovies() {
  container.innerHTML = "";
  movies.forEach(movie => container.appendChild(createMovieCard(movie)));
}

function filterMovies() {
  const genre = document.getElementById("genreFilter").value;
  const lang = document.getElementById("languageFilter").value;
  const format = document.getElementById("formatFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  const cards = document.querySelectorAll(".movie-card");

  cards.forEach(card => {
    const matchGenre = genre === "all" || card.dataset.genre === genre;
    const matchLang = lang === "all" || card.dataset.language === lang;
    const matchFormat = format === "all" || card.dataset.format === format;
    const matchSearch = card.textContent.toLowerCase().includes(search);

    card.style.display = matchGenre && matchLang && matchFormat && matchSearch ? "block" : "none";
  });
}

function handleWatch(title) {
  if (confirm(`You need to log in to watch ${title}. Proceed to login?`)) {
    window.location.href = "login.html";
  }
}

document.getElementById("genreFilter").addEventListener("change", filterMovies);
document.getElementById("languageFilter").addEventListener("change", filterMovies);
document.getElementById("formatFilter").addEventListener("change", filterMovies);
document.getElementById("searchInput").addEventListener("input", filterMovies);

renderMovies();
