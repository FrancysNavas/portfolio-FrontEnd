import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css']
})
export class NewProyectosComponent implements OnInit{
  proyectos : Proyectos = null;

  constructor(private proyectosS: ProyectosService, private router: Router, 
    public imageService: ImageService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.proyectosS.detail(id).subscribe(
      {
        next: (data: Proyectos) => {
          this.proyectos = data;
        },
        error: (err: any) => {
          alert("Error al modificar perfil."+ err);
          this.router.navigate(['']);
        }
      }
    );
  }
  onCreate(): void{
    const proyectos = new Proyectos( );
    this.proyectos.img = this.imageService.url
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
    //const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" +1;
    this.imageService.uploadImage($event, name);
  }

}
