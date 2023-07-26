window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
    PrepareFilters();
 
}
function GetCartelera(){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        PrintCartelera(data);
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });}

function PrintCartelera(data){
    

    let container = document.getElementById("cartelera_container");
    data.results.map((value) =>{
      PrintMovie(value);
    })
}

function PrepareFilters(){
  let genres_selected = [];
  const allInputs = document.getElementsByTagName('input');
  const checkboxes = Array.from(allInputs).filter(input => input.type === 'checkbox');
  checkboxes.map( (element) =>{

    element.addEventListener("change", (event) =>{
      if(event.target.checked){
        // Checkbox marcado

        genres_selected.push(event.target.value);
        console.log(genres_selected)
        //console.log(genres[genres_selected[0]])
      }else{
        // Checkbox desmarcado

      }
    })
    if(element.checked){
      console.log(element.value)
      console.log(genres[element.value])
    }
  })
}

