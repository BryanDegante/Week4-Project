const movieListEl = document.querySelector(".movie__description--single");
const imdbID = localStorage.getItem("imdbID");

async function renderMovies(imdbID) {
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=7def6ab0&i=${imdbID}`
  );
  const moviesData = await movies.json();
  movieListEl.innerHTML = movieBody(moviesData);
}

function movieBody(movie) {
     return `<div class="movie__description--header">
              <div class="movie__title--single">${movie.Title}</div>
              <div class="movie__ratings"></div>
            </div>
            <div class="movie__wrapper">
              <div class="movie__poster--wrapper">
                <div class="movie__description--poster">
                  <img src="${movie.Poster}" class="movie__poster" alt="" />
                </div>
              </div>
              <div class="movie__description--text">
                <div class="movie__realease"> <span class="white">Released</span>${movie.Released}</div>
                <div class="moive__runtime"> <span class="white">Runtime</span>${movie.Runtime}</div>
                <div class="movie__Age-rating"><span class="white">Rated</span>${movie.Rated}</div>
                <div class="movie__Director"><span class="white">Director</span>${movie.Director}</div>
                <div class="movie__writer"><span class="white">Writer</span>${movie.Writer}</div>
                <div class="movie__actors"><span class="white">Actors</span>${movie.Actors}</div>
                <div class="movie__genre"><span class="white">Genre</span>${movie.Genre}</div>
                <div class="movie__plot"><span class="white">${movie.Plot}</span></div>
              </div>
            </div >
                `;
}

renderMovies(imdbID);
