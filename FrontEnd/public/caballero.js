import productElement from "./components/product.js"
const ElementList = document.getElementById("Products");
ElementList.innerHTML = "";
for (let i = 0; i < 4; i++) {
    ElementList.innerHTML += productElement();
}