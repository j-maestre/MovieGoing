window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready Index");
    GetUser();
    document.getElementById("search_button").addEventListener("click",SearchMovie);
    document.getElementById("input_search").addEventListener("keydown", function(event){
      if(event.keyCode == 13){
        SearchMovie();
      }
    });
}

function SearchMovie(){
  let movie_name = document.getElementById("input_search").value;
  sessionStorage.setItem("MovieToSearch", movie_name);
  window.location.href = "../search/search.html"
}

function GetUser(){
    let isLogged = localStorage.getItem("islogged");
    console.log(isLogged);
    let userLogged = null;
    let profile_element = document.createElement("p");
    profile_element.innerHTML = "Login or Singin";
    
    if(isLogged == "true"){
        console.log("Hay usuario");
        userLogged = JSON.parse(localStorage.getItem("UserLogged"));
        console.log(userLogged);
        
        let profile_container = document.getElementById("profile_container");
        let container = document.createElement("div");
        container.classList.add("perfil_container");
        container.addEventListener("click", function(){
          window.location.href = "../profile/profile.html"
        })

        let profile_pic = document.createElement("img");
        console.log(userLogged.profile_pic)
        profile_pic.src = userLogged.ProfilePic ? userLogged.ProfilePic: "https://thispersondoesnotexist.com/" ;
        //profile_pic.src = "https://thispersondoesnotexist.com/";
        
        
        container.appendChild(profile_pic);
        //profile_container.appendChild(profile_pic);
        profile_container.appendChild(container);
        profile_element.innerHTML = userLogged.Username;   

        // Como no hay link, metemos el texto tal cual
        //profile_container.appendChild(profile_element);
        container.appendChild(profile_element);
    }else{
        // Creamos elemento a para enlace a Login
        let link = document.createElement("a");
        link.href = "../login/login.html";
        link.appendChild(profile_element);
        profile_container.appendChild(link);
    }

}

function AddToList(id){
    console.log("pa dentro "+ id);

    // Comprobar primero si esta logueado
    let logued = localStorage.getItem("islogged");
    if(!logued || logued == "false"){
        window.location.href = "../login/login.html";
    }


    let list = []; 
    list = JSON.parse(localStorage.getItem("UserLogged")).List;
    console.log(list);

    // Si no esta en la lista lo añadimos
    if(!isInList(id)){
        console.log("No esta en la lista");
        // Guardar el id de la film
        if(list != null){
            // Añadimos nuevo id al final
            list.push(id);
        }else{
            // Es la primera vez que guardamos algo
            list = [];
            list[0] = id;
        }    
    }else{
        // Ya esta en la lista, lo quitamos

        // Creamos un array auxiliar
        let listAux = [];

        list.map( (num) =>{
            // Si el id es diferente del que queremos eliminar, añadimos ese id al nuevo array
            if(num != id){
                listAux.push(num);
            }
        })


        // Ahora la nueva lista tiene todos los demas ids excepto el que queriamos eliminar
        list = listAux;
    }
    
    //localStorage.setItem("List", JSON.stringify(list));
    // JSON.parse(localStorage.getItem(localStorage.key(i)))
    UpdateList(list);

}

// Function to update list of the logued user
function UpdateList(newList){
  // Primero cogemos el usuario de la lista de usuarios por su index
  let users = JSON.parse(localStorage.getItem("UsersRegistered"));
  let userLogued = JSON.parse(localStorage.getItem("UserLogged"));
  let index = -1;
  users.map( (value, i) =>{
    if(value.Username == userLogued.Username){
      // Guardamos el index del usuario
      index = i;
    }
  });

  if(index != -1){
    // Actualizamos la lista de peliculas del usuario y sobreescribimos los usuarios con sus datos
    users[index].List = newList;
    localStorage.setItem("UsersRegistered",JSON.stringify(users));
    localStorage.setItem("UserLogged",JSON.stringify(users[index]));
  }
}

function isInList(id){

    // Comprobar si el id esta en la lista de guardados
    let list = [];
    list = JSON.parse(localStorage.getItem("UserLogged")).List;

    let isInList = false;
    
    // Recorremos todos los ids
    if(list != null){
        list.map( (value) =>{
            // Si el id coincide con el que estamos buscando, ponemos isInList a true
            if(value === id){
                isInList = true;
            }
        });
    }

    // Devolvemos el resultado de la busqueda
    return isInList;

}

