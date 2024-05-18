import manageLocalStorage from "../libs/manageLocalStorage.js";
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
}
categoria()