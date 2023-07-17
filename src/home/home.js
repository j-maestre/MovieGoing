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

        
    })
}