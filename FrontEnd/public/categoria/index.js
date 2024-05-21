import manageLocalStorage from "../libs/manageLocalStorage.js";
import carrito from "../components/carrito.js";
import productElement from "../components/product.js"
import fetchPost from "../libs/fetchPost.js"
console.log(manageLocalStorage("get","usuario",null))
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
    LoadElements.forEach((element,index) => {
        ElementList.innerHTML += productElement(element,index);
    });
    [...document.getElementsByClassName("btnBuy")].forEach(element => {
      element.addEventListener("click",() => {
        const user = manageLocalStorage("get", "usuario",null)
        const keyUser = Object.keys(user)[0]
        const producto = JSON.parse(element.getAttribute("index"))
        user [keyUser].push(producto)
        manageLocalStorage("edit", "usuario",user)
        console.log(producto)
      })
    });
    
    // const car1 = new carrito({parent:document.getElementById("navBar"), name: "Carrito"});
    // car1.addItem({image:catImage, title:"Producto 1", price: 150, id: 1, href:""});
    // car1.addItem({image:catImage, title:"Producto 2", price: 100, id: 2, href:""});
    // car1.addItem({image:catImage, title:"Producto 3", price: 100, id: 3, href:""});
    // car1.removeItem(1);
}
categoria()