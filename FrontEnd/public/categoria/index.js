import carrito from "../components/carrito.js";
import productElement from "../components/product.js"
import fetchPost from "../libs/fetchPost.js"
async function categoria(){
    let genero = window.location.hash.slice(1);
    if (genero == "femenino"){
        document.getElementById("titulo").innerHTML="D A M A"
    }
    console.log(genero);
    const callDat = {
        endPoint:"/controller/products", 
        data:{genero},
    }
    const LoadElements = await fetchPost(callDat)
    const ElementList = document.getElementById("Products");
    ElementList.innerHTML = "";
    LoadElements.forEach(element => {
        ElementList.innerHTML += productElement(element);
    });
    
    // const car1 = new carrito({parent:document.getElementById("navBar"), name: "Carrito"});
    // car1.addItem({image:catImage, title:"Producto 1", price: 150, id: 1, href:""});
    // car1.addItem({image:catImage, title:"Producto 2", price: 100, id: 2, href:""});
    // car1.addItem({image:catImage, title:"Producto 3", price: 100, id: 3, href:""});
    // car1.removeItem(1);
}
categoria()