import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonGrid, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Pelicula } from '../Interfaces/interfaces';
import { StorageService } from '../services/storage.service';
import { ImagenPipe } from "../pipes/imagen.pipe";
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [StorageService],
  standalone: true,
  imports: [IonCard, NgFor, IonCardContent, IonCardSubtitle,
    IonCardHeader, IonCol, IonRow, IonGrid, IonList, IonHeader,
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ImagenPipe],
})
export class Tab3Page {

  mostrarDetalles(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private storageService: StorageService, private cd: ChangeDetectorRef) { }


  /* AUNQUE DEBAJO HAY OTRA FORMA, ESTA ES SUPERSENCILLA. AL HACER EL get metodo 
 PUED0O ASIGNAR DIRECTAMENTE SU NOMBRE EN EL HTML
 ACTUA A LA VEZ DE METODO Y DE VARIABLE. ADEMAS AL SER UN GET 
 ANGULAR LO REFRESCA AUTOMATICAMNETE, DE MODO QUE SI QUITO 
 O AÑADO FAVORITOS YA SE APLICAN LOS CAMBIOS
 NATURALMENTE TAMBIEAN HAY COSITAS EN EL STORAGESERVICE
 LO MAS IMPORTANTE EL loadFvourites en el init de dicho servicio, 
 isno no se ve al refrescar la pagina en tab3*/

  private peliculas: Pelicula[] = []; // Almacena las películas localmente

  // Getter que devuelve las películas almacenadas localmente
  get peliculasFavoritas(): Pelicula[] {
    return this.peliculas;
  }

  // Método que actualiza las películas asíncronamente
  async cargarPeliculasFavoritas(): Promise<void> {
    this.peliculas = await this.storageService.getLocalPeliculas();
  }

  ionViewWillEnter() {
    console.log("me ejecuto cada vez que se entra en la vista?");

    // Intenta manipular directamente el DOM para forzar el título a reaparecer
    const titleElement = document.querySelector('ion-title');
    if (titleElement) {
      titleElement.innerHTML = 'Favoritos'; // Forzar la actualización del contenido del título
    }

    this.cd.detectChanges(); // Forzar la detección de cambios
  }
}
