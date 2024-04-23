function Codificar(contraseña:any, dato:any) {
    const cadenaAEncriptar = dato + ':' + contraseña;
    const datosCodificados = btoa(cadenaAEncriptar);
    return datosCodificados;
}
function Decodificar(contraseña:any, datosCodificados:any) {
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

export {Codificar,Decodificar}
