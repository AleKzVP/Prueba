import sendForm from "./sendForm.js";
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

async function Index(){
    sendForm ("userForm",'/controller/registro', (respuesta) => {

    } )
    sendForm ("loginForm",'/controller/login', (respuesta) => {
        console.log("esta es una respuesta desde un metodo callback ", respuesta)
        if (respuesta.status == true ){
            window.location.href = "./";

        }
        else {
            alert("Usuario o contraseña incorrectos.")
        }
    })
}

Index()