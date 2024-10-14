import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonCardHeader, IonCard, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { NgFor } from '@angular/common';
import { Pelicula } from 'src/app/Interfaces/interfaces';
import { register } from 'swiper/element/bundle';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

register();  // Esto asegura que Swiper se registre correctamente como componente web

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
  standalone: true,
  providers: [ModalController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardContent, ImagenPipe, NgFor]
})
export class SlideshowPosterComponent implements OnInit {


  @Input() peliculasRecientesEnComponentePoster: Pelicula[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Peliculas recibidas en SlideshowPosterComponent:', this.peliculasRecientesEnComponentePoster);
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
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {
    return this.swiperOpts.freeMode.toString();
  }
}
