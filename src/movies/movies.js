window.addEventListener('load',onDocumentReady,false);

let actual_page = 1;
let genres_selected = [];
let rating = -1.0;
let max_page = 1;
let total_movies = 0;

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
    PrepareFilters();
    PrepareMenuFunctions();

    document.getElementById("next_page").addEventListener("click",function NextPage(){
      if(actual_page < max_page){
        actual_page = actual_page + 1;
      }
      GetMoviesByFilters(genres_selected,rating,actual_page);
    });
    
    document.getElementById("previous_page").addEventListener("click",function NextPage(){
      if(actual_page > 1){
        actual_page = actual_page - 1;
      }
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

function CheckPageRange(){
  if(actual_page == max_page){
    document.getElementById("next_page").classList.add("disabled");
  }else{
    document.getElementById("next_page").classList.remove("disabled");
  }
  
  if(actual_page == 1){
    document.getElementById("previous_page").classList.add("disabled");
  }else{
    document.getElementById("previous_page").classList.remove("disabled");
  }

  // Si hay 3 o menos cuidao
  if(total_movies <= 3){
    document.getElementById("movies_and_buttons_container").classList.add("more_margin_left");
  }else{
    document.getElementById("movies_and_buttons_container").classList.remove("more_margin_left");
  }

  if(total_movies <= 4){
    document.body.style.height = '100%';
  }else{
    document.body.style.height = 'auto';
  }
}

function GetCartelera(){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        PrintCartelera(data);
        total_movies = data.total_results;
        CheckPageRange();
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });}

function PrintCartelera(data){
    //console.log(data);
    max_page = data.total_pages;
    data.results.map((value) =>{
      PrintMovie(value);
    })
}



async function PrepareFilters(){
  // Pintar los checkbox
  let genres_container =  document.getElementById("filter_genre_container");
  let movie_genres = await GetMovieGenres();


  movie_genres.map((value) =>{
    console.log("hola");
    console.log("genero-> " + value);
    // <p class="filters_item"><input type="checkbox" id="c1-13" value="Action">Action</p>
    let p = document.createElement("p");
    p.classList.add("filters_item");
    
    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = "c1-13";
    input.value = value.name;
    p.appendChild(input);
    p.innerHTML += value.name;
    genres_container.appendChild(p);
  })

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
        max_page = data.total_pages;
        data.results.map((value) =>{
          PrintMovie(value);
        })
        total_movies = data.total_results;
        CheckPageRange();

        document.getElementById("actual_page_marker").innerHTML = actual_page;
        
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



