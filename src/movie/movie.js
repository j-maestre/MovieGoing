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
        console.log(data)
        PrintMovieDetails(data);
        GetSimilar();
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function PrintProviders(providers){
  providers.map( (v) =>{
    let container_platform = document.getElementById("movie_platforms");
    let link = document.createElement("a");
    link.href = search_path_before + v.provider_name + search_path_after;
    link.target = "_blank";
    let p_img = document.createElement("img");
    p_img.src = img_path + v.logo_path; 
    link.appendChild(p_img);
    container_platform.appendChild(link);

  });
}

function PrintMovieDetails(data){
    let container = document.getElementById("movie");
    container.style.backgroundImage = `url('${img_path+data.backdrop_path}')`;

    document.getElementById("details_movie_poster").src = img_path+data.poster_path;

    // Status
    let status = document.getElementById("status");
    status.innerHTML = data.status;

    if(data.status == "Released"){
      status.classList.add("status_released");
    }else{
      status.classList.add("status_waiting");
    }

    document.getElementById("movie_title").innerHTML = data.title + " (" + data.release_date.substring(0,4) + ")";
    
    // Guardar en mi lista
    //let icon = document.getElementById("details_list_bookmark");
    let icon = document.createElement("i");
    icon.classList.add("fa-bookmark");
    icon.classList.add("list_icon");
    icon.classList.add("list_button_details");
    
    // TODO
    if(localStorage.getItem("islogged") == "true"){

      let isSaved = isInList(data.id);
      
      // Añadimos esta clase si esta guardada en la lista
      if(isSaved){
        icon.classList.add("fa-solid");          
      }else{
        icon.classList.add("fa-regular");
      }
    }else{
      icon.classList.add("fa-regular");
    }

    icon.addEventListener("click", function(){
      AddToList(data.id);
      
      // TODO Redundancia, pediente de optimizacion
      if(isInList(data.id)){
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }else{
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    });
    document.getElementById("movie_title").appendChild(icon);


    // Cogemos todos los generos
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
    
    
    // Descripcion
    if(data.vote_count == 0){
      rating_element.classList.add("normal_rating");
      rating_element.innerHTML = "Not rated yet";
    }

    document.getElementById("details_movie_description").innerHTML = data.overview;

    // Tagline
    document.getElementById("tagline_movie_description").innerHTML = data.tagline;


    let filmafinity = document.getElementById("movie_filmafinity");
    filmafinity.href = filmafinity_path + data.title;

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
        console.log(data.results["ES"]);
        // Hay veces que existe buy, otras que existe flatrate, otras que existe ads y otras que existen todas
        // Tambien esta "rent" pero me la pela
        let esp = data.results["ES"].buy?data.results["ES"].buy:[];
        PrintProviders(esp);
        esp = data.results["ES"].flatrate?data.results["ES"].flatrate:[];
        PrintProviders(esp);
        esp = data.results["ES"].ads?data.results["ES"].ads:[];
        PrintProviders(esp);

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
      PrintMovie(value, "similar_container");    
    });

}