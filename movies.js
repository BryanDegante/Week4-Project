const movieListEl = document.querySelector('.movie__description')
const imdbID = localStorage.getItem("imdbID")


async function renderMovies(imdbID) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=7def6ab0&i=${imdbID}`);
    const moviesData = await movies.json();
    movieListEl.innerHTML = movieBody(moviesData);
}


function movieBody(movie) {
    return `<div class="movie__poster">${movie.Poster}</div>
    <div class="movie__title">${movie.Title}</div>
    <div class="movie__realease">${movie.Released}</div>
    <div class="moive__runtime">${movie.Runtime}</div>
    <div class="movie__Age-rating">${movie.Rated}</div>
    <div class="movie__Director">${movie.Director}</div>
    <div class="movie__writer">${movie.Writer}</div>
    <div class="movie__actors">${movie.Actor}</div>
    <div class="movie__plot">${movie.Plot}</div>

    `;
    
}

renderMovies(imdbID);