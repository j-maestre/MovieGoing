window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    GetInfo();

}


function GetInfo(){

    let id = localStorage.getItem("Details");
    let container = document.getElementById("details_container");

    fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        PrintMovie(data);
        GetSimilar();
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function PrintMovie(data){
    let container = document.getElementById("movie");
    container.style.backgroundImage = `url('${img_path+data.backdrop_path}')`;

    document.getElementById("movie_poster").src = img_path+data.poster_path;

    // Status
    let status = document.getElementById("status");
    status.innerHTML = data.status;

    if(data.status == "Released"){
      status.classList.add("status_released");
    }else{
      status.classList.add("status_waiting");
    }

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

    // Translation
    let lenguajes = document.getElementById("movie_languajes");
    let names = "";
    data.spoken_languages.map((val) =>{
      names += " " + val.english_name + ","
    });

    names = names.substring(0, names.length - 1) + ".";
    lenguajes.innerHTML += names;

    // Platforms
    fetch("https://api.themoviedb.org/3/movie/"+localStorage.getItem("Details")+"/watch/providers?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data);
        let esp = data.results["ES"].buy;
        console.log(esp);

        esp.map( (v) =>{
          let container_platform = document.getElementById("movie_platforms");
          let link = document.createElement("a");
          link.href = search_path_before + v.provider_name + search_path_after;
          link.target = "_blank";
          let p_img = document.createElement("img");
          p_img.src = img_path + v.logo_path; 
          link.appendChild(p_img);
          container_platform.appendChild(link);

        });
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });


    // Companies names
    let com_container = document.getElementById("companies_container");
    data.production_companies.map( (value) =>{
      let containerDiv = document.createElement("div");
      containerDiv.classList.add("company_card");
      com_container.appendChild(containerDiv);

      // Company name
      let title = document.createElement("p");
      title.innerHTML = value.name;
      containerDiv.appendChild(title);

      // Company img
      let img = document.createElement("img");
      img.src = img_path + value.logo_path;
      img.alt = "Company img";
      img.classList.add("company_img");
      containerDiv.appendChild(img);
    });


}

function GetSimilar(){
    let id = localStorage.getItem("Details");

    fetch("https://api.themoviedb.org/3/movie/"+id+"/similar?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        PrintSimilar(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function PrintSimilar(data){
    let container = document.getElementById("similar_container");

    data.results.map( (value) =>{
        
        let newDiv = document.createElement("div");
        //newDiv.classList.add("card");
        newDiv.classList.add("movie_similar");

        let principal_container = document.createElement("div");
        newDiv.appendChild(principal_container);
        principal_container.addEventListener("click",function(event){
          //event.preventDefault();
          localStorage.setItem("Details",value.id);
          window.location.href = "../movie/movie.html";
        });
        

        // Get img
        let img = document.createElement("img");
        img.src = img_path + value.poster_path ;
        img.classList.add("img_similar_poster");
        principal_container.appendChild(img);

        // Rating
        let rating = document.createElement("p");
        rating.classList.add("rating_similar");
        
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
        
        // Title
        let title = document.createElement("p");
        title.innerHTML = value.original_title;
        principal_container.appendChild(title);
        
        // Description
        let description = document.createElement("a");
        //description.innerHTML = value.overview;
        description.innerHTML = "Read on filmafinity";
        description.classList.add("movie_similar_description");
        description.href = filmafinity_path + value.original_title;
        description.target = "_blank";
        newDiv.appendChild(description);


        container.appendChild(newDiv);
        // img in value.poster_path
    });

}