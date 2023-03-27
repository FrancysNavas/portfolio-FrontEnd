import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);

    uploadBytes(imgRef, file)
      .then(response => {
        this.getImages(name)
      })

      .catch(error => console.log(error))

  }

  clearUrl() {
    this.url = "";
  }
  getImages(name: string) {
    const imagesRef = ref(this.storage, 'imagen')
    list(imagesRef)
      .then(async response => {
        for (let item of response.items) {
          if (item.name === name) {
            this.url = await getDownloadURL(item);
            console.log("La URL es: " + this.url);
          }
        }
      })
      .catch(error => console.log(error + "Error al obtener imagenes"))
  }

}

