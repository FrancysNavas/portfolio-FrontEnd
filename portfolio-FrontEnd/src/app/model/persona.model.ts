export class Persona {
    //declaramos los atributos de le entity
    id?: number;
    nombre: String;
    apellido: String;
    img: String;

    //crear un constructor
    constructor (nombre:string, apellido:string, img:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
    }
    
}