import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonCardHeader, IonCard, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { NgFor } from '@angular/common';
import { Pelicula } from 'src/app/Interfaces/interfaces';
import { register } from 'swiper/element/bundle';

register();  // Esto asegura que Swiper se registre correctamente como componente web

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardContent, ImagenPipe, NgFor]
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculasRecientesEnComponenteBackdrop: Pelicula[] = [];

  constructor() { }

  ngOnInit() { 
    console.log('Peliculas recibidas en SlideshowPosterComponent:', this.peliculasRecientesEnComponenteBackdrop);
  }

  swiperOpts = {
    slidesPerView: 1.2,   // Muestra 1.1 diapositivas
    freeMode: true,       // Activa el modo libre para deslizar sin ajustar
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {   
    return this.swiperOpts.freeMode.toString();
  }

}
