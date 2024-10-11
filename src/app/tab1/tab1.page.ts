import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMovieDB } from '../Interfaces/interfaces';
import { NgFor } from '@angular/common';
import { ImagenPipe } from "../pipes/imagen.pipe";

import { register, SwiperContainer } from 'swiper/element/bundle';

register();  // Esto asegura que Swiper se registre correctamente como componente web




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // para los swipper
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, NgFor, ImagenPipe],
})
export class Tab1Page implements OnInit {

  // Declaro un array que será del tipo que definimos en la interfaz. De modo que puedo 
  // guardar aqui la resp.results porque es eso, el array de peliculas que me trae la respuesta.
  // Eso lo hago en el ngOnInit  con "this.peliculasRecientes = resp.results;"

  peliculasRecientes: Pelicula[] = [];

  swiperOpts = {
    slidesPerView: 1.2,   // Muestra 1.1 diapositivas
    freeMode: true,       // Activa el modo libre para deslizar sin ajustar
  };

  // Getter para convertir el valor booleano a string
  get freeModeString(): string {
    return this.swiperOpts.freeMode.toString();
  }

  constructor(private moviesService: MoviesService) {

  }



  ngOnInit(): void {
    // Con esto imprimo en consola lo devuelto
    this.moviesService.getFeature().subscribe(console.log);

    // Con esto imprimo en consola lo devuelto pero de otra forma y no se de que me vale  (ver comentarios abajo de todo)
    // Ahora,tras modificar el servicio para tipar getFeature a   return this.http.get<RespuestaMovieDB>(url bla bla......)
    // se que resp será de tipo RespuestaMovieDB por lo que con . puedo acceder a sus campos declarados en la interfaz.
    // Por ejemplo console.log('Respuesta', resp.results)
    /* Como en la declaracion del metodo ya digo el tipo. Puedo quitarlo y asi quito el import pero ahora lo dejo.
    // Es decir, me sirve tanto 

            this.moviesService.getFeature().subscribe((resp: RespuestaMovieDB) => { 
      como
            this.moviesService.getFeature().subscribe((resp) => { 
      */
    //this.moviesService.getFeature().subscribe((resp) => { 
    this.moviesService.getFeature().subscribe((resp: RespuestaMovieDB) => {
      console.log('Respuesta', resp);
      this.peliculasRecientes = resp.results;
      console.log(this.peliculasRecientes)
    });

  }


}


/* EXPLICAION DE LO DE DENTRO DEL SUBSCRIBE DE ngOnInit para mostrar. Pego el codigo debajo por si con las iteraciones se elimina
el de arriba, que quede aqui explicado.

ngOnInit(): void {
    // Con esto imprimo en consola lo devuelto
    this.moviesService.getFeature().subscribe(console.log);

    // Con esto imprimo en consola lo devuelto pero de otra forma y no se de que me vale  (ver comentarios abajo de todo)
    this.moviesService.getFeature().subscribe(resp => {
      console.log('Respuesta', resp)
    });

  }

En ambos casos estás suscribiéndote al Observable que devuelve el método getFeature() 
del servicio MoviesService. Sin embargo, la diferencia radica en cómo manejas la respuesta 
que se recibe del Observable.

Opción 1: subscribe(console.log)
ts
Copiar código
this.moviesService.getFeature().subscribe(console.log);
Esta es la manera más directa de imprimir en la consola lo que se recibe de la API. 
Aquí simplemente pasas console.log como un callback para manejar la respuesta. 
Angular llama a console.log() con la respuesta del Observable tan pronto como los datos llegan.

Pros:

Muy breve y directo, ideal para depurar o revisar datos rápidamente.
Contras:

No es flexible si necesitas hacer algo más con la respuesta, 
como procesarla o asignarla a variables para usarla en tu aplicación.
Opción 2: subscribe(resp => { ... })
ts
Copiar código
this.moviesService.getFeature().subscribe(resp => {
  console.log('Respuesta', resp);
});
En esta opción, defines un callback personalizado que toma el valor de la respuesta (resp) y ejecuta 
cualquier código dentro del bloque { ... }. Aquí decides cómo manejar la respuesta. 
En este caso, solo imprimes 'Respuesta' junto con los datos en la consola, 
pero tienes total control para hacer más cosas, como:

Almacenar la respuesta en una variable de la clase.
Filtrar o manipular los datos.
Ejecutar lógica adicional como mostrar una notificación o modificar el estado de la UI.
Pros:

Mucho más flexible, puedes procesar la respuesta o realizar múltiples acciones basadas 
en los datos que recibes.
Contras:

Es un poco más verboso, pero te ofrece más control.
¿Cuándo usar cada uno?
subscribe(console.log): Útil si solo quieres inspeccionar rápidamente lo que está devolviendo la API,
 sin preocuparte por el formato o la manipulación de los datos.

subscribe(resp => { ... }): Útil si necesitas realizar más acciones 
con los datos (almacenarlos, procesarlos, o manipularlos). 
Es más adecuado para situaciones en las que vas a usar la respuesta dentro de tu aplicación.

Ejemplo de uso más avanzado con subscribe:
ts
Copiar código
this.moviesService.getFeature().subscribe(resp => {
  // Almacena los datos en una variable para usarlos en la vista
  this.movies = resp;

  // Muestra un mensaje en consola para depuración
  console.log('Películas obtenidas:', this.movies);

  // Aquí podrías hacer más operaciones, como filtrar o transformar los datos
});
En resumen, la segunda forma te permite manejar la respuesta de una manera más flexible y
 controlada, mientras que la primera es más simple y directa para revisar los datos sin mucha manipulación.
*/