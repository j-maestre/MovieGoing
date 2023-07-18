window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetPopular();

}

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
        
        let newDiv = document.createElement("div");
        //newDiv.classList.add("card");
        newDiv.classList.add("movie");


        let principal_container = document.createElement("div");
        newDiv.appendChild(principal_container);
        
        // Get img
        let img = document.createElement("img");
        img.src = img_path + value.poster_path ;
        img.classList.add("img_poster");
        img.addEventListener("click",function(event){
          //event.preventDefault();
          localStorage.setItem("Details",value.id);
          window.location.href = "../movie/movie.html";
        });

        principal_container.appendChild(img);

        // Rating
        let rating = document.createElement("p");
        rating.classList.add("rating");
        
        if(value.vote_average < 4.0){
          rating.classList.add("very_bad_rating");
        }
        if(value.vote_average >= 4.0 && value.vote_average < 5.3){
          rating.classList.add("bad_rating");
        }
        
        if(value.vote_average >= 5.3 && value.vote_average < 6.5){
          rating.classList.add("normal_rating");
        }
        
        if(value.vote_average >= 6.5 && value.vote_average < 8.0){
          rating.classList.add("good_rating");
        }
        
        if(value.vote_average >= 8.0){
          rating.classList.add("very_good_rating");
        }
        rating.innerHTML = parseFloat(value.vote_average).toFixed(1);
        principal_container.appendChild(rating);

        // <div class="heart-like-button"></div>
        let heart = document.createElement("div");
        heart.classList.add("heart");
        principal_container.appendChild(heart);


        heart.addEventListener("click", function(){
          if(heart.classList.contains("is_animating")){
            // La borro, y sino la añado
            heart.classList.remove("is_animating");
          }else{
            heart.classList.add("is_animating");
          }
        });
        heart.addEventListener("touchstart", function(){
          if(heart.classList.contains("is_animating")){
            // La borro, y sino la añado
            heart.classList.remove("is_animating");
          }else{
            heart.classList.add("is_animating");
          }
        });

        // Agregar un EventListener para detectar cuando termina la animación y quitar la clase 'is_animating'
        heart.addEventListener("animationend", function () {
          //heart.classList.remove("is_animating");
          //heart.classList.remove("heart_active");
        });


        // Title
        let title = document.createElement("p");
        title.innerHTML = value.original_title;
        principal_container.appendChild(title);
        
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