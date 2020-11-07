// ---------------------------------
// INITIALISE OBJECTS
// ---------------------------------

const movie = new Movie();
const content = new Content();
// ---------------------------------
// VARIABLES
// ---------------------------------
const btnSearch = document.getElementById('btn-search');
const searchMovie = document.getElementById('search-movie');
const btnDelete = document.getElementById('btn-delete');
const btnKeep = document.getElementById('btn-keep');
const btnClearWatchlist = document.getElementById('btn-clear-watchlist');
const btnDeleteAll = document.getElementById('btn-delete-all');

// ---------------------------------
// LOCAL STORAGE
// ---------------------------------
const storage = new Storage();

document.addEventListener('DOMContentLoaded', loadStorage);

function loadStorage() {
  storage.getFilmData();
}

// --------------------------------
// EVENT LISTENERS
// --------------------------------
btnSearch.addEventListener('click', getSearch);
allMovies.addEventListener('click', clickAdd);
watchCard.addEventListener('click', selectDelete);
btnDelete.addEventListener('click', content.deleteFromWatchlist);
btnKeep.addEventListener('click', content.keepOnWatchlist);
btnClearWatchlist.addEventListener('click', content.selectDeleteAll);
btnDeleteAll.addEventListener('click', content.deleteAllWatchlist);

function getSearch(e) {
  const results = "";
  if (searchMovie.value !== "") {
    const search = searchMovie.value.split(' ').join('+');
    movie.changeMovie(search);
    getMovieData();
  } else {
    content.contentMovie(results);
  }
  e.preventDefault();
}

function getMovieData() {
  movie.getData()
    .then(({ movies, genres }) => {
      content.contentMovie(movies, genres);
    })
    .catch(err => console.log(err));
}

function clickAdd(e) {
  if (e.target.classList.contains('btn-danger')) {
    const title = e.target.parentElement.parentElement.parentElement.childNodes[1].innerText;
    const watchTitles = document.querySelectorAll('.watchTitle');
    watchTitles.forEach(function (film) {
      if (title === film.innerText) {
        film.parentElement.parentElement.className = 'media mb-2 remove-div';
      }
    });
    content.deleteAlert(title);
  } else if (e.target.classList.contains('btn-success')) {
    let genres = [];
    const image = e.target.parentElement.previousElementSibling.src;
    const title = e.target.parentElement.parentElement.previousElementSibling.textContent;
    const types = e.target.parentElement.parentElement.parentElement.nextElementSibling.childNodes;

    types.forEach(function (item) {
      genres.push(item.innerHTML);
    });
    content.addToWatchlist(e.target, image, title, genres);

    storage.setFilmData(title, image, genres);
  }
}

function selectDelete(e) {
  if (e.target.classList.contains('remove')) {
    e.target.parentElement.parentElement.parentElement.parentElement.className += ' remove-div';
    content.deleteAlert(e.target.parentElement.parentElement.textContent);
  }
}




