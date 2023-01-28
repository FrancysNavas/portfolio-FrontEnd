export class Persona {
    //declaramos los atributos de le entity
    id?: number;
    nombre: string;
    apellido: string;
    descripcion: string;
    img: string;

    //crear un constructor
    constructor (nombre:string, apellido:string, descripcion:string, img:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.img = img;
    }
    
}