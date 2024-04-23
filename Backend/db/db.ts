import fs from 'fs'
//objeto DB que almacena y carga los datos que se van a usar
export default class db{
    public data: Array<any>= []
    public url: string = ""
    constructor(url:string) {
        this.url=url
        this.data = JSON.parse(String(fs.readFileSync(this.url)))    //PUNTO DEBIL
    }
    public save() :void{
        fs.writeFileSync(this.url, JSON.stringify(this.data))        // PUNTO DEBIL
    }
    public load() :void{
        this.data = JSON.parse(String(fs.readFileSync(this.url)))
    }
}
