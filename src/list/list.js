window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetMylistMovies();

}

function GetMylistMovies(){
  let list = JSON.parse(localStorage.getItem("UserLogged")).List;
  list.map( (id) =>{
    fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key).then(function(response) {
      return response.json();
    }).then(function(data) {
      PrintMovie(data);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    
  })
}



