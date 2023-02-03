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
  url: string = "";
  nombre: string = "";
  descripcion: string = "";
  img: string ="";
  images: string[];
    
  constructor(private proyectosS: ProyectosService, private router: Router, 
    public imageService: ImageService, public activatedRouter: ActivatedRoute,
    private storage: Storage) { }

  ngOnInit(): void {
    this.getImages();
    
  }
  clearUrl() {
    this.url = "";
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
    this.imageService.clearUrl();   
    }
    
    uploadImagen($event: any) {
      /*const id = this.activatedRoute.snapshot.params['id'];   (ESTA LINEA SE ELIMINA)
      const name = "proyect_" + this.nombre; 
      this.imageService.uploadImage($event, name)*/
      const file = $event.target.files[0];
      console.log(file);
      const imgRef = ref(this.storage, `proyectos/${file.name}`);

      uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
      this.getImages();
    })
      .catch(error => console.log(error))
    } 

    getImages(){
      const imageRef = ref(this.storage, 'proyectos');

      listAll(imageRef)
      .then(async response => {
        console.log(response);
        this.images = [];

        for(let item of response.items){
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
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
