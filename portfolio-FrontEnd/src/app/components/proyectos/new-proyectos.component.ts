import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css']
})
export class NewProyectosComponent implements OnInit{
  
  nombre: string = "";
  descripcion: string = "";
  img: string ="";

    
  constructor(private proyectosS: ProyectosService, private router: Router, 
    public imageService: ImageService, public activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  onCreate(): void{
    const proyectos = new Proyectos(this.nombre, this.descripcion, this.img);
    //this.proyectosS.URL = this.imageService.url;
    //this.img = this.imageService.url;
    this.proyectosS.save(proyectos).subscribe(
      { 
        next: (data: any) => {
        alert("Proyecto añadido con éxito.");
        this.router.navigate(['']);
      }, 
      error: (err: any) => {
        alert("Fallo en el proceso.");
        this.router.navigate(['']);
      }
      }
    );
    }
    
  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.imageService.uploadImage($event, name);
  }
/*
  onUpload(e: any) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage['ref'](filePath);
    const task = this.storage['upload'](filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
*/
}
