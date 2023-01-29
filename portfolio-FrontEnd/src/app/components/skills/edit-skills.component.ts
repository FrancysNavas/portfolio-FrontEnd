import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})
export class EditSkillsComponent implements OnInit{
  skills : Skills = null;

  constructor(private skillService: SkillsService, private activatedRouter: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillService.detail(id).subscribe(
      {
        next: (data: Skills) => {
          this.skills = data;
        },
        error: (err: any) =>{
          alert("Error al modificar la Skill.");
          this.router.navigate(['']);
        }
      }
    );
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillService.update(id, this.skills).subscribe(
      {
        next: (data: any) => {
          this.router.navigate(['']);
        },
        error: (err: any) =>{
          alert("Error al modificar la Skill.");
          this.router.navigate(['']);
        }
      }
    );
  }

}
