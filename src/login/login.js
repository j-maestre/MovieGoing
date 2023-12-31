window.addEventListener('load', onDocumentReady, false);


function onDocumentReady(){
    console.log("Document ready");

    //let islogged = localStorage.getItem("islogged");
    //let username = localStorage.getItem("userName");

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

    localStorage.setItem("islogged",false);
    localStorage.setItem("UserLogged",null);

    LogIn();

    
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
            if(CheckPasswd(username, passwd)){
                alert("Login correcto");
                localStorage.setItem("islogged", true);
                let user = GetUser(username);
                if(user){
                    localStorage.setItem("UserLogged", JSON.stringify(user));
                    // Go to home
                    window.location.href = "../home/home.html";
                }else{
                    alert("Unexpected error");
                }

            }else{
                alert("Usuario o contraseña incorrectos");
            }
        }


    })
}

// Check si la contraseña y el usuario el correcto
function CheckPasswd(name, passwd){
    let users = JSON.parse(localStorage.getItem("UsersRegistered"));
    let isCorrect = false;

    let encriptedPasswd = CryptoJS.MD5(passwd).toString();
    users.map( (value)=>{
        
        if(value.Username == name && value.Password == encriptedPasswd){
            isCorrect = true;
        }
    });


    /*for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == name){
            let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(user);
            if(passwd == user.Password){
                return true;
            }

        }
    }*/

    return isCorrect;
}

// Returns the user object if exist, false otherwise
function GetUser(username){
    let users = JSON.parse(localStorage.getItem("UsersRegistered"));
    let user = false;

    users.map( (value)=>{
        console.log(value);
        console.log(value.Username == username)
        if(value.Username == username){
            user = value;
        }
    });

    console.log("USer antes de return: "+ user);
    return user;
}
// Returns true if the username does not exist, false otherwise
function CheckUser(name){

    let users = JSON.parse(localStorage.getItem("UsersRegistered"));
    let isNew = true;

    // Si es null significa que aun no hay usuarios
    if(users != null){
        users.map( (value)=>{
            if(value.username == name){
                isNew = false;
                //return false;
            }
        });
    }

    /*for ( let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == name){
            // El usuario ya existe
            return false;
        }
    }*/

    return isNew;
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
        let name = document.getElementById('fc_name').value;
        let last_name = document.getElementById('fc_last_name').value;
        let email = document.getElementById('fc_email').value;
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
                "Password": CryptoJS.MD5(passwd).toString(),
                "ProfilePic": null,
                "List": null,
            }

            console.log(user);

            if(CheckUser(username)){
                // Recogemos los usuarios actuales
                let users = JSON.parse(localStorage.getItem("UsersRegistered"));
                //localStorage.setItem(username, JSON.stringify(user));

                if(users == null){
                    // Es el primer usuario que se registra
                    users = [];
                }

                // Metemos el nuevo usuario en la lista
                users.push(user);
                // Guardamos de nuevo los usuarios con el nuevo añadido
                localStorage.setItem("UsersRegistered",JSON.stringify(users));

                alert("usuario creado");
            }else{
                alert("El nombre de usuario ya existe");
            }

        }
    
    
    })

}

