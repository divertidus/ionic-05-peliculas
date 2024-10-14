import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ModalController } from '@ionic/angular';
import { ActoresPelicula, DetallesPelicula } from 'src/app/Interfaces/interfaces';
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import * as todosLosIconos from 'ionicons/icons';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  standalone: true,
  styleUrls: ['./detalle.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ImagenPipe, NgIf]
})
export class DetalleComponent implements OnInit {


  @Input() idPelicula!: number


  detallesPelicula: DetallesPelicula = {};
  actoresPelicula: ActoresPelicula = {};

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {
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
        this.actoresPelicula = resp;
      })

  }

  onClick() {

    console.log("click en boton del modal")
    this.modalCtrl.dismiss();
  }



}
