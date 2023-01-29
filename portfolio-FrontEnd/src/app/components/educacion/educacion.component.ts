import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion : Educacion[] = [];

  constructor(private educacionS: EducacionService, private tokenService: TokenService){}
  isLogged = false;
  ngOnInit(): void {
    this.cargarEducacion();

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarEducacion(): void{
    this.educacionS.lista().subscribe(
      {
        next: (data: Educacion[]) => {
        this.educacion = data;
      }, error: (err: any) => {
        console.log("no funciona el subscribe");
      } 
      }
      );
  }

  delete(id?: number): void{
    if(id != undefined){
      this.educacionS.delete(id).subscribe(
        {
         next: (data: any) => {
          this.cargarEducacion();
        }, 
        error: (err: any) => {
          alert("No se pudo borrar.");
        }
       }
      );
  }

}

}
