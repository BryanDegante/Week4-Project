const movieListEl = document.querySelector(".movies")
const pageListEl = document.querySelector(".page__list");
let movieName = localStorage.getItem("movieName") || "Avengers";
let page = 1;
let year = '';
let type = "";

async function main(movieName, type, page, year) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=7def6ab0&s=${movieName}&type=${type}&page=${page}&y=${year}`);
  const movieData = await movies.json();
  const movieList = movieData.Search;
  const check = movieData.Response;
  
  if (check === 'True') {
    movieListEl.innerHTML = movieList.map((user) => moviesHtml(user)).join("");
    pageListEl.innerHTML = moviePages(movieData.totalResults, movieName);
    
  }
  else if (check == 'False'){
    alert('No title Found. Please try again!!');
  }
  
}

main(movieName, type, page, year);

function showUserMovies(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = `${window.location.origin}/movies.html`
}

async function onSearchChange(event) {
  movieName = event.target.value;
  localStorage.setItem("movieName", movieName);
  main(movieName, type, page, year);
}

function moviePages(totalResults, movieName) {
  let pages = Math.ceil(totalResults / 10);
  let pageList = [];
  for (let i = 1; i <= pages; i++) {
    pageList.push(`<a class = "page__link" onclick = "main('${movieName}','${type}',${i},'${year}')">${i}</a>`)
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
}

function resetYear() {
  page = 1;
  year = '';
  document.getElementById("slider__range").value = '';
  document.getElementById("demo").innerHTML = '';
}

function openMenu() {
  document.body.classList += " filter--open"
}

function closeMenu() {
  document.body.classList.remove('filter--open')
}

function changeType(elm) {
  if (elm == 'movie')
  {
    type = elm;
  }
  else if (elm == 'show') {
    type = 'series';
  }
  else if (elm == 'game') {
    type = 'game';
  }

}

function resetFilters(){
  resetYear();
  type = '';
  closeMenu();

  main(movieName,type,page,year)
}

function applyFilters() {
  changeType();
  
  main(movieName, type, page, year)
  closeMenu();
}