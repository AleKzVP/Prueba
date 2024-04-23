"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodificar = exports.Codificar = void 0;
function Codificar(contraseña, dato) {
    const cadenaAEncriptar = dato + ':' + contraseña;
    const datosCodificados = btoa(cadenaAEncriptar);
    return datosCodificados;
}
exports.Codificar = Codificar;
function Decodificar(contraseña, datosCodificados) {
    const cadenaCodificada = atob(datosCodificados);
    const partes = cadenaCodificada.split(':');
    if (partes.length !== 2) {
        throw new Error('Formato de datos incorrecto');
    }
    const contraseñaVerificada = partes[1];
    if (contraseñaVerificada !== contraseña) {
        throw new Error('Contraseña incorrecta');
    }
    const datoDecodificado = partes[0];
    return datoDecodificado;
}
exports.Decodificar = Decodificar;
