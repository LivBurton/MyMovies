// https://image.tmdb.org/t/p/original/zlyhKMi2aLk25nOHnNm43MpZMtQ.jpg
// poster image

// https://image.tmdb.org/t/p/original/heHPL3kGWy4pMGkSg2g9Nd5QT4C.jpg
// https://api.themoviedb.org/3/movie/343611?api_key={api_key}
// query movie id
// https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1
// https://api.themoviedb.org/3/search/movie?api_key=e53aea562042152ddcac36ae95af1f60&query=Jack+Reacher
// https://api.themoviedb.org/3/genre/movie/list?api_key=e53aea562042152ddcac36ae95af1f60&language=en-US
class Movie {
  constructor(movie) {
    this.movie = 'Jack+Reacher';
    this.apiKey = 'e53aea562042152ddcac36ae95af1f60';
    // this.id = 1; 
  }

  // fetch movie data

  async getData() {
    const [movieResponse, genreResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.movie}`),
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)

    ]);
    const movies = await movieResponse.json();
    const genres = await genreResponse.json();

    return {
      movies,
      genres
    };


    // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.movie}`);    
    // const responseData = await response.json();
    // return responseData;     

  }

  // fetch genre data
  // async fetchGenres(id){
  //   const response = await fetch(`https://api.themoviedb.org/3/movie/343611?api_key=${this.apiKey}`);
  //   const responseData = await response.json();

  //   return responseData; 
  // }

  changeMovie(search) {
    this.movie = search;
    // console.log(search);
  }



}