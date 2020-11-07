class Storage {
  constructor() {
    this.films;
    this.defaultFilms = [];
  }

  getFilmData() {
    if (localStorage.getItem('films') === null || JSON.parse(localStorage.getItem('films')).length === 0) {
      this.films = this.defaultFilms;
      watchCard.innerHTML = `<h6 id="empty-title">Your WatchList is empty</h6>`;

    } else {
      this.films = JSON.parse(localStorage.getItem('films'));
      this.films.forEach(function (film) {
        content.titlesWatchlist.push(film.title);
        content.addToDropDown(film.image, film.title, film.genres);
      });
    }
  }

  setFilmData(title, image, genres) {
    let filmList;
    if (localStorage.getItem('films') === null) {
      filmList = [];

    } else {
      filmList = JSON.parse(localStorage.getItem('films'));
    }

    filmList.push({ "title": title, "image": image, "genres": genres });

    localStorage.setItem('films', JSON.stringify(filmList));
  }

  deleteFromLocal(title) {
    let filmList;
    filmList = JSON.parse(localStorage.getItem('films'));
    filmList.forEach(function (film, index) {
      if (film.title === title) {
        filmList.splice(index, 1);
      }
    });

    localStorage.setItem('films', JSON.stringify(filmList));
  }
}
