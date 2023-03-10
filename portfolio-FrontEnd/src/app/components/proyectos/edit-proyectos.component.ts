import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css']
})
export class EditProyectosComponent implements OnInit{
proyectos: Proyectos = new Proyectos("","","");
url: string = "";

constructor(private activatedRouter: ActivatedRoute, private proyectosS: ProyectosService, private router: Router,
  public imageService: ImageService){}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.proyectosS.detail(id).subscribe(
      {
        next: (data: Proyectos) => {
          this.proyectos = data;
        },
        error: (err: any) => {
          alert("Error al modificar proyecto.");
          this.router.navigate(['']);
        }
      }
    );
  }
  clearUrl() {
    this.url = "";
  }
  
  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    //this.proyectos.img = this.imageService.url
    if(this.imageService.url != "") {
      this.proyectos.img = this.imageService.url;
    }
    this.proyectosS.update(id, this.proyectos).subscribe(
      {
        next: (data: Proyectos) => {
        
          this.router.navigate(['']);
        },
        error: (err: any) => {
          alert("Error al modificar proyecto. Error en los campos.");
          this.router.navigate(['']);
        }
      }
    );
    this.imageService.clearUrl(); 
  }
  
  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.imageService.uploadImage($event, name);
  }

}
