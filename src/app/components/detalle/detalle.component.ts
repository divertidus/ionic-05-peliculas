import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ModalController } from '@ionic/angular';
import { ActoresPelicula, DetallesPelicula } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  standalone: true,
  styleUrls: ['./detalle.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalleComponent implements OnInit {


  @Input() idPelicula!: number

  private detallesPelicula!: DetallesPelicula;
  private actoresPelicula!: ActoresPelicula;
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("Se recibe ID: ", this.idPelicula)

    this.moviesService.getPeliculaDetalles(this.idPelicula)
      .subscribe(resp => {
        console.log(resp)
      })


    this.moviesService.getPeliculaActores(this.idPelicula)
      .subscribe(resp => {
        console.log(resp)
      })

  }

  onClick() {

    console.log("click en boton del modal")
    this.modalCtrl.dismiss();
  }



}
