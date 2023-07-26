window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    GetTotalMovies();
    document.getElementById("random_movie").addEventListener("click", function(){
      GetTotalMovies();
    });
}
function GetTotalMovies(){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data)
        CalculeRandom(data);
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}
// https://api.themoviedb.org/3/discover/movie?api_key={tu_clave_de_api}&page=2

function CalculeRandom(data){
  //let maxPages = data.total_pages;
  let maxPages = 500;
  let minPages = 1;
  let pageRandom = Math.floor(Math.random() * (maxPages - minPages + 1) + minPages);

  // Cogemos una pagina aleatoria y luego una pelicula aleatoria dentro de las que hay en esa pagina
  // El numero total de paginas es mayor al disponible, la api solo deja poner de pagina maxima la 500 para que el rendimiento no se vea afectado
  // Esto puede cambiar en el futuro asi que lo dejo comentado
  fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&page="+pageRandom).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data.results)
        console.log();
        
        let randomMovie = Math.floor(Math.random() * (data.results.length - 1));
        console.log(randomMovie);
        console.log(data.results[randomMovie]);
        PrintMovie(data.results[randomMovie]);
        
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

}


