window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    let movieName = sessionStorage.getItem("MovieToSearch");

    fetch("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+movieName).then(function(response) {
        return response.json();
        
      }).then(function(data) {
       
        console.log(data);
        console.log(data.results.length);

        document.getElementById("search_movie_title").innerHTML = movieName;

        if(data.results.length == 0){
          let title = document.createElement("h2");
          title.innerHTML = "0 results";
          document.getElementById("movies_container").appendChild(title);
          document.body.style.height = '100%';
        }
        data.results.map((value)=>{
            PrintMovie(value);
        })
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
