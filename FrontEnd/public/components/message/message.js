import getHTML from "../../libs/getHTML.js";
export default async function message({
    title = "Mensaje",
    message = "Mensaje",
    btnDone = ["Aceptar", ()=>{}],
    btnCancel = ["Cancelar", ()=>{}],
    content = document.createElement("div"),
}){
    const randomID = Math.random().toString(36).substring(7);
    const element = document.createElement("div");
    return new Promise((resolve, reject) => {
        const idDone = `btn_Done_${randomID}`;
        const idCancel = `btn_Cancel_${randomID}`;
        const idContent = `content_${randomID}`;
        element.innerHTML = getHTML("./components/message/message.html", {
            idContent,
            idDone,
            idCancel,
            title,
            message,
            btnDone: btnDone[0],
            btnCancel: btnCancel[0],
        });
        document.body.appendChild(element);
        document.getElementById(idDone).addEventListener("click", ()=>{
            btnDone[1]();
            element.remove();
            resolve(true);
        });
        document.getElementById(idCancel).addEventListener("click", ()=>{
            btnCancel[1]();
            element.remove();
            resolve(false);
        });
        document.getElementById(idContent).appendChild(content);
        [...document.getElementById(idContent).getElementsByTagName("button")].forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                element.remove();
                resolve(element.getAttribute("value"));
            });
        });
    });
}