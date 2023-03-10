import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[];

  constructor(private proyectosS: ProyectosService, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyectos();

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }
  
  cargarProyectos(): void {
    this.proyectosS.lista().subscribe(
      {
        next: (data: Proyectos[]) => {
          this.proyectos = data;
        }, error: (err: any) => {
          console.log("no funciona el subscribe");
        }
      }
    );
  }
 
  
  
  delete(id?: number): void {
    if (id != undefined) {
      this.proyectosS.delete(id).subscribe(
        {
          next: (data: any) => {
            this.cargarProyectos();
          },
          error: (err: any) => {
            alert("No se pudo borrar.");
          }
        }
      );
    }
  }
}