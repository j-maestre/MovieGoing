window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');

    fetch("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query=Barbie").then(function(response) {
        return response.json();
        
      }).then(function(data) {
       
        console.log(data);
        data.results.map((value)=>{
            
            PrintMovie(value);
        })
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
