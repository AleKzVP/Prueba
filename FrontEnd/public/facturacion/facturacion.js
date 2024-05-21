import manageLocalStorage from "../libs/manageLocalStorage.js";
function Main() {
    const user = manageLocalStorage("get", "usuario", null)
    if(user==null){ alert("Debe iniciar sesión para poder comprar"); window.location.href = '/usuario.html';}
    const Products = user[user.data.email];
    document.getElementById("name").value = user.data.name;
    document.getElementById("email").value = user.data.email;
    let TotalPrice = 0;
    let TotalCantidad = 0;
    Products.forEach(product => {
        const elementProduct = document.createElement("ul");
        elementProduct.value = product.ID;
        elementProduct.innerHTML = `${product.nombre} - ${product.cantidad} - $${product.precio}`;
        elementProduct.classList.add("list-group-item");
        document.getElementById("producto").appendChild(elementProduct);
        TotalPrice += Number(product.precio) * Number(product.cantidad);
        TotalCantidad += Number(product.cantidad);
    });
    document.getElementById("producto").selectedIndex = 1;
    document.getElementById("cantidad").value = TotalCantidad;
    document.getElementById("precio").value = TotalPrice;
    console.log(user.data);
    console.log(Products);
    document.getElementById("GenerarFactura").addEventListener("click", () => {
        captura();
    });
}
Main()


function captura() {
    var element = document.getElementById('faturacionContainer');
    html2canvas(element).then(function(canvas) {
        // Convertir el lienzo a una URL de imagen en formato PNG
        var imgData = canvas.toDataURL('image/png');
        
        // Crear un enlace para descargar la imagen
        var link = document.createElement('a');
        link.style.display = 'none';
        link.href = imgData;
        link.download = 'captura.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}