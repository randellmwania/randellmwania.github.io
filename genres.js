const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const GENREAPI =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1&language=en-US";

const main = document.getElementById("main");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const genresContainer = document.getElementById("genres");
let currentPage = 1;
let totalPages = 0;

// Get genres and display buttons in hamburger menu
async function getGenres() {
  const resp = await fetch(GENREAPI);
  const data = await resp.json();
  const genres = data.genres;
  genres.forEach((genre) => {
    const genreBtn = document.createElement("button");
    genreBtn.classList.add("genre-btn");
    genreBtn.innerText = genre.name;
    genreBtn.addEventListener("click", () => {
      currentPage = 1; // Reset current page when selecting a genre
      getMoviesByGenre(genre.id);
    });
    genresContainer.appendChild(genreBtn); // Append to genres container
  });
}

// initially get movies
getMovies(APIURL + currentPage);
getGenres();

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  totalPages = respData.total_pages;
  showMovies(respData.results);
}

async function getMoviesByGenre(genreId) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  const respData = await resp.json();
  totalPages = respData.total_pages;
  showMovies(respData.results);
}

function showMovies(movies) {
  // clear main if not loading more
  if (currentPage === 1) {
    main.innerHTML = "";
  }

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl);
  });

  // Show load more button if there are more pages
  if (currentPage < totalPages) {
    loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

// Load more button event
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  const nextPageUrl = `${APIURL}${currentPage}`;
  getMovies(nextPageUrl);
});

// Hamburger menu click event to toggle genres container
hamburgerMenu.addEventListener("click", () => {
  genresContainer.classList.toggle("active");
});
