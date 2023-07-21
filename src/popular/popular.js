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
        principal_container.classList.add("movie_principal_container");
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

        // Guardar en mi lista
        let list = document.createElement("p");
        list.classList.add("list_button");
        let icon = document.createElement("i");
        icon.classList.add("fa-bookmark");
        icon.classList.add("list_icon");
        icon.classList.add("list_button");
        
        // TODO
        let isSaved = isInList(value.id);

        // Añadimos esta clase si esta guardada en la lista
        if(isSaved){
          icon.classList.add("fa-solid");          
        }else{
          icon.classList.add("fa-regular");
        }

        icon.addEventListener("click", function(){
          AddToList(value.id);
          
          // TODO Redundancia, pediente de optimizacion
          if(isInList(value.id)){
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
          }else{
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
          }
        });
        principal_container.appendChild(icon);


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


