window.addEventListener('load',onDocumentReady,false);

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
    PrepareFilters();
    PrepareMenuFunctions();

    // Esto desmarca todos los filtros cuando se cambia de pagina
    window.addEventListener("pageshow", function(event) {
      // Seleccionamos todos los checkbox y los desmarcamos
      let checkboxes = document.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });

    });
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
  
  
function PrepareMenuFunctions(){
  document.getElementById("filter_genre").addEventListener("click",function(event){
    // Añadimos la clase active al contenedor de los filtros
    console.log(event.target);
    document.getElementById("filter_genre_container").classList.toggle("filter_active");

    // Añadimos la clase active a la flecha del titulo
    event.target.children[0].classList.toggle("arrow_active");
  });
}



