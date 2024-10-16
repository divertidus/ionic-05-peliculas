/* Importamos las herramientas necesarias */
import { Injectable } from '@angular/core';
// Injectable es un decorador que permite que este servicio sea inyectado en otros componentes o servicios

import { Storage } from '@ionic/storage-angular';
// Storage es la clase principal de Ionic Storage que nos permite guardar y recuperar datos

import { DetallesPelicula } from '../Interfaces/interfaces';
// Importamos la interfaz DetallesPelicula que define la estructura de los datos de una película

/* Decorador que marca esta clase como un servicio inyectable */
@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class StorageService {
  /* Variable privada para almacenar la instancia de Storage */
  private _storage: Storage | null = null;

  /* Constructor del servicio */
  constructor(private storage: Storage) {
    this.init(); // Llamamos al método init cuando se crea una instancia de este servicio
  }

  /* Método para inicializar el almacenamiento */
  async init() {
    // async indica que esta función devuelve una Promesa
    const storage = await this.storage.create();
    // Creamos una instancia de Storage y esperamos a que esté lista
    this._storage = storage;
    // Guardamos la instancia creada en nuestra variable privada
    console.log("Ionic Storage inicializado: ", storage);
    // Mostramos un mensaje en la consola para confirmar la inicialización
  }

  /* Método para guardar datos */
  public set(key: string, value: any) {
    return this._storage?.set(key, value);
    // Guardamos un valor asociado a una clave (key)
    // El ? es para evitar errores si _storage es null
  }

  /* Método para obtener datos */
  public get(key: string) {
    return this._storage?.get(key);
    // Recuperamos el valor asociado a una clave (key)
  }

  /* Método para eliminar datos */
  public remove(key: string) {
    return this._storage?.remove(key);
    // Eliminamos el valor asociado a una clave (key)
  }

  /* Método para borrar todos los datos */
  public clear() {
    return this._storage?.clear();
    // Borramos todos los datos almacenados
  }

  /* Array para almacenar las películas guardadas */
  peliculasGuardadas: DetallesPelicula[] = [];

  /* Método para guardar una película */
  guardarPelicula(peliculaRecibida: DetallesPelicula) {
    // Añadimos la película recibida al array de películas guardadas
    this.peliculasGuardadas.push(peliculaRecibida)

    // Guardamos todo el array actualizado en el almacenamiento
    this.storage.set('peliculas', this.peliculasGuardadas);
  }
}

/* Pasos necesarios para implementar Ionic Storage en un proyecto Ionic con Angular y Capacitor, usando componentes standalone en su última versión:

Instalar Ionic Storage:
  npm install @ionic/storage-angular
Crear el servicio de Storage:
  ionic g s services/storage
Configurar main.ts:

Importar IonicStorageModule y importProvidersFrom:

  import { IonicStorageModule } from '@ionic/storage-angular';
  import { importProvidersFrom } from '@angular/core';
Añadir IonicStorageModule a los providers:
  bootstrapApplication(AppComponent, {
  providers: [
  // ... otros providers
  IonicStorageModule,
  importProvidersFrom(IonicStorageModule.forRoot()),
  ],
  });

Explicación:

IonicStorageModule es el módulo principal de Ionic Storage.
importProvidersFrom es una función que permite usar módulos en aplicaciones standalone.
IonicStorageModule.forRoot() inicializa Ionic Storage para toda la aplicación.


En los componentes donde se quiera usar el servicio:

Importar el servicio:
import { StorageService } from 'src/app/services/storage.service';
Añadir el servicio a los providers del componente:
providers: [StorageService],
Inyectar el servicio en el constructor:
constructor(private storageService: StorageService)



Explicaciones adicionales:

El método init() es asíncrono (async) porque la creación del almacenamiento puede llevar tiempo.
Se usa 'await' para esperar a que la operación asíncrona se complete.
Los métodos set(), get(), remove() y clear() son las operaciones básicas para manipular datos.
Usan una 'key' (clave) para identificar los datos, similar a un diccionario.
Se pueden guardar múltiples valores asociados a diferentes claves.
El método guardarPelicula() es un ejemplo de cómo usar el almacenamiento para un caso específico.
Guarda un array de películas bajo la clave 'peliculas'.

*/