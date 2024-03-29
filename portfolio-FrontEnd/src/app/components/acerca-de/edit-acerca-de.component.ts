import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
  persona: Persona = null;
  clicked = false;
  constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService, private router: Router,
    public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.clicked = false;
    this.personaService.detail(id).subscribe(
      {
        next: (data: Persona) => {
          this.persona = data;
        },
        error: (err: any) => {
          alert("Error al modificar perfil.");
          this.router.navigate(['']);
        }
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    if (this.imageService.url != '') {
      this.persona.img = this.imageService.url;
    }
    this.clicked = true;
    this.personaService.update(id, this.persona).subscribe(
      {
        next: (data: any) => {
          this.router.navigate(['']);
        },
        error: (err: any) => {
          alert("Error al modificar perfil. Error en los campos.");
          this.router.navigate(['']);
        }
      }
    );

  }

  uploadImage($event: any) {
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id;
    this.imageService.uploadImage($event, name);
  }

}
