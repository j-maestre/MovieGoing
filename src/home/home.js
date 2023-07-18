window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
}
function GetCartelera(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data);
        PrintCartelera(data);
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });}

function PrintCartelera(data){
    

    let container = document.getElementById("cartelera_container");
    data.results.map((value) =>{
        console.log(value);
        
        let newDiv = document.createElement("div");
        newDiv.classList.add("movie");
        container.appendChild(newDiv);

        let principal_container = document.createElement("div");
        newDiv.appendChild(principal_container);
        principal_container.addEventListener("click",function(event){
            localStorage.setItem("Details",value.id);
            window.location.href = "../movie/movie.html"
        });

        let img = document.createElement("img");
        img.src = img_path + value.poster_path ;
        img.classList.add("img_poster");
        principal_container.appendChild(img);

        let rating = document.createElement("p");
        rating.classList.add("rating");

        if(value.vote_average < 4.0){
          rating.classList.add("very_bad_rating");
        }
        if(value.vote_average >= 4.0 && value.vote_average < 5.3){
          rating.classList.add("bad_rating");
        }
        if(value.vote_average >= 5.3 && value.vote_average <6.5){
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

        let title = document.createElement("p");
        title.innerHTML = value.original_title;
        principal_container.appendChild(title);

        let description = document.createElement("a");
        description.innerHTML = "Read on filmafinity";
        description.classList.add("movie_description");
        description.href = filmaffinity_path + value.original_title;
        description.target= "_blank";
        newDiv.appendChild(description);

        container.appendChild(newDiv);


    })
}