window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready Index");
    GetUser();
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
        let profile_pic = document.createElement("img");
        profile_pic.src = "https://thispersondoesnotexist.com/";
        profile_container.appendChild(profile_pic);
        profile_element.innerHTML = userLogged.Username;   

        // Como no hay link, metemos el texto tal cual
        profile_container.appendChild(profile_element);
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
    if(logued == "false"){
        window.location.href = "../login/login.html";
    }


    let list = []; 
    list = JSON.parse(localStorage.getItem("List"));
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
    
    localStorage.setItem("List", JSON.stringify(list));
    // JSON.parse(localStorage.getItem(localStorage.key(i)))

}

function isInList(id){

    // Comprobar si el id esta en la lista de guardados
    let list = [];
    list = JSON.parse(localStorage.getItem("List"));

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

