import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonLabel, IonList, IonListHeader, IonButton, IonItem, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import * as todosLosIconos from 'ionicons/icons'
import { NgFor } from '@angular/common'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCol, IonRow, IonGrid, IonItem, IonButton, NgFor, IonListHeader,
    IonList, IonLabel, IonSearchbar, IonHeader, IonToolbar, FormsModule,
    IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;

  constructor() { addIcons(todosLosIconos) }

  textoBuscado = ''

  ideas: string[] = ['Spiderman', 'Deadpool', 'Joker', 'El hoyo', 'Terrifier', 'Mad Max']

  buscar(event: CustomEvent) {
    const valor = event.detail.value
    console.log(valor);
    this.textoBuscado = valor
  }

  elegirIdea(idea: string) {
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
}