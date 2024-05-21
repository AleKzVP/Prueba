import manageLocalStorage from "../libs/manageLocalStorage.js";
import carrito from "../components/carrito.js";
import productElement from "../components/product.js"
import fetchPost from "../libs/fetchPost.js"
async function categoria(){
    let genero = window.location.hash.slice(1);
    if (genero == "femenino"){
        document.getElementById("titulo").innerHTML="D A M A"
    }
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
    const car1 = new carrito({parent:document.getElementById("navBar"), name: "Carrito"});
    const user = manageLocalStorage("get", "usuario",null)
    if(user!=null){
        const keyUser = Object.keys(user)[0]
        user[keyUser].forEach(element => {
            car1.addItem({image:element.image, title:element.nombre, price: element.precio, id: element.ID, href:"", onRemove:()=>{
                user[keyUser].splice(user[keyUser].indexOf(element),1)
                manageLocalStorage("edit", "usuario",user)
            }});
        });
        
        [...document.getElementsByClassName("btnBuy")].forEach(element => {
            element.addEventListener("click",() => {
                const producto = JSON.parse(element.getAttribute("index"))
                user[keyUser].push(producto)
                car1.addItem({image:producto.image, title:producto.nombre, price: producto.precio, id: producto.ID, href:"", onRemove:()=>{
                    user[keyUser].splice(user[keyUser].indexOf(producto),1)
                    manageLocalStorage("edit", "usuario",user)
                }});
                manageLocalStorage("edit", "usuario",user)
            })
        });

        const LoginBtn = document.getElementById("ButtonIniciarSesion");
        LoginBtn.innerHTML = keyUser;
        LoginBtn.href = "/";
    }else{
        [...document.getElementsByClassName("btnBuy")].forEach(element => {
            element.addEventListener("click",() => {
                alert("Debe iniciar sesion para poder comprar")
                window.location.href = '/usuario.html';
            })
        });
    }
    
}
categoria()