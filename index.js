const movieListEl = document.querySelector(".movies")
let movieName = localStorage.getItem("movieName") || "batman";


async function main(movieName) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=7def6ab0&s=${movieName}&type=movie`);
    const movieData = await movies.json();
    const movieList = movieData.Search
  movieListEl.innerHTML = movieList.map((user) => moviesHtml(user)).join("");
  console.log(movieList);
  console.log(movieName);
}

main(movieName);

function showUserMovies(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = `${window.location.origin}/movies.html`
}

async function onSearchChange(event) {
  movieName = event.target.value; 
  localStorage.setItem("movieName", movieName);
  main(movieName);
}

function moviesHtml(user) {
  return `<div class="movie" onclick = "showUserMovies('${user.imdbID}')" >
                <figure>
                  <img
                    src="${user.Poster}"
                    alt=""
                    class="movie__list--poster"
                  />
                </figure>
                <div class="movie__description">
                  <h3 class="movie__title white"> ${user.Title}</h3>
                  <p class="movie__year white">( ${user.Year} )</p>
                </div>
              </div>
    `;
}

