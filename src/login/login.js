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

    document.getElementById("submit_login").addEventListener("click", function(){
        let username = document.getElementById('fl_user_name').value;
        let passwd = document.getElementById('fl_passwd').value;

        if(username && passwd){
            if(CheckUser(username, passwd)){
                alert("Login correcto");
                localStorage.setItem("islogged", true);
                localStorage.setItem("UserLogged", localStorage.getItem(username));
                // Go to home
            }
        }


    })
}

function CheckUser(name, passwd = false){
    let isValid = true;
    for ( var i = 0, len = localStorage.length; i < len; i++){
        if(localStorage.key(i) == name){

            // El usuario ya existe

            !passwd?isValid = false:null;

            // El usuario existe, comprobar que la contraseña coincide
            if(passwd){
                let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
                console.log(user);
                if(passwd == user.Password){
                    isValid = true;
                }

            }
        }
    }

    return isValid;
}

function SingIn(){
    // Borramos el formulario de log in
    document.getElementById("login").style.display = "none";
    
    // Mostramos el formulario de crear cuenta
    let form = document.getElementById("singin");
    form.style.display = "block";
    
    document.getElementById("submit_create").addEventListener("click", function(){
        let error = false;
        let username = document.getElementById('fc_user_name').value;
        let name = document.getElementById('fc_user_name').value;
        let last_name = document.getElementById('fc_user_name').value;
        let email = document.getElementById('fc_user_name').value;
        let passwd = document.getElementById('fc_passwd').value;
        let passwd2 = document.getElementById('fc_passwd2').value;

        console.log(username);

        // Si todos los campos son valores y ademas las contraseñas coinciden
        if(username && name && last_name && email && passwd && passwd2){

            if(passwd != passwd2){
                error = true;
                alert("La contraseña no coincide");
            }
            
        }else{
            error = true;
        }


        if(!error){
            // Podemos dar de alta el usuario
            const user = {
                "Username": username,
                "Name": name,
                "LastName": last_name,
                "Email": email,
                "Password": passwd,
            }

            console.log(user);

            if(CheckUser(username)){
                localStorage.setItem(username, JSON.stringify(user));
                alert("usuario creado");
            }else{
                alert("El nombre de usuario ya existe");
            }

        }
    
    
    })

}

