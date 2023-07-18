window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetUser();
}


function GetUser(){
    let isLogged = localStorage.getItem("islogged");
    let userLogged =null;
    if(isLogged){
        console.log("Hay usuario");
        userLogged = JSON.parse(localStorage.getItem("UserLogged"));
        console.log(userLogged);
        let profile_element = document.getElementById("profile");
        profile_element.innerHTML = userLogged.Username;

    }
}

