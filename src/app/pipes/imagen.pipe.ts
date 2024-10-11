import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL = environment.imgPath;

@Pipe({
  name: 'imagen',
  standalone: true
})

export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    //Si no existe imagen, devolveremos una imagen por defecto.
    if (!img) {

      return "./assets/no-image-banner.jpg";
    }

    // Pero si existe la imagen creamos una constante con la URL montada
    // const imagenUrl = URL + '/' + size + '/' + img
    const imagenUrl = `${URL}/${size}${img}`
    console.log(imagenUrl)

    return imagenUrl;
  }

}


/* 
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
w500 esta parte es modificable
 */