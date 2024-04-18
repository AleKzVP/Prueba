export default function miImportacion () :void{
    
    
    console.log("hola, soy un test");
    
    
    function hola (a:string,b:number,c:CallableFunction) :string{
        let test: string = c(5+b,3)
    
        return test 
    
      }
    
    let respuesta: string = hola("", 4, (numero1:number,numero2:number)=>{ 
        let mensaje: string =`hola, estamos sumando ${numero1} con ${numero2} y el resultado es ${numero1+numero2}`
        
        return mensaje
        
      })
      
    console.log(respuesta);
      
}

const avion = "nos perdimos en el avion"
const buque = "nos perdimos en el buque"

export {
    avion,
    buque
}