class Movie {
  constructor(movie) {
    this.movie = 'Jack+Reacher';
    this.apiKey = 'e53aea562042152ddcac36ae95af1f60';    
  }

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
  }

  changeMovie(search) {
    this.movie = search;   
  }
}