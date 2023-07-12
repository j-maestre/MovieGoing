window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetPopular();

}

const img_path = "https://image.tmdb.org/t/p/w500/";
const filmafinity_path = "https://www.filmaffinity.com/es/search.php?stext=";

function GetPopular(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key="+api_key).then(function(response) {
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
        //newDiv.classList.add("card");
        newDiv.classList.add("movie");

        // Get img
        let img = document.createElement("img");
        img.src = img_path + value.poster_path ;
        img.classList.add("img_poster");
        newDiv.appendChild(img);
        
        // Title
        let title = document.createElement("p");
        title.innerHTML = value.original_title;
        newDiv.appendChild(title);
        
        // Description
        let description = document.createElement("a");
        //description.innerHTML = value.overview;
        description.innerHTML = "Read on filmafinity";
        description.classList.add("movie_description");
        description.href = filmafinity_path + value.original_title;
        description.target = "_blank";
        newDiv.appendChild(description);


        container.appendChild(newDiv);
        // img in value.poster_path
    });

}