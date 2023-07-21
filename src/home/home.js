window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
}
function GetCartelera(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        PrintCartelera(data);
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });}

function PrintCartelera(data){
    

    let container = document.getElementById("cartelera_container");
    data.results.map((value) =>{
      PrintMovie(value);
    })
}

