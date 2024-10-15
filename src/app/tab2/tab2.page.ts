import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonLabel, IonList, IonListHeader, IonButton, IonItem, IonGrid, IonRow, IonCol, IonSpinner, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import * as todosLosIconos from 'ionicons/icons'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMovieDB } from '../Interfaces/interfaces';
import { ImagenPipe } from "../pipes/imagen.pipe";
import { SlideshowPosterComponent } from "../components/slideshow-poster/slideshow-poster.component";
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonSpinner, IonCol, IonRow, IonGrid, IonItem, IonButton, NgFor, IonListHeader,
    IonList, IonLabel, IonSearchbar, IonHeader, IonToolbar, FormsModule, NgIf,
    IonTitle, IonContent, ExploreContainerComponent, ImagenPipe, SlideshowPosterComponent]
})
export class Tab2Page implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;

  peliculasBuscadas: Pelicula[] = []

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) { addIcons(todosLosIconos) }


  ngOnInit() {
    this.peliculasBuscadas = []

    /* this.movieService.getPeliculaPorSearch(this.textoBuscado).subscribe((resp: RespuestaMovieDB) => {
       // console.log('Respuesta para peliculasRecientes en tab1.ts', resp);
       this.peliculasBuscadas = resp.results;
     })*/
  }

  textoBuscado: string = ''
  buscando: boolean = false

  ideas: string[] = ['Spiderman', 'Deadpool', 'Joker', 'El hoyo', 'Terrifier', 'Mad Max']

  buscar(event: CustomEvent) {
    this.buscando = true;
    const valor = event.detail.value
    console.log(valor);
    this.textoBuscado = valor
    if (this.textoBuscado !== '') { //asi evito que se realicen busquedas cuando el cuadro está vacio.
      this.realizarBusqueda(this.textoBuscado)
    } else {
      this.peliculasBuscadas = [] // Y si no hay nada, vacío el array.
    }
    this.buscando = false;
    console.log(this.textoBuscado);

  }

  elegirIdea(idea: string) {
    this.buscando = true;
    this.textoBuscado = idea;
    this.searchbar.setFocus();
    this.searchbar.value = idea;

    // Crear y disparar un evento InputEvent
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
    });
    this.searchbar.getInputElement().then(input => {
      input.dispatchEvent(inputEvent);
    });
  }

  realizarBusqueda(textoQueBuscar: string) {
    this.movieService.getPeliculaPorSearch(textoQueBuscar)
      .subscribe(resp => {
        this.peliculasBuscadas = resp.results
        console.log(resp);
      })
  }

  swiperOptsActores = {
    slidesPerView: 3.2,   // Muestra 1.1 diapositivas
    freeMode: true,       // Activa el modo libre para deslizar sin ajustar
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {
    return this.swiperOptsActores.freeMode.toString();
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
}