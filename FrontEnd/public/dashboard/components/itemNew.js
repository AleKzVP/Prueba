import item from "./items.js";
export default function itemNew({
    elementTable, 
    onEdit=()=>{},
    ID=0,
    columns=["ID", "Nombre", "Precio", "Cantidad", "Categoría", "Acción"],
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
        }else{
            element.style.display = "none";
        }
    }, "span")
    MyEvents.getId((element)=>{
        if (SID==0) {
            element.style.display = "block";
        }else{
            SID--;
            element.value=ID;
        }
    }, "input")
    let clonElementToFile = MyEvents.editar().cloneNode(true);
    clonElementToFile.innerHTML = "Imagen";
    MyEvents.editar().parentNode.appendChild(clonElementToFile);
    MyEvents.editar().innerHTML = "Guardar";
    MyEvents.eliminar().innerHTML = "Cancelar";
    MyEvents.editar().addEventListener("click", ()=>{
        let CloneElement = [...columns];
        let data = {};
        MyEvents.getId((element)=>{
            data[CloneElement.shift()] = element.value;
            element.value = "";
        }, "input")
        onEdit(data);
        nuevoElemento.remove();
    })
    return nuevoElemento;
}