import llamada from "./llamada.js"
export default function sendForm (nombreForm, endpoint, callback) {
    let elementoForm = document.getElementById(nombreForm);
    elementoForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que se envíe el formulario
    
        let formData = new FormData(elementoForm); // Obtiene los datos del formulario
    
        let data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        console.log(data)

        // Ejecutar la función fetch
        callback(await llamada(endpoint, data))

    });
}