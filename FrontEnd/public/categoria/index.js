import manageLocalStorage from "../libs/manageLocalStorage.js";
import carrito from "../components/carrito.js";
import productElement from "../components/product.js"
import fetchPost from "../libs/fetchPost.js"

// import message from "../components/message/message.js";

async function categoria(){
    // await message({
    //     title: "Bienvenido",
    //     message: "Bienvenido a nuestra tienda de ropa online, donde encontrarás las últimas tendencias en moda para mujer.",
    //     btnDone: ["Aceptar", ()=>{}],
    // })

    const logOUT = document.getElementById("ButtonLogOut");
    const description = document.getElementById("description")
    let genero = window.location.hash.slice(1);
    if (genero == "femenino"){
        document.getElementById("titulo").innerHTML="D A M A"
        description.innerHTML = `
            La moda femenina es un mundo de posibilidades, 
            donde cada mujer puede encontrar su estilo y personalidad. 
            En nuestra tienda online de ropa de mujer, podrás encontrar 
            las últimas tendencias en moda femenina, con una amplia variedad 
            de prendas de ropa de mujer para que puedas elegir la que más 
            te guste. Descubre nuestra colección de ropa de mujer y encuentra 
            la prenda perfecta para cada ocasión.`
    }
    const callDat = {
        endPoint:"/controller/products", 
        data:{genero},
    }
    const LoadElements = await fetchPost(callDat)
    const ElementList = document.getElementById("Products");
    let conteoProducto = {};
    ElementList.innerHTML = "";
    LoadElements.forEach((element,index) => {
        ElementList.innerHTML += productElement(element,index);
    });
    const car1 = new carrito({parent:document.getElementById("navBar"), name: "Carrito"});
    const user = manageLocalStorage("get", "usuario",null)
    if(user!=null){
        const keyUser = Object.keys(user)[0]
        user[keyUser].forEach(element => {
            const key_name = element.nombre.trim();
            if (conteoProducto[key_name]) {conteoProducto[key_name]+=1} else {conteoProducto[key_name]=1}
            car1.addItem({image:element.image, title:element.nombre, price: element.precio, id: element.ID, href:"", onRemove:()=>{
                const name_key = key_name;
                user[keyUser].splice(user[keyUser].indexOf(element),1)
                manageLocalStorage("edit", "usuario",user)
                conteoProducto[name_key]-=1;
            }});
        });
        
        [...document.getElementsByClassName("btnBuy")].forEach(element => {
            element.addEventListener("click",() => {
                const producto = JSON.parse(element.getAttribute("index"));
                const key_name = producto.nombre.trim();
                let countProd =0;
                // Esto no se hace asi pero es una solucion rapida
                try {countProd = producto.cantidad.trim()} catch (error) {countProd = producto.cantidad} 
                if (!conteoProducto[key_name]) {conteoProducto[key_name]=0}
                if (Number(conteoProducto[key_name]) >= Number(countProd)) {
                    alert("No hay suficiente stock de este producto")
                }else{
                    user[keyUser].push(producto)
                    car1.addItem({image:producto.image, title:producto.nombre, price: producto.precio, id: producto.ID, href:"", onRemove:()=>{
                        const name_key = key_name;
                        user[keyUser].splice(user[keyUser].indexOf(producto),1);
                        manageLocalStorage("edit", "usuario",user)
                        conteoProducto[name_key]-=1;
                    }});
                    manageLocalStorage("edit", "usuario",user)
                    conteoProducto[key_name]+=1;
                }
            })
        });

        const LoginBtn = document.getElementById("ButtonIniciarSesion");
        LoginBtn.innerHTML = keyUser;
        LoginBtn.href = "/";
        logOUT.style.display = "block";
        logOUT.addEventListener("click",()=>{
            manageLocalStorage("delete", "usuario",null)
            window.location.href = '/';
            logOUT.style.display = "none";
            LoginBtn.innerHTML = "INICIAR SESIÓN";
        })
    }else{
        [...document.getElementsByClassName("btnBuy")].forEach(element => {
            element.addEventListener("click",() => {
                alert("Debe iniciar sesión para poder comprar")
                window.location.href = '/usuario.html';
            })
        });
    }
    
}
categoria()

