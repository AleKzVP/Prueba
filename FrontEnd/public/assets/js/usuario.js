import fetchPost from "../../libs/fetchPost.js" 

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
console.log(document.getElementsByTagName("form"))
document.getElementById('formularioLogin').addEventListener('submit', async function(event) {
	event.preventDefault();
	const resultado = await fetchPost({data:getFormData("formularioLogin"), endPoint:'/controller/login'})

	if (resultado.status) {
		if (resultado.admin) {
			window.location.href = '/dashboard';
		
		} else {
			window.location.href = '/'
		}
	} else {
		alert("Login fallido: " + resultado.estadoUsuario);
	}
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
	event.preventDefault();
	console.log(getFormData("registerForm"))
	const resultado = await fetchPost({data:getFormData("registerForm"), endPoint:'/controller/registro'})

	if (resultado.status) {
		alert("Registro exitoso");
	} else {
		alert("Registro fallido: " + resultado.estadoUsuario);
	}
});

function getFormData(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    const formData = {};

    inputs.forEach(input => {
        formData[input.name] = input.value;
    });

    return formData;
}