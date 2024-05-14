import item from "./items.js";
export default function itemNew({
    elementTable, 
    onEdit=()=>{},
    ID=0,
    columns=["ID", "nombre", "precio", "cantidad", "categoria", "acción"],
}) {
    const nuevoElemento = document.createElement("tr");
    let MyEvents = {
        editar:(e)=>MyEvents.editar=()=>document.getElementById(e), 
        eliminar:(e)=>MyEvents.eliminar=()=>document.getElementById(e),
        getId:(e)=>MyEvents.getId=(action, type)=>[...document.getElementsByClassName(`${e}_${type}`)].forEach((eD, index)=>{action(eD, index)}),
    }
    nuevoElemento.innerHTML = item(MyEvents);
    elementTable.appendChild(nuevoElemento);
    let SID = 0;
    MyEvents.getId((element)=>{
        if (SID==0) {
            SID++;
            element.innerHTML = ID;
        }else{}
        element.style.display = "none";
    }, "span")
    MyEvents.getId((element)=>{
        element.style.display = "block";
        if (SID==0) {}else{
            SID--;
            element.value=ID;
        }
        //arreglo 2
        // temporal
    }, "input")
    let clonElementToFile = MyEvents.editar().cloneNode(true);
    let selectFile = null;
    clonElementToFile.innerHTML = "Imagen";
    clonElementToFile.addEventListener("click", ()=>{
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", (e)=>{
            selectFile = e.target.files[0];
        })
        input.click();
    })
    MyEvents.editar().parentNode.appendChild(clonElementToFile);
    MyEvents.editar().innerHTML = "Guardar";
    MyEvents.eliminar().innerHTML = "Cancelar";
    // Eliminar el elemento
    MyEvents.eliminar().addEventListener("click", ()=>nuevoElemento.remove());
    MyEvents.editar().addEventListener("click", ()=>{
        if (selectFile!==null) {
            let CloneElement = [...columns];
            let data = {};
            MyEvents.getId((element)=>{
                data[CloneElement.shift()] = element.value;
                element.value = "";
            }, "input")
            data["image"] = selectFile;
            data["genero"] = obtenerGeneroAleatorio();
            onEdit(data);
            nuevoElemento.remove();
        }else{
            alert("Seleccione una imagen");
        }
    })
    return nuevoElemento;
}

function obtenerGeneroAleatorio() {
    return Math.random() < 0.5 ? 'masculino' : 'femenino';
}