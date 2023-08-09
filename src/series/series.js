window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetSeries();

}

function GetSeries(){
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key="+api_key).then(function(response) {
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

    data.results.map( (value) =>{
        
      PrintMovie(value)
    });

}