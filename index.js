const movieListEl = document.querySelector(".movies")

async function main() {
    const movies = await fetch("https://www.omdbapi.com/?apikey=7def6ab0&s=Superman");
    const movieData = await movies.json();
    const movieList = movieData.Search
  movieListEl.innerHTML = movieList.map((user) => moviesHtml(user)).join("");
  console.log(movieList)
}

function showUserMovies(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = `${window.location.origin}/movies.html`
}


function moviesHtml(user) {
  return `<div class="movie" onclick = "showUserMovies('${user.imdbID}')" >
                <figure>
                  <img
                    src="${user.Poster}"
                    alt=""
                    class="movie__poster"
                  />
                </figure>
                <div class="movie__description">
                  <h3 class="movie__title"> ${user.Title}</h3>
                  <div class="movie__rating">
                  ${user.imdbID}
                    <i class="fas fa-star"> </i>
                  </div>
                </div>
              </div>
    `;
}


main();