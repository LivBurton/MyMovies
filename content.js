const searchedFor = document.getElementById('searched-for');
const watchCard = document.getElementById('watch-card');
const allMovies = document.getElementById('all-movies');

class Content {
  constructor() {
    this.titlesWatchlist = [];
  }

  // ---show movie information from search-----
  contentMovie(results, genres) {
    const search = document.getElementById('search-movie');
    const matches = results.total_results;

    if (search.value === "") {
      searchedFor.innerHTML = `
      <h5>Enter a film to get started!</h5>      
      `;
    } else if (results.total_results === 0) {
      searchedFor.innerHTML = `
      <h5>Your search returned no results, try another search!</h5>      
      `;
    } else if (results.total_results === 1) {
      searchedFor.innerHTML = `
      <h5>You searched for "${search.value}"</h5>
      <h5 class="text-light font-italic searchResult">There is ${matches} matching result:</h5>
      `;

    } else if (results.total_results <= 10) {
      searchedFor.innerHTML = `
      <h5>You searched for "${search.value}"</h5>
      <h5 class="text-light font-italic searchResult">There are ${matches} matching results:</h5>
      `;

    } else {
      searchedFor.innerHTML = `
      <h5>You searched for "${search.value}"</h5>
      <h6 class="text-light searchResult">There are ${matches} matching results. Here are the first 10. You could try adding another word?</h6>
      `;
    }

    this.contentCard(results, genres);

    // --------clear input field------------
    search.value = '';

  }

  contentCard(results, genres) {
    // ---------clear the content----------------
    allMovies.innerHTML = '';
    let x = 0;

    if (results.total_results <= 10 && results.total_results > 0) {
      x = results.total_results;

    } else if (results.total_results > 10) {
      x = 10;
    }

    for (let i = 0; i < x; i++) {
      // ----to set ID of button------
      const btnId = results.results[i].title.split(' ').join('');

      allMovies.innerHTML += `
      <div class="card-body border-top">
        <h4 class="card-title d-inline listTitle font-weight-bold">${results.results[i].title}</h4>
        <div class="media mt-2">
          <img class="mr-3 mt-1 imageStyle"
          src="https://image.tmdb.org/t/p/original${results.results[i].poster_path}">
          <div class="media-body">
             <h6 class="mt-3 mb-5">Release date: ${results.results[i].release_date}</h6>

          <h6 class="mb-5">Average vote: ${results.results[i].vote_average}</h6>

          <button class="btn btn-success mt-4 d-block btn-add" id="${btnId}">Add to List</button>

        </div>
      </div>         
      
      </div>
`;

      if (this.titlesWatchlist.length > 0) {
        this.titlesWatchlist.forEach(function (film) {
          if (film === results.results[i].title) {
            content.changeBtnAdd(btnId, true);
          }
        });
      }

      const ul = document.createElement('ul');
      ul.className = 'px-2';

      //  ----add the genres-------
      for (let j = 0; j < genres.genres.length; j++) {
        for (let k = 0; k < results.results[i].genre_ids.length; k++) {
          if (genres.genres[j].id === results.results[i].genre_ids[k]) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(genres.genres[j].name));
            li.className = ' badge badge-pill badge-primary py-2 px-3 mx-2 mb-3';
            ul.appendChild(li);
          }
        }
      }
      allMovies.appendChild(ul);

      allMovies.innerHTML += `
<div class="mx-3 mb-4">
<h5 class="card-title mb-2 mt-0 font-weight-bold">Summary</h5>
<p class="card-text">${results.results[i].overview}</p>
</div>
`;
    }
  }

  // -------add to titleswatchlist array---------
  addToWatchlist(btn, image, title, types) {
    if (btn.classList.contains('btn-danger')) {
      this.changeBtnAdd(btn.id, false);
    } else {
      this.titlesWatchlist.push(title);

      this.addToDropDown(image, title, types);

      this.changeBtnAdd(btn.id, true);
    }
  }


  //---------add to the watchlist dropdown if not already there-----
  addToDropDown(image, title, genres) {
    if (this.titlesWatchlist.length === 1) {
      watchCard.innerHTML = '';
    }

    watchCard.innerHTML += `
      <div class="media mb-2" >
        <img class="mr-3 mt-2 imageThumbnail" src="${image}">
        <div class="media-body div-media-body" id="${image}">
          <h5 class="watchTitle mt-1 mr-3">${title}<a href="#"><i class="far fa-times-circle remove float-right"></i></a></h5>
          
          </div>
          </div>
`;

    const ul = document.createElement('ul');
    ul.className = 'px-2';

    genres.forEach(function (type) {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(type));
      li.className = ' mt-1 badge badge-pill badge-primary py-2 px-3 mr-2 my-1';
      ul.appendChild(li);
    });

    const mediaBody = document.getElementById(image);
    mediaBody.appendChild(ul);
  }

  deleteAlert(title) {
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = `<p>${title}</p>`;
    $('#modal-delete').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteFromWatchlist() {
    const remove = document.querySelector('.remove-div');
    const modalTitle = document.getElementById('modal-title');

    const removeTitle = remove.children[1].children[0].innerText;

    const titleString = modalTitle.firstChild.textContent;
    const btnId = titleString.split(' ').join('');

    const index = content.titlesWatchlist.indexOf(titleString);
    if (index > -1) {
      content.titlesWatchlist.splice(index, 1);
    }
    $('#modal-delete').modal('hide')
    storage.deleteFromLocal(removeTitle);
    remove.remove();

    content.changeBtnAdd(btnId, false);

    if (content.titlesWatchlist.length === 0) {
      watchCard.innerHTML = `<h6 id="empty-title">Your WatchList is empty</h6>`;
    }
  }

  keepOnWatchlist() {
    const remove = document.querySelector('.remove-div');
    remove.className = 'media mb-2';
    $('#modal-delete').modal('hide')
  }

  changeBtnAdd(btnId, added) {
    const btn = document.getElementById(btnId);
    if (added) {
      btn.className = 'btn btn-danger mt-4 d-block';
      btn.textContent = 'Remove from Watchlist'
    } else if (btn !== null && added === false) {
      btn.className = 'btn btn-success mt-4 d-block';
      btn.textContent = 'Add to Watchlist'
    }
  }

  selectDeleteAll() {
    $('#modal-delete-all').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteAllWatchlist() {
    $('#modal-delete-all').modal('hide')
    watchCard.innerHTML = `<h6 id="empty-title">Your WatchList is empty</h6>`;
    content.titlesWatchlist = [];

    localStorage.clear();

    const btns = document.getElementsByClassName('btn-danger');
    const btnArray = [];

    for (let i = 0; i < btns.length; i++) {
      btnArray.push(btns[i].id);
    }

    btnArray.forEach(function (id) {
      for (let i = 0; i < btns.length; i++) {
        if (id === btns[i].id) {
          btns[i].innerText = 'Add to Watchlist';
          btns[i].className = 'btn btn-success mt-4 d-block';
        }
      }
    });
  }

}