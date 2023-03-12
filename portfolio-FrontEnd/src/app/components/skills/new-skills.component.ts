import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-new-skills',
  templateUrl: './new-skills.component.html',
  styleUrls: ['./new-skills.component.css']
})
export class NewSkillsComponent implements OnInit {

  nombre: string;
  porcentaje: number;

  constructor(private skillsService: SkillsService, private router: Router) {}
  ngOnInit(): void {
    
  }

  onCreate(): void{
    const skill = new Skills(this.nombre, this.porcentaje);

    this.skillsService.save(skill).subscribe(
      {
        next: (data: any) => {
          alert("Skill creada correctamente.");
          this.router.navigate(['']);
        },
        error: (err: any) => {
          alert("Falló al añadir la skill o la skil ya existe");
          this.router.navigate(['']);
        }
      }
    );
  }

  


}
