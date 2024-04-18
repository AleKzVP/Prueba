"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buque = exports.avion = void 0;
function miImportacion() {
    console.log("hola, soy un test");
    function hola(a, b, c) {
        let test = c(5 + b, 3);
        return test;
    }
    let respuesta = hola("", 4, (numero1, numero2) => {
        let mensaje = `hola, estamos sumando ${numero1} con ${numero2} y el resultado es ${numero1 + numero2}`;
        return mensaje;
    });
    console.log(respuesta);
}
exports.default = miImportacion;
const avion = "nos perdimos en el avion";
exports.avion = avion;
const buque = "nos perdimos en el buque";
exports.buque = buque;
