export class Proyectos {
    id?: number;
    nombre: string;
    descripcion: string;
   

    //crear un constructor
    constructor (nombre:string, descripcion:string){
        this.nombre = nombre;
        this.descripcion = descripcion;
       
    }
}
