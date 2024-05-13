export default function item({
    ID = "nothing", 
    nombre = "nothing", 
    precio = "null", 
    cantidad = "null", 
    categoria = "nothing", 
    editar = (element)=>{}, 
    eliminar = (element)=>{},
    getId = (element)=>{}
    }){ 
        const IdElement = randomID();
        const EditElement = `${randomID()}_edit`;
        const DeleteElement = `${randomID()}_delete`;
        editar(EditElement)
        eliminar(DeleteElement)
        getId(IdElement)
        return (`
        <td><span class="normalText ${IdElement}_span">${ID}</span><input class="inputText ${IdElement}_input" type="text"></td>
        <td><span class="normalText ${IdElement}_span">${nombre}</span><input class="inputText ${IdElement}_input" type="text"></td>
        <td><span class="normalText ${IdElement}_span">${precio}</span><input class="inputText ${IdElement}_input" type="text"></td>
        <td><span class="normalText ${IdElement}_span">${cantidad}</span><input class="inputText ${IdElement}_input" type="text"></td>
        <td><span class="normalText ${IdElement}_span">${categoria}</span><input class="inputText ${IdElement}_input" type="text"></td>
        <td>
            <button class="buttonADT" id="${EditElement}">Editar</button>
            <button class="buttonADT" id="${DeleteElement}">Eliminar</button>
        </td>
        `)}

function randomID() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}