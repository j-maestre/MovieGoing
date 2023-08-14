window.addEventListener('load',onDocumentReady,false);

let actual_page = 1;
let max_page = 1;
let total_movies = 0;

function onDocumentReady(){
    console.log('Ready');
    GetCartelera();
    
      document.getElementById("next_page").addEventListener("click",function NextPage(){
      if(actual_page < max_page){
        actual_page = actual_page + 1;
        GetCartelera();
        }
      });

      document.getElementById("previous_page").addEventListener("click",function NextPage(){
        if(actual_page > 1){
          actual_page = actual_page - 1;
          GetCartelera();
        }
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
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key+"&page="+actual_page).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        max_page = data.total_pages;
        PrintCartelera(data);
        CheckPageRange();
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });}

function PrintCartelera(data){
    

    let container = document.getElementById("movies_container");
    container.innerHTML="";
    document.getElementById("actual_page_marker").innerHTML = actual_page;
    data.results.map((value) =>{
      PrintMovie(value);
    })
}

document.getElementById("random_button").addEventListener("click", function() {
  
  window.location.href = "../random/random.html";
});