import {
  Component, OnInit, CUSTOM_ELEMENTS_SCHEMA,
  Input, Output, EventEmitter, ViewChild, ElementRef
} from '@angular/core';
import { IonCardHeader, IonCard, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { NgFor } from '@angular/common';
import { Pelicula } from 'src/app/Interfaces/interfaces';
import { register } from 'swiper/element/bundle';
import { ParesPipe } from "../../pipes/pares.pipe";
import { addIcons } from 'ionicons';
import * as todosLosIconos from 'ionicons/icons';
import Swiper from 'swiper';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

register() // Esto asegura que Swiper se registre correctamente como componente web

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: true,
  providers: [ModalController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardContent, ImagenPipe, NgFor, ParesPipe]
})
export class SlideshowParesComponent implements OnInit {

  @ViewChild('swiperDesdeCodigo') swiperEl!: ElementRef;
  //@ViewChild('swiperDesdeCodigo', { static: true }) swiperEl!: ElementRef;

  @Input() peliculasRecientesEnComponentePares: Pelicula[] = [];
  @Output() eventoCargarMas = new EventEmitter();

  constructor(private modalCtrl: ModalController) { addIcons(todosLosIconos) }

  swiperInstance!: Swiper;

  ngOnInit() {

  }

  async mostrarDetalles(idPelicula: number) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        idPelicula
      }
    })
    modal.present();
  }






  swiperOpts = {
    slidesPerView: 3.2,   // Muestra 1.1 diapositivas
    freeMode: true,       // Activa el modo libre para deslizar sin ajustar
    spaceBetween: -10,
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {
    return this.swiperOpts.freeMode.toString();
  }

  onClick() {
    this.cargarMas();

  }

  cargarMas() {

    const numeroDeItemsActual = this.peliculasRecientesEnComponentePares.length;

    /* Esto de this.eventoCargarMas.emit(); hará qu quien escuche se active. 

    En este caso en el html de tab1 tenemos:

    <app-slideshow-pares [peliculasRecientesEnComponentePares]="peliculasPopulares"
    (eventoCargarMas)="metodoCargarMasEnTab1()"> -> Aqui le decimos ... nose bien esto
  </app-slideshow-pares>

     Y en el tab1.ts tenemos:
      metodoCargarMasEnTab1() {
        this.getPopulares();
      }

     */

    this.eventoCargarMas.emit();
    this.swiperInstance = this.swiperEl.nativeElement.swiper;
    setTimeout(() => {
      if (this.swiperEl) {
        this.swiperInstance.update(); // Actualizamos Swiper
        const nuevoIndex = numeroDeItemsActual / 2;
        this.swiperInstance.slideTo(nuevoIndex, 300, false); // Mover a la posición inicial
        console.log("Desplazamiento ejecutado correctamente");
      }
    }, 100);
  }
}


/* EXPLICACION DEL OUTPUT EMIT Y ESCUCHARLO
Vamos a desglosar tu proceso y aclarar cada paso, centrándonos en cómo funciona el @Output y EventEmitter, así como en la relación entre los componentes. Te corregiré y expandiré tus anotaciones para que puedas entenderlo completamente.

1. Estructura del Botón en pares.html
html
Copiar código
<ion-button class="btn-mas" (click)="onClick()" expand="full" size="large">
    <ion-icon slot="icon-only" name="add-outline"></ion-icon>
</ion-button>
Explicación:

Aquí tienes un botón que, al hacer clic en él, llama al método onClick().
El (click)="onClick()" es un manejador de eventos que ejecuta onClick() cuando se hace clic en el botón.
2. Manejo del Evento en pares.ts
typescript
Copiar código
@Output() eventoCargarMas = new EventEmitter();

onClick() {
    this.cargarMas();
}

cargarMas() {
    const numeroDeItemsActual = this.peliculasRecientesEnComponentePares.length;

    // Emitimos el evento para notificar a otros componentes que queremos cargar más elementos
    this.eventoCargarMas.emit();

    this.swiperInstance = this.swiperEl.nativeElement.swiper;
    setTimeout(() => {
        if (this.swiperEl) {
            this.swiperInstance.update(); // Actualizamos el swiper
            const nuevoIndex = numeroDeItemsActual / 2; // Calculamos el nuevo índice
            this.swiperInstance.slideTo(nuevoIndex, 300, false); // Movemos el swiper
            console.log("Desplazamiento ejecutado correctamente");
        }
    }, 100);
}
Explicación:

@Output() eventoCargarMas = new EventEmitter(); define un evento que puede ser escuchado por el componente padre. EventEmitter se utiliza para enviar eventos desde un componente hijo a su padre.
onClick() llama a cargarMas(), que a su vez emite el evento eventoCargarMas. Esto indica que se desea cargar más elementos.
this.eventoCargarMas.emit(); notifica a cualquier componente que esté "escuchando" este evento (como el componente padre) que se debe realizar una acción (cargar más elementos).
3. Escucha el Evento en tab1.html
html
Copiar código
<app-slideshow-pares [peliculasRecientesEnComponentePares]="peliculasPopulares"
    (eventoCargarMas)="metodoCargarMasEnTab1()">
</app-slideshow-pares>
Explicación:

Aquí, el componente <app-slideshow-pares> está "escuchando" el evento eventoCargarMas.
Cuando eventoCargarMas es emitido, ejecuta el método metodoCargarMasEnTab1(). Este es un enlace entre el componente hijo (slideshow-pares) y el componente padre (tab1).
¿Por qué ponerlo aquí? Se trata de una forma de comunicación entre componentes. El componente padre necesita saber cuándo el hijo quiere cargar más elementos, por lo que se establece un vínculo para que el padre ejecute una función en respuesta a la acción del hijo.
4. Definición del Método en tab1.ts
typescript
Copiar código
metodoCargarMasEnTab1() {
    this.getPopulares();
}
Explicación:

Este método se llama cada vez que se emite el evento eventoCargarMas desde el componente hijo.
this.getPopulares(); es la acción que se ejecutará, que probablemente solicitará más películas al servicio.
5. Obteniendo Películas en getPopulares()
typescript
Copiar código
getPopulares() {
    this.moviesService.getPopulars().subscribe((resp: RespuestaMovieDB) => {
        const arrayPeliculasTemporal = [...this.peliculasPopulares, ...resp.results];
        this.peliculasPopulares = arrayPeliculasTemporal;
    });
}
Explicación:

Este método obtiene las películas populares desde un servicio.
Usa subscribe() para manejar la respuesta asíncrona del servicio. Cuando llega la respuesta, se combinan las películas existentes con las nuevas.
La línea this.peliculasPopulares.push(...resp.results) añade los nuevos elementos al array existente, asegurando que no se pierdan los que ya estaban.
Resumen del Proceso Completo
Usuario hace clic en el botón en pares.html.
Se llama a onClick() en pares.ts, que a su vez llama a cargarMas().
cargarMas() emite el evento eventoCargarMas a través de this.eventoCargarMas.emit();.
El componente padre (tab1) escucha este evento con (eventoCargarMas)="metodoCargarMasEnTab1()".
Se ejecuta metodoCargarMasEnTab1(), que llama a getPopulares().
getPopulares() hace una solicitud al servicio para obtener más películas y actualiza el array peliculasPopulares.

*/
