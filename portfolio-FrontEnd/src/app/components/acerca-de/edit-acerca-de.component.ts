import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
persona: Persona =  null;

  constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService, private router: Router){}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.personaService.detail(id).subscribe(
      {
        next: (data: Persona) => {
          this.persona = data;
        },
        error: (err: any) => {
          alert("Error al modificar educación.");
          this.router.navigate(['']);
        }
      }
    );
  }

  onUpdate(){
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.update(id, this.persona).subscribe(
      {
        next: (data: any) => {
          this.router.navigate(['']);
        },
        error: (err: any) => {
          alert("Error al modificar educación.");
          this.router.navigate(['']);
        }
      }
    );

  }

  uploadImage($event: any){

  }

}
