import productElement from "../components/product.js"
import fetchPost from "../libs/fetchPost.js"
async function categoria(){
    let genero = window.location.hash.slice(1);
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
}
categoria()