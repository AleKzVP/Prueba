import item from "./items.js";
export default function itemFunction({
        elementTable, 
        ID=1, 
        nombre="Item 1", 
        precio=1000, 
        cantidad=10, 
        categoria="blue", 
        onSave=()=>{},
        onDelete=()=>{},
        columns=["ID", "nombre", "precio", "cantidad", "categoría", "acción"],
    }) {
    let MyEvents = {
        editar:e=>MyEvents.editar=(onClick)=>{
            document.getElementById(e).addEventListener("click", onClick)
        }, 
        eliminar:e=>MyEvents.eliminar=(onClick)=>{
            document.getElementById(e).addEventListener("click", onClick)
        },
        getId:e=>MyEvents.getId=({onSpan=()=>{}, onInput=()=>{}})=>{
            let idSpan = `${e}_span`;
            let idInput = `${e}_input`;
            [...document.getElementsByClassName(idSpan)].forEach((eD, index)=>{onSpan(eD, index, idInput)});
            [...document.getElementsByClassName(idInput)].forEach((eD, index)=>{onInput(eD, index, idSpan)})
        },
    };
    let elementoNuevo = document.createElement("tr");
    elementoNuevo.innerHTML = item({ID, nombre, precio, cantidad, categoria, ...MyEvents});
    elementTable.appendChild(elementoNuevo);
    MyEvents.editar((elementBTN)=>{
        let addText = [];
        let addSpan = [];
        if (elementBTN.target.innerHTML == "Editar") {
            elementBTN.target.style.backgroundColor = "green";
            elementBTN.target.innerHTML = "Guardar"
            MyEvents.getId({onSpan:(e)=>{
                if (addText===undefined) {addText = []}
                addText.push(e.innerText)
                if (addText.length != 1) {
                    e.style.display="none"
                }
            }});
            MyEvents.getId({
                onInput:(e)=>{
                    if (addText.length !== columns.length-1) {
                        e.style.display="block"
                    }
                    e.value = addText.shift();
                },
            });
        }else{
            let columns_clone = [...columns]
            let data = {};
            elementBTN.target.style.backgroundColor = "#5b4caf";
            elementBTN.target.innerHTML = "Editar"
            MyEvents.getId({onInput:(e)=>{
                if (addSpan===undefined) {addSpan = []}
                addSpan.push(e.value),
                e.style.display="none"
                data[columns_clone.shift()] = e.value;
                if (columns_clone.length == 1) {onSave(data);}
            }});
            MyEvents.getId({
                onSpan:(e)=>{
                    e.style.display="block"
                    e.innerHTML = addSpan.shift();
                }
            });
        }
    });
    MyEvents.eliminar(()=>{
        onDelete(ID);
        elementoNuevo.remove(ID);
    });
    return elementoNuevo;
}