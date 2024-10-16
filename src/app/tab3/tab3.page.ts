import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StorageService } from 'src/app/services/storage.service';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
import { DetallesPelicula, Genero, Pelicula } from '../Interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { NgFor, NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [StorageService],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, NgFor, NgIf, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SlideshowPosterComponent],
})
export class Tab3Page implements OnInit {

  peliculasFavoritas: DetallesPelicula[] = [];
  generos: Genero[] = []





  constructor(private storageService: StorageService, private movieService: MoviesService) { }

  async ngOnInit() {
    this.peliculasFavoritas = await this.storageService.cargarFavoritosDesdeStorage()

    /*await this.movieService.cargarGeneros().subscribe(resp => {
      this.generos = resp.genres
      console.log('Intento de imprimir generos en onInit tab3 dentro de llaves: ', this.generos);

      this.pelisPorGenero(this.generos, this.peliculasFavoritas)
      // aqui si que estarán los datos correctos porque aunque está más arriba
      // esta dentro de del bloque del subscribe
    });*/

    /* ALTERNATIVA CON PROMESAS*/
    const resp = await firstValueFrom(this.movieService.cargarGeneros());
    this.generos = resp.genres;
    this.pelisPorGenero(this.generos, this.peliculasFavoritas) // no lo pongo aqui porque igual no están los datos
  }


  /* Creo este tipo de objeto que será un array de cosas donde cada cosa tendrá un genero y un array de peliculas*/


  favoritasPorGeneroGlobal!: any[]

  pelisPorGenero(generos: Genero[], peliculasFavoritas: DetallesPelicula[]) {

    this.favoritasPorGeneroGlobal = []

    generos.forEach(genero => {
      // Creamos el objeto con el nombre del género, y peliculas vacio

      const favoritasPorGeneroEnMetodo: { genero: string, peliculas: DetallesPelicula[] } = ({
        genero: genero.name,
        peliculas: []
      })

      peliculasFavoritas.forEach(pelicula => {

        pelicula.genres!.forEach(peliculaGenero => {
          // Si el ID del género de la película coincide con el ID del género actual
          if (peliculaGenero.id === genero.id) {
            //Metemos esa pelicula en el array peliculas dentro del array favoritas por genero.
            favoritasPorGeneroEnMetodo.peliculas.push(pelicula)
          }

        })

      });
      this.favoritasPorGeneroGlobal.push(favoritasPorGeneroEnMetodo);

      console.log('IMPRESION DE FAVORITAS POR GENERO', favoritasPorGeneroEnMetodo);
    });

    console.log('IMPRESION DE FAVORITAS POR GENERO GLOBAL', this.favoritasPorGeneroGlobal);
  }
}
