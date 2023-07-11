window.addEventListener('load', onDocumentReady, false);


function onDocumentReady(){
    console.log("Document ready");

    let islogged = localStorage.getItem("islogged");
    let username = localStorage.getItem("userName");

    // Mostramos solo el formulario de iniciar sesion
    //document.getElementById("singin").style.display = "none";
 
    document.getElementById("sing_in").addEventListener("click", function(event){
        event.preventDefault();
        SingIn();
    });
    document.getElementById("log_in").addEventListener("click", function(event){
        event.preventDefault();
        LogIn();
    });

    LogIn();

    let login = false;

    // Si ha guardado inciar sesion automaticamente
    if(islogged && username){
        // Go to home
    }

    if(login){
    }

}

function LogIn(){
    // Borramos el formulario de sing in
    document.getElementById("singin").style.display = "none";
    
    // Mostramos el formulario de iniciar sesion
    let form = document.getElementById("login");
    form.style.display = "block";
}

function SingIn(){
    // Borramos el formulario de log in
    document.getElementById("login").style.display = "none";
    
    // Mostramos el formulario de crear cuenta
    let form = document.getElementById("singin");
    form.style.display = "block";
}

