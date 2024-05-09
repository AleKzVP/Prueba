import productElement from "./components/product.js"
import fetchPost from "./libs/fetchPost.js"
async function dama(){
    const callDat = {
        data:{requiero:"navidad"},
        endPoint:"/controller/products", 
    }
    const LoadElements = await fetchPost(callDat)
    const ElementList = document.getElementById("Products");
    ElementList.innerHTML = "";
    LoadElements.forEach(element => {
        ElementList.innerHTML += productElement(element);
    });
}
dama()