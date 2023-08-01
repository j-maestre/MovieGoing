window.addEventListener('load',onDocumentReady,false);

let actual_page = 1;
let genres_selected = [];
let rating = -1.0;

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
    PrepareFilters();
    PrepareMenuFunctions();
    document.getElementById("next_page").addEventListener("click",function NextPage(){
      actual_page = actual_page + 1;
      GetMoviesByFilters(genres_selected,rating,actual_page);
    });
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
  const allInputs = document.getElementsByTagName('input');
  const checkboxes = Array.from(allInputs).filter(input => input.type === 'checkbox');
  checkboxes.map( (element) =>{

    element.addEventListener("change", (event) =>{
      if(event.target.checked){
        // Checkbox marcado
        genres_selected.push(event.target.value);
      }else{
        // Checkbox desmarcado
        let new_genres = genres_selected.filter( (value) =>{
          return value !== event.target.value;
        })
        
        genres_selected = new_genres;

      }
      GetMoviesByFilters(genres_selected, rating, actual_page);
    })

    
  })
}


function GetMoviesByFilters(genres_selected = null, rating = -1.0, actual_page){
  console.log("Genres ", genres_selected);
  console.log("Rating ", rating);
  let query = "";
  if(genres_selected){

    genres_selected.map( (value) =>{
      query += genres[value] + ",";
    })
  }

  // Eliminamos el ultimo elemento de la query, que es una ","
  query = query.slice(0,-1);


  fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&with_genres="+query+"&vote_average.gte="+rating + "&page="+actual_page).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        document.getElementById("movies_container").innerHTML = '';
        console.log(data);
        data.results.map((value) =>{
          PrintMovie(value);
        })
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
  
}


  
function PrepareMenuFunctions(){

  let average_text = document.getElementById("average_show");

  // No se me ha ocurrido de hacer esto en un bucle porque tengo que coger el elemento de debajo del que hago click, que no es hijo ni es na
  document.getElementById("filter_genre").addEventListener("click",function(event){
    // Añadimos la clase active al contenedor de los filtros
    document.getElementById("filter_genre_container").classList.toggle("filter_active");

    // Añadimos la clase active a la flecha del titulo
    event.target.children[0].classList.toggle("arrow_active");
  });

  document.getElementById("filter_average").addEventListener("click", function(event){
    document.getElementById("slider_average").classList.toggle("filter_active");
    average_text.classList.toggle("filter_active");
    event.target.children[0].classList.toggle("arrow_active");
  });  

  document.getElementById("slider_average").addEventListener("input",function(event){
    average_text.innerHTML = event.target.value; 
    rating = event.target.value;
    GetMoviesByFilters(genres_selected,rating, actual_page);
  })

}



