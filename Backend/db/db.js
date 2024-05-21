import fs from 'fs'
//objeto DB que almacena y carga los datos que se van a usar
export default class db{
    data= []
    url = ""
    constructor(url) {
        this.url=url
        this.data = JSON.parse(String(fs.readFileSync(this.url)))    //PUNTO DEBIL
    }
    save(){
        fs.writeFileSync(this.url, JSON.stringify(this.data))        // PUNTO DEBIL
    }
    load(){
        this.data = JSON.parse(String(fs.readFileSync(this.url)))
    }
}