// Function to print movie card in a container
function PrintMovie(value, container_id = "movies_container"){

    //console.log(value);
    let container = document.getElementById(container_id);
  
    let newDiv = document.createElement("div");
    //newDiv.classList.add("card");
    newDiv.classList.add("movie");


    let principal_container = document.createElement("div");
    principal_container.classList.add("movie_principal_container");
    newDiv.appendChild(principal_container);
    
    // Get img
    let img = document.createElement("img");
    img.src = img_path + value.poster_path ;
    img.classList.add("img_poster");
    
    img.addEventListener("click",function(event){
      //event.preventDefault();
      localStorage.setItem("Details",value.id);
      localStorage.setItem("Type","Film");
      window.location.href = "../movie/movie.html";
    });
    principal_container.appendChild(img);

    // Rating
    let rating = document.createElement("p");
    rating.classList.add("rating");
    
    if(value.vote_average < 4.0){
      rating.classList.add("very_bad_rating");
    }
    if(value.vote_average >= 4.0 && value.vote_average < 5.3){
      rating.classList.add("bad_rating");
    }
    
    if(value.vote_average >= 5.3 && value.vote_average < 6.5){
      rating.classList.add("normal_rating");
    }
    
    if(value.vote_average >= 6.5 && value.vote_average < 8.0){
      rating.classList.add("good_rating");
    }
    
    if(value.vote_average >= 8.0){
      rating.classList.add("very_good_rating");
    }
    rating.innerHTML = parseFloat(value.vote_average).toFixed(1);
    principal_container.appendChild(rating);

    // Descripcion
    if(value.vote_count == 0){
      rating.classList.add("normal_rating");
      rating.innerHTML = "Not rated yet";
    }


    // Guardar en mi lista
    let list = document.createElement("p");
    list.classList.add("list_button");
    let icon = document.createElement("i");
    icon.classList.add("fa-bookmark");
    icon.classList.add("list_icon");
    icon.classList.add("list_button");

    if(localStorage.getItem("islogged") == "true"){

      let isSaved = isInList(value.id);
      // Añadimos esta clase si esta guardada en la lista
      if(isSaved){
        icon.classList.add("fa-solid");          
      }else{
        icon.classList.add("fa-regular");
      }
    }else{
      icon.classList.add("fa-regular");
    }

    icon.addEventListener("click", function(){
      AddToList(value.id);
      
      // TODO Redundancia, pediente de optimizacion
      if(isInList(value.id)){
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }else{
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    });
    principal_container.appendChild(icon);


    // Title
    let title = document.createElement("p");
    title.innerHTML = value.title;
    principal_container.appendChild(title);
    
    // Description
    let description = document.createElement("a");
    //description.innerHTML = value.overview;
    description.innerHTML = "Read on filmafinity";
    description.classList.add("movie_description");
    description.href = filmafinity_path + value.title;
    description.target = "_blank";
    newDiv.appendChild(description);


    container.appendChild(newDiv);
    // img in value.poster_path

}

function PrintSerie(value, container_id = "series_container"){

  //console.log(value);
  let container = document.getElementById(container_id);
  
  let newDiv = document.createElement("div");
  //newDiv.classList.add("card");
  newDiv.classList.add("movie");


  let principal_container = document.createElement("div");
  principal_container.classList.add("movie_principal_container");
  newDiv.appendChild(principal_container);
  
  // Get img
  let img = document.createElement("img");
  img.src = img_path + value.poster_path ;
  img.classList.add("img_poster");
  
  img.addEventListener("click",function(event){
    //event.preventDefault();
    localStorage.setItem("Details",value.id);
    localStorage.setItem("Type","serie");
    window.location.href = "../movie/movie.html";
  });
  principal_container.appendChild(img);

  // Rating
  let rating = document.createElement("p");
  rating.classList.add("rating");
  
  if(value.vote_average < 4.0){
    rating.classList.add("very_bad_rating");
  }
  if(value.vote_average >= 4.0 && value.vote_average < 5.3){
    rating.classList.add("bad_rating");
  }
  
  if(value.vote_average >= 5.3 && value.vote_average < 6.5){
    rating.classList.add("normal_rating");
  }
  
  if(value.vote_average >= 6.5 && value.vote_average < 8.0){
    rating.classList.add("good_rating");
  }
  
  if(value.vote_average >= 8.0){
    rating.classList.add("very_good_rating");
  }
  rating.innerHTML = parseFloat(value.vote_average).toFixed(1);
  principal_container.appendChild(rating);

  // Descripcion
  if(value.vote_count == 0){
    rating.classList.add("normal_rating");
    rating.innerHTML = "Not rated yet";
  }


  // Guardar en mi lista
  let list = document.createElement("p");
  list.classList.add("list_button");
  let icon = document.createElement("i");
  icon.classList.add("fa-bookmark");
  icon.classList.add("list_icon");
  icon.classList.add("list_button");

  if(localStorage.getItem("islogged") == "true"){

    let isSaved = isInList(value.id);
    // Añadimos esta clase si esta guardada en la lista
    if(isSaved){
      icon.classList.add("fa-solid");          
    }else{
      icon.classList.add("fa-regular");
    }
  }else{
    icon.classList.add("fa-regular");
  }

  icon.addEventListener("click", function(){
    AddToList(value.id);
    
    // TODO Redundancia, pediente de optimizacion
    if(isInList(value.id)){
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    }else{
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });
  principal_container.appendChild(icon);


  // Title
  let title = document.createElement("p");
  title.innerHTML = value.name;
  principal_container.appendChild(title);
  
  // Description
  let description = document.createElement("a");
  //description.innerHTML = value.overview;
  description.innerHTML = "Read on filmafinity";
  description.classList.add("movie_description");
  description.href = filmafinity_path + value.name;
  description.target = "_blank";
  newDiv.appendChild(description);


  container.appendChild(newDiv);
  // img in value.poster_path
  


}