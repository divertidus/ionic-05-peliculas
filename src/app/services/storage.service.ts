import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DetallesPelicula, Pelicula } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  private _storage: Storage | null = null;
  private _peliculasFavoritas!: Pelicula[]

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavoritos();
    console.log("Ionic Storage inicializado: ", storage);
  }

  async loadFavoritos() {
    try {
      const _peliculasFavoritas = await this._storage?.get('peliculas') //Recordamos que el 'articles' es la key.
      //No deberia, pero si fuese null cargaremos un array vacio. Por eso:   this._peliculasFavoritas = _peliculasFavoritas || [];
      this._peliculasFavoritas = _peliculasFavoritas || [];
      return this._peliculasFavoritas;
    }
    catch {
      console.log("No hay favoritos. Se devuelve array vacío")
      return [];
    }
  }

  async getLocalPeliculas(): Promise<Pelicula[]> {
    if (this._peliculasFavoritas.length === 0) {
      if (!this._storage) {
        await this.init();
      }
      const savedPeliculas = await this._storage?.get('peliculas');
      this._peliculasFavoritas = savedPeliculas || [];
    }
    return [...this._peliculasFavoritas]; // Devuelve una copia para evitar mutaciones accidentales
  }

  /*Metodo para saber si una pelicula está o no en favoritos
  Debe regresar un boolean así que con !! lo convertimos*/
  peliculaEnFavoritos(detallesPelicula: DetallesPelicula) {
    if (!detallesPelicula || !detallesPelicula.title) {
      console.log("peliculaEnFavoritos estaria false" + detallesPelicula.title)
      return false;  // Sila pelicula no está definido o no tiene un 'title', retorna false
    }
    console.log("articuloEnFavoritos estaria true")
    return !!this._peliculasFavoritas.find(peliculaLocal => peliculaLocal.title === detallesPelicula.title);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }


  async saveRemovePelicula(peliculaRecibida: Pelicula) {

    // Asi buscamos y guardamos la pelicula en exists si es que existe (se comparará con if (exists))
    const exists = this._peliculasFavoritas.find(localArticle => localArticle.title === peliculaRecibida.title)
    // Asi buscamos y guardamos el indice de la pelicula si es que existe (se comparará con if (index !== -1) {)
    const indiceEncontrado = this._peliculasFavoritas.findIndex(localArticle => localArticle.title === peliculaRecibida.title)

    /*ATENCION, "exists" NO ES UN BOOLEAN. 
    SI EXISTE GUARDA la pelicula Y SINO NO. CON DOBLE EXCLAMACION SE CONVIERTE A BOOLEAN
    Al comprobar  "if (exists)"" se está comprobando si tiene algun valor, 
    lo cual ya nos sirve como true y a la vez ya tenemos dicho valor. Pero no tiene un true o un false.
    Si tiene algo significa que en realidad queremos borrar porque ya existe.
    Para esto hay dos formas, 
      A. - o filtramos la lista de noticias para excluirla -> Por eso arriba el uso de exists indiceEncontrado
      B. - o obtenemos el índice y se usa splice -> Por eso arriba el uso de const indiceEncontrado    
    En ambos casos luego habrá que volver a guardar en el storage this._localArticles tras su modificacion
    
    */

    /*Forma A*/
    if (exists) {
      console.log("Se ve que ya existia. A borrar usando filter")
      // Hacemos que la lista sea igual a la lista tras filtrar por el titulo dla pelicula que existe. Es como eliminarlo...
      this._peliculasFavoritas = this._peliculasFavoritas.filter(_peliculasFavoritas => _peliculasFavoritas.title !== peliculaRecibida.title)

      /*Forma B*/
      /*
      if (indiceEncontrado !== -1) {
        console.log("La pelicula ya existía. Eliminándolo con slice");
        this._localArticles.splice(indiceEncontrado, 1);
      }
        */

      // Guardamos la lista actualizada en el storage
      await this._storage?.set('peliculas', this._peliculasFavoritas);

      // Comprobación por consola
      console.log("Pelicula eliminada: ", this._peliculasFavoritas);

    } else {

      //Esto es: mi array de articulos será igual al articulo recibido +  los articulos que ya tenia.
      //Lo podría poner en orden inverso [...this._localArticles,articuloRecibido,] pero asi tengo "primero el nuevo".
      this._peliculasFavoritas = [peliculaRecibida, ...this._peliculasFavoritas]

      //Uso mi storage para grabar ( set) una key que se llame articulos, y en ella guardo todo el array de articulos.
      //No necesito serializar ni convertir a String ni nada porque el Storage ya graba objetos
      await this._storage?.set('peliculas', this._peliculasFavoritas)

      //Comprobación por consola
      console.log("Pelicula guardada: ", this._peliculasFavoritas);
    }

  }
}
