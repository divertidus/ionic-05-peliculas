import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DetallesPelicula } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log("Ionic Storage inicializado: ", storage);
  }

  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public remove(key: string) {
    return this._storage?.remove(key);
  }

  public clear() {
    return this._storage?.clear();
  }

  /* DESDE AQUI, IGNORAR LO ANTERIOR- pedir explicaciones paso a paso al chat de esto proximo dia.*/
  peliculasGuardadas: DetallesPelicula[] = [];

  guardarPelicula(peliculaRecibida: DetallesPelicula) {

    this.peliculasGuardadas.push(peliculaRecibida)

    this.storage.set('peliculas', this.peliculasGuardadas);
  }
}