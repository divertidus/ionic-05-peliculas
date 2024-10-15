import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ModalController } from '@ionic/angular';
import { ActoresPelicula, Cast, DetallesPelicula, Genero, Pelicula, RespuestaMovieDB } from 'src/app/Interfaces/interfaces';
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import * as todosLosIconos from 'ionicons/icons';
import { SlideshowPosterComponent } from '../slideshow-poster/slideshow-poster.component';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  standalone: true,
  styleUrls: ['./detalle.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ImagenPipe, NgIf, CommonModule, SlideshowPosterComponent, NgFor]
})
export class DetalleComponent implements OnInit {
  
  addFavorito() {

  }

  swiperOptsActores = {
    slidesPerView: 3.2,   // Muestra 1.1 diapositivas
    freeMode: true,       // Activa el modo libre para deslizar sin ajustar
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {
    return this.swiperOptsActores.freeMode.toString();
  }


  toogleOculto() {
    if (this.oculto <= 150) {
      this.oculto = 5000;
      //  console.log("click")
      //  console.log(this.oculto)
    } else {
      this.oculto = 150
      //  console.log("click")
      //  console.log(this.oculto)
    }
  }


  @Input() idPelicula!: number
  oculto = 150; // PARA MOSTRAR Y/O OCULTAR MAS TEXTO

  generoElegido!: Genero
  detallesPelicula: DetallesPelicula = {};
  actoresPelicula: Cast[] = [];
  peliculasPorGenero: Pelicula[] = [];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private changeDetectorRef: ChangeDetectorRef) {
    addIcons(todosLosIconos)
  }

  ngOnInit() {
    console.log("Se recibe ID: ", this.idPelicula)

    this.moviesService.getPeliculaDetalles(this.idPelicula)
      .subscribe(resp => {
        console.log(resp)
        this.detallesPelicula = resp;
      })


    this.moviesService.getPeliculaActores(this.idPelicula)
      .subscribe(resp => {
        console.log(resp)
        this.actoresPelicula = resp.cast;
      })
  }



  cerrarModal() {

    console.log("click en boton del modal")
    this.modalCtrl.dismiss();
  }

  cargarPeliculasPorGenero(id: number) {
    this.moviesService.getPelicularPorGenero(id)
      .subscribe(resp => {
        console.log('Obtenido por genero', resp.results);
        this.peliculasPorGenero = [...resp.results];
        this.mostrarPeliculasPorGenero = true;
        // console.log('Películas por género actualizadas:', this.peliculasPorGenero);
        // this.changeDetectorRef.detectChanges();
      })
  }

  mostrarPeliculasPorGenero: boolean = false;

  mostrarPeliculasDeGenero(genero: Genero) {
    this.generoElegido = genero;
    this.mostrarPeliculasPorGenero = true;
    this.cargarPeliculasPorGenero(genero.id);

  }


}
