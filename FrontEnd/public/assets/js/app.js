import carrito from "../../components/carrito.js";
import manageLocalStorage from "../../libs/manageLocalStorage.js";
const car1 = new carrito({parent:document.getElementById("navBar"), name: "Carrito"});
const user = manageLocalStorage("get", "usuario",null)
const LoginBtn = document.getElementById("ButtonIniciarSesion");
const logOUT = document.getElementById("ButtonLogOut");
if (user!==null) {
    const keyUser = Object.keys(user)[0]
    user[keyUser].forEach(element => {
        car1.addItem({image:element.image, title:element.nombre, price: element.precio, id: element.ID, href:"", onRemove:()=>{
            user[keyUser].splice(user[keyUser].indexOf(element),1)
            manageLocalStorage("edit", "usuario",user)
        }});
    });
    LoginBtn.innerHTML = keyUser;
    LoginBtn.href = "/";
    logOUT.style.display = "block";
    logOUT.addEventListener("click",()=>{
        manageLocalStorage("delete", "usuario",null)
        logOUT.style.display = "none";
        LoginBtn.innerHTML = "INICIAR SESIÓN";
    })
}