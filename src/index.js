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

