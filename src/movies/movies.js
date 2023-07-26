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
      GetMoviesByFilters(genres_selected);
    })

    
  })
}


function GetMoviesByFilters(filters){
  console.log("Filters ", filters);
  let query = "";
  filters.map( (value) =>{
    query += genres[value] + ",";
  })

  // Eliminamos el ultimo elemento de la query, que es una ","
  query = query.slice(0,-1);

  fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&with_genres="+query).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        console.log(data);
        document.getElementById("movies_container").innerHTML = '';
        data.results.map((value) =>{
          PrintMovie(value);
        })
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
  
}
  
  




