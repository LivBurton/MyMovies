// ---------------------------------
// INITIALISE OBJECTS
// ---------------------------------
// $('#modal-delete').modal('show')
// $(document).ready(function(){
//   $('#modal-delete').modal({
//     backdrop: 'static',
//     keyboard: false
//   });
// });

const movie = new Movie();
const content = new Content();
// ---------------------------------
// VARIABLES
// ---------------------------------
const btnSearch = document.getElementById('btn-search');
const searchMovie = document.getElementById('search-movie');
const btnDelete = document.getElementById('btn-delete');
const btnKeep = document.getElementById('btn-keep');


// --------------------------------
// EVENT LISTENERS
// --------------------------------
btnSearch.addEventListener('click', getSearch);
allMovies.addEventListener('click', clickAdd);
watchCard.addEventListener('click', selectDelete);
btnDelete.addEventListener('click', content.deleteFromWatchlist);
btnKeep.addEventListener('click', content.keepOnWatchlist);

function getSearch(e){
  // replace/change these if and else once use local storage have if for blank and one for the entry already there
  const results = "";
 if(searchMovie.value !== ""){
  const search = searchMovie.value.split(' ').join('+');
  movie.changeMovie(search);
  getMovieData();
 }else{
   content.contentMovie(results);
 }
  
  e.preventDefault();
}

function getMovieData(){
  movie.getData() 
  .then(({movies, genres}) => {   
    content.contentMovie(movies, genres);
  })  
  .catch(err => console.log(err)); 
}

function clickAdd(e){
  if (e.target.id==='btn-add'){
    const image = e.target.parentElement.previousElementSibling.src;
    const title = e.target.parentElement.parentElement.previousElementSibling.textContent;    
    const types = e.target.parentElement.parentElement.parentElement.nextElementSibling.childNodes;    

    content.addToWatchlist(image, title, types);    

  }
}

function selectDelete(e){
  if(e.target.classList.contains('remove')){
    e.target.parentElement.parentElement.parentElement.parentElement.className+= ' remove-div';   
content.deleteAlert(e.target.parentElement.parentElement.textContent);
  }
}

