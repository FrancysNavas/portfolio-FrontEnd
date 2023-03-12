import { Component, OnInit } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { uploadBytes } from 'firebase/storage';
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
  
    
  constructor(private proyectosS: ProyectosService, private router: Router, 
    public imageService: ImageService, public activatedRouter: ActivatedRoute,
    private storage: Storage) { }

  ngOnInit(): void {
  
    
  }
  
  onCreate(): void{
    const proyectos = new Proyectos(this.nombre, this.descripcion);
  
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
  }
   
  
