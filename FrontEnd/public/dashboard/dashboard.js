import itemFunction from "./components/itemFunction.js";
import itemNew from "./components/itemNew.js";
function main() {
    const elementTable = document.getElementById("TableItems");
    const buttonAddProduct = document.getElementById("addProduct")
    let ELEMENTS =[
        ()=>{obj_Element.ID = 1; return obj_Element;},        
        ()=>{obj_Element.ID = 2; return obj_Element;},        
    ]
    let obj_Element = {
        elementTable, 
        ID:1, 
        nombre:"Item 1", 
        precio:1000, 
        cantidad:10, 
        categoria:"blue",
        onSave:(data)=>{
            console.log(data);
        },
        onDelete:(data)=>{
            console.log(data, "= delete element");
        },
    }
    
    elementTable.innerHTML = "";
    
    ELEMENTS.forEach((element)=>{
        itemFunction(element());
    })
    
    buttonAddProduct.addEventListener("click", ()=>{
        itemNew({
            elementTable,
            onEdit:(data)=>{
                let clone = {...obj_Element};
                clone.nombre = data.Nombre;
                clone.precio = data.Precio;
                clone.cantidad = data.Cantidad;
                clone.categoria = data.Categoría;
                clone.ID = data.ID;
                ELEMENTS.push(()=>clone);
                itemFunction(clone);
            },
            ID:ELEMENTS.length+1,
        });
    })
}
main();


