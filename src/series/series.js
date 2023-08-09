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
        PrintSeries(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

}

function PrintSeries(data){
  console.log("hola")
  data.results.map((value)=>{
    console.log(value)
    PrintSerie(value)

  })
}
