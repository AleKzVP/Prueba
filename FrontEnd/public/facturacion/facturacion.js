import manageLocalStorage from "../libs/manageLocalStorage.js";
import fetchPost from "../libs/fetchPost.js"
import getHTML from "../libs/getHTML.js";
import captura from "../libs/captura.js";
function Main() {
    const ProductosCount = {};
    const IDProductos = {};
    const CountOfId = {};
    const user = manageLocalStorage("get", "usuario", null)
    if(user==null){ alert("Debe iniciar sesión para poder comprar"); window.location.href = '/usuario.html';}
    const Products = user[user.data.email];
    if (Products.length==0) {
        alert("No hay productos en el carrito");
        location.href = '/';
    }
    document.getElementById("name").value = user.data.name;
    document.getElementById("email").value = user.data.email;
    let TotalPrice = 0;
    let TotalCantidad = 0;
    Products.forEach(product => {
        ProductosCount[product.ID] = ProductosCount[product.ID] ? ProductosCount[product.ID] + 1 : 1;
        IDProductos[product.ID] = product;
        CountOfId[product.ID] = product.cantidad;
        const elementProduct = document.createElement("ul");
        elementProduct.value = product.ID;
        elementProduct.innerHTML = `${product.nombre} - ${product.cantidad} - $${product.precio}`;
        elementProduct.classList.add("list-group-item");
        document.getElementById("producto").appendChild(elementProduct);
        TotalPrice += Number(product.precio);
        TotalCantidad += Number(product.cantidad);
    });
    document.getElementById("producto").selectedIndex = 1;
    document.getElementById("precio").value = TotalPrice;
    console.log(user.data);
    console.log(Products);
    document.getElementById("GenerarFactura").addEventListener("click", async () => {
        const keyCount = Object.keys(ProductosCount);
        
        // captura();
        let htmlDiv = "";
        let TotalGPrice = 0;
        
        for (let i = 0; i < keyCount.length; i++) {
            const element = IDProductos[keyCount[i]];
            const TotalPrice = element.precio * ProductosCount[keyCount[i]];
            element.cantidad = ProductosCount[keyCount[i]];
            let data = await getHTML("./facturacionFinal/item.html", {...element, TotalPrice});
            TotalGPrice += TotalPrice;
            htmlDiv += data + "\n";
        }

        for (let i = 0; i < keyCount.length; i++) {
            const contable = CountOfId[keyCount[i]] - ProductosCount[keyCount[i]];
            await fetchPost({
                endPoint:"/controller/editProducts",
                data:{
                    ID: IDProductos[keyCount[i]].ID,
                    cantidad: contable,
                },
            })
        }

        const tableFactura = await getHTML("./facturacionFinal/facturacionFinal.html", {
            email: user.data.email,
            name: user.data.name,
            address: document.getElementById("direccion").value,
            content: htmlDiv, 
            total: TotalGPrice
        })
        
        const htmlDivTable = document.createElement("div");
        htmlDivTable.innerHTML = tableFactura;
        document.body.appendChild(htmlDivTable);
        const url = await captura(htmlDivTable);
        htmlDivTable.remove();
        const cloneUser = {...user};
        cloneUser[user.data.email] = [];
        manageLocalStorage("edit", "usuario", cloneUser);
        location.href ='/';
    });
}
Main()
