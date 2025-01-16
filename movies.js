const movieListEl = document.querySelector(".movie__description--single");
const imdbID = localStorage.getItem("imdbID");

async function renderMovies(imdbID) {
    const movies = await fetch(
        `https://www.omdbapi.com/?apikey=7def6ab0&i=${imdbID}&plot=full`
    );
    const moviesData = await movies.json();
    movieListEl.innerHTML = movieBody(moviesData);
    console.log(moviesData);
}

function movieBody(movie) {
    return `<div class="movie__description--header">
              <h1 class="movie__title--single white">${movie.Title}</h1>
                <ul class="movie__ratings--list"> 
                    <li class = "movie__rating">
                    <span class="sub-heading white bold">IMDB Rating</span>
                    <i class="fa-solid fa-star"></i>
                    <span class = "blue">${movie.imdbRating}</span>
                    </li>
                </ul>
            
            </div>
            <div class="movie__wrapper">
                <figure class="movie__description--poster">
                  <img src="${movie.Poster}" class="movie__poster" alt="" />
                </figure>
              <div class="movie__description--text">
                <div class="movie__realease"><span class="sub-heading white bold">Released</span><span class="blue">${movie.Released}</span></div>
                <div class="movie__runtime"><span class="sub-heading white bold">Runtime</span><span class="blue">${movie.Runtime}</span></div>
                <div class="movie__Age-rating"><span class="sub-heading white bold">Rated</span><span class="blue">${movie.Rated}</span></div>
                <div class="movie__Director"><span class="sub-heading white bold">Director</span><span class="blue">${movie.Director}</span></div>
                <div class="movie__writer"><span class="sub-heading white bold">Writer</span><span class="blue">${movie.Writer}</span></div>
                <div class="movie__actors"><span class="sub-heading white bold">Actors</span><span class="blue">${movie.Actors}</span></div>
                <div class="movie__genre"><span class="sub-heading white bold">Genre</span><span class="blue">${movie.Genre}</span></div>
                <div class="movie__plot"><span class="white bold">${movie.Plot}</span></div>
              </div>
            </div >
                `;
}

function goBack() {
  window.location.href = `${window.location.origin}/movies.html`
}

renderMovies(imdbID);
