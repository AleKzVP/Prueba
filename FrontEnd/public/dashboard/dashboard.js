import fetchObjForm from "../libs/fetchObjForm.js";
import fetchPost from "../libs/fetchPost.js";
import itemFunction from "./components/itemFun.js";
import itemNew from "./components/itemNew.js";
async function main() {    
    const elementTable = document.getElementById("TableItems");
    const buttonAddProduct = document.getElementById("addProduct")
    let Products = await fetchPost({endPoint:"/controller/products"});
    elementTable.innerHTML = "";
    let obj_Element = {
        elementTable, 
        ID:1, 
        nombre:"Item 1", 
        precio:1000, 
        cantidad:10, 
        categoria:"blue",
        onSave:(data)=>{
            console.log(data);
            fetchPost({data,endPoint:'/controller/editProducts'})
        },
        onDelete:(data)=>{
            console.log(data, "= delete element");
            fetchPost({data:{ID:data},endPoint:'/controller/deleteProducts'})
        },
    }
    let ELEMENTS =[]
    let IDS = []
    Products.forEach((element, index)=>{
        let cloneObject = {...obj_Element, ...element};
        ELEMENTS.push(()=>cloneObject);
        IDS.push(Number(cloneObject.ID));
    })
    
    
    ELEMENTS.forEach((element)=>{
        itemFunction(element());
    })
    
    buttonAddProduct.addEventListener("click", ()=>{
        let newID = Math.max(...IDS)+1;
        // arreglo
        itemNew({
            elementTable,
            onEdit:async (data)=>{
                let clone = {...obj_Element, ...data};
                console.log(clone);
                ELEMENTS.push(()=>clone);
                itemFunction(clone);
                let response = await fetchObjForm({ObjectSend:data, endPoint:"/controller/uploadProducts"});
                console.log(response);
            },
            ID:newID,
        });
    })
}
main();

