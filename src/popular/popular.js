window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");

    GetPopular();



    
}

const img_path = "https://image.tmdb.org/t/p/w500/";

function GetPopular(){

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=8ecf1bb435e2b5c41e3afb8c8133ac75").then(function(response) {
        return response.json();
        
      }).then(function(data) {
        //console.log(data);
        PrintMovies(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

}

function PrintMovies(data){

    console.log(data);
    console.log(data.results[0]);

    let container = document.getElementById("movies_container");

    data.results.map( (value) =>{
        console.log(value);
        
        let newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.classList.add("movie");
        // img in value.poster_path
    });

}