export default async function getHTML(url, options={}){
    let data = await (await fetch(url)).text();
    Object.keys(options).forEach(key => {
        const regex = new RegExp(`{{ ${key} }}`, 'g');
        data = data.replace(regex, options[key]);
        // Esto es un ejemplo de como se puede usar el método replace de los strings
        // para reemplazar valores en un string, en este caso se reemplazan los valores
        // de las llaves que se encuentran en el string por los valores del objeto options
        // que se pasan como argumento.
        // Ejemplo:
        // const data = "<div>{{name}}</div>";
        // const options = {name: "Juan"};
    });
    return data;
}