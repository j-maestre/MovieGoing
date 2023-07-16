window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetInfo();

}

function GetInfo(){

    let id = localStorage.getItem("Details");
    let container = document.getElementById("details_container");

    fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data);
        PrintMovie(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function PrintMovie(data){
    let container = document.getElementById("movie");
    container.style.backgroundImage = `url('${img_path+data.backdrop_path}')`;

    document.getElementById("movie_poster").src = img_path+data.poster_path;

    // Cogemos todos los generos
    document.getElementById("movie_title").innerHTML = data.title + " (" + data.release_date.substring(0,4) + ")";
    let genres_element = document.getElementById("movie_genres");
    let genres_text = "";

    // Metemos todos los generos en un array y añadimos un espacio al principio y una coma al final
    data.genres.map((v) =>{
        genres_text += " " + v.name+",";
    });

    // Borramos la ultima coma y ponemos un punto
    genres_text = genres_text.substring(0, genres_text.length - 1) + ".";
    genres_element.innerHTML = genres_text;


    // Rating
    let rating_element = document.getElementById("movie_rating");
    rating_element.innerHTML = parseFloat(data.vote_average).toFixed(1);
    console.log(data.vote_average);

    if(data.vote_average < 4.0){
        rating_element.classList.add("very_bad_rating");
    }
    
    if(data.vote_average >= 4.0 && data.vote_average < 5.3){
        rating_element.classList.add("bad_rating");
    }
    
    if(data.vote_average >= 5.3 && data.vote_average < 6.5){
        rating_element.classList.add("normal_rating");
    }
    
    if(data.vote_average >= 6.5 && data.vote_average < 8.0){
        rating_element.classList.add("good_rating");
    }
    
    if(data.vote_average >= 8.0){
        rating_element.classList.add("very_good_rating");
    }

   document.getElementById("movie_description").innerHTML = data.overview;

   let filmafinity = document.getElementById("movie_filmafinity");
   filmafinity.href = filmafinity_path + data.original_title;
}