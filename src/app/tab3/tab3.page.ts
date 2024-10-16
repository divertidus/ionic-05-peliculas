import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StorageService } from 'src/app/services/storage.service';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
import { DetallesPelicula, Genero, Pelicula } from '../Interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [StorageService],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SlideshowPosterComponent],
})
export class Tab3Page implements OnInit {

  peliculasFavoritas: DetallesPelicula[] = [];

  generos: Genero[] = []


  constructor(private storageService: StorageService, private movieService: MoviesService) { }

  async ngOnInit() {
    this.peliculasFavoritas = await this.storageService.cargarFavoritosDesdeStorage()
    await this.movieService.cargarGeneros().subscribe(resp => {
      this.generos = resp.genres
      console.log('Intento de imprimir generos en onInit tab3 dentro de llaves: ', this.generos);
    });
  }
}
