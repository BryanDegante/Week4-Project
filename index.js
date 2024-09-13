const movieListEl = document.querySelector(".movies")

async function main() {
    const movies = await fetch("https://www.omdbapi.com/?apikey=7def6ab0&s=batman&type=series");
    const movieData = await movies.json();
    const movieList = movieData.Search
    console.log(movieData)
    console.log(movieList)
    movieListEl.innerHTML = movieList.map((user) => moviesHtml(user)).join("");
}

function moviesHtml(user) {
    return `<div class="movie">
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
                    <i class="fas fa-star"> </i>
                  </div>
                </div>
              </div>
    `;
}



main();