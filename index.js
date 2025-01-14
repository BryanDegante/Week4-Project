const movieListEl = document.querySelector(".movies")
const pageListEl = document.querySelector(".page__list");
let movieName = localStorage.getItem("movieName") || "None";
let page = 1;
let year = '';

async function main(movieName, page, year) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=7def6ab0&s=${movieName}&type=movie&page=${page}&y=${year}`);
  const movieData = await movies.json();
  const movieList = movieData.Search;
  movieListEl.innerHTML = movieList.map((user) => moviesHtml(user)).join("");
  pageListEl.innerHTML = moviePages(movieData.totalResults, movieName);
}

main(movieName, page, year);

function showUserMovies(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = `${window.location.origin}/movies.html`
  console.log(window.location.origin);
}

async function onSearchChange(event) {
  movieName = event.target.value;
  localStorage.setItem("movieName", movieName);
  main(movieName, page, year);
}

function moviePages(totalResults, movieName) {
  let pages = Math.ceil(totalResults / 10);
  let pageList = [];
  for (let i = 1; i <= pages; i++) {
    pageList.push(`<a class = "page__link" onclick = "main('${movieName}',${i},year)">${i}</a>`)
  }
  return pageList.join("");
}

function moviesHtml(user) {
  return `
    <div class="movie" onclick = "showUserMovies('${user.imdbID}')" >
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
    </div>
    `;
}

function movieYear() {
  var slider = document.getElementById("slider__range");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  year = (slider.value).toString();
  main(movieName, page, year);
}

function resetMovies() {
  page = 1;
  year = '';
  document.getElementById("slider__range").value = 1900;
  document.getElementById("demo").innerHTML = '';
  main(movieName, page, year);
}

