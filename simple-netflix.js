// api url : https://api.themoviedb.org/3/
// doc main: https://www.themoviedb.org/documentation/api?language=fr
// api doc API: https://developers.themoviedb.org/3/getting-started/introduction
// API KEY: XXXXXX
// img url: https://image.tmdb.org/t/p/original/

const API_KEY = 'XXXXXX';
  
const createHTML = () => {
  const element = document.querySelector('#myApp');
  element.innerHTML = `
    <div class="movies"></div>
    <div class="discover"></div>
  `;
}

const loadTrending = () =>  {
  // avant ...
  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      let movies = data.results;
      console.log(movies);
      
      // avec .map()
      const listMoviesHTML = movies.map(movie => {
        return `
        <div class="movie">
          <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}">
          <h2>${movie.title}</h2>
          <p>${movie.overview}</p>
        </div>
        `;
      }).join('');
      document.querySelector('.movies').innerHTML = listMoviesHTML;
  
  
      // // avec .foreach()
      // movies.forEach(movie => {
      //   let html = `
      //   <div class="movie">
      //     <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}">
      //     <h2>${movie.title}</h2>
      //     <p>${movie.overview}</p>
      //   </div>`;
      //   document.querySelector('.movies').innerHTML += html;
      // });
    })
    .catch(error => {
      
    });
  
  // apres ....
}

const loadDiscover = async () => {

  const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
    .then(response => response.json());
  
  // const demo1 = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
  // .then(response => response.json());
  // const demo2 = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
  // .then(response => response.json());

  // const result =  Promise.all([
  //   demo1, 
  //   demo2
  // ])
  
  console.log(data);
  let movies = data.results;
  console.log(movies);
  
  // avec .map()
  const listMoviesHTML = movies.map(movie => {
    return `
    <div class="movie">
      <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>${movie.overview}</p>
    </div>
    `;
  }).join('');
  document.querySelector('.discover').innerHTML = listMoviesHTML;

};

createHTML();
loadTrending();
loadDiscover();

