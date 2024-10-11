import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares',
  standalone: true
})
export class ParesPipe implements PipeTransform {

  transform(arr: any[]): any[] {

    const pares = arr.reduce((result, value, index, array) => {

      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    console.log(pares)
    return pares;
  }

}


/* EXPLICACION LINEA A LINEA
import { Pipe, PipeTransform } from '@angular/core';  
// Importa las clases Pipe y PipeTransform desde el módulo core de Angular.
// 'Pipe' permite definir un pipe en Angular y 'PipeTransform' define una interfaz que necesita implementar la clase para hacer la transformación.

@Pipe({
  name: 'pares', 
  // Define el nombre del pipe, que será utilizado en las plantillas HTML. 
  // Cuando quieras usar este pipe, se referirá como 'pares'.

  standalone: true
  // Indica que este pipe es standalone, lo que significa que no necesita estar declarado en ningún módulo.
})
export class ParesPipe implements PipeTransform {
  // Define la clase `ParesPipe` y declara que implementa la interfaz `PipeTransform`.
  // La interfaz `PipeTransform` requiere que implementemos el método `transform`.

  transform(arr: any[]): any[] {
    // El método `transform` es obligatorio en los pipes. 
    // Recibe un argumento `arr` que es un array de cualquier tipo (`any[]`) y devuelve un array también de cualquier tipo (`any[]`).

    const pares = arr.reduce((result, value, index, array) => {
      // `reduce` es un método de arrays que toma un "acumulador" (`result` en este caso), 
      // el valor actual del array (`value`), el índice (`index`) y el array completo (`array`).
      // El objetivo de `reduce` es construir un nuevo array agrupando elementos de dos en dos.

      if (index % 2 === 0) {
        // Si el índice es par (0, 2, 4, ...), se ejecuta el código dentro del bloque.
        // Esto asegura que solo se procesen los elementos en posiciones pares.

        result.push(array.slice(index, index + 2));
        // `slice` crea un subarray de dos elementos: el elemento en la posición `index` y el siguiente (`index + 1`).
        // Luego, ese subarray se agrega (`push`) al acumulador `result`.
        // De esta manera, estamos agrupando pares de elementos en un array de subarrays.
      }
      return result;
      // Se devuelve el acumulador `result`, que sigue acumulando los subarrays de pares de elementos.
    }, []);
    // `[]` es el valor inicial del acumulador `result`. Comenzamos con un array vacío y lo vamos llenando.

    return pares;
    // Finalmente, devuelve el array `pares`, que contiene subarrays con pares de elementos.
  }

}
*/

/* EXPLICACION FUNCIONALIDAD Y USO

Claro, te voy a explicar este código paso a paso, comentando cada línea y luego te daré una explicación general de lo que hace el Pipe ParesPipe en Angular.

Código Comentado Línea por Línea:
ts
Copiar código
import { Pipe, PipeTransform } from '@angular/core';  
// Importa las clases Pipe y PipeTransform desde el módulo core de Angular.
// 'Pipe' permite definir un pipe en Angular y 'PipeTransform' define una interfaz que necesita implementar la clase para hacer la transformación.

@Pipe({
  name: 'pares', 
  // Define el nombre del pipe, que será utilizado en las plantillas HTML. 
  // Cuando quieras usar este pipe, se referirá como 'pares'.

  standalone: true
  // Indica que este pipe es standalone, lo que significa que no necesita estar declarado en ningún módulo.
})
export class ParesPipe implements PipeTransform {
  // Define la clase `ParesPipe` y declara que implementa la interfaz `PipeTransform`.
  // La interfaz `PipeTransform` requiere que implementemos el método `transform`.

  transform(arr: any[]): any[] {
    // El método `transform` es obligatorio en los pipes. 
    // Recibe un argumento `arr` que es un array de cualquier tipo (`any[]`) y devuelve un array también de cualquier tipo (`any[]`).

    const pares = arr.reduce((result, value, index, array) => {
      // `reduce` es un método de arrays que toma un "acumulador" (`result` en este caso), 
      // el valor actual del array (`value`), el índice (`index`) y el array completo (`array`).
      // El objetivo de `reduce` es construir un nuevo array agrupando elementos de dos en dos.

      if (index % 2 === 0) {
        // Si el índice es par (0, 2, 4, ...), se ejecuta el código dentro del bloque.
        // Esto asegura que solo se procesen los elementos en posiciones pares.

        result.push(array.slice(index, index + 2));
        // `slice` crea un subarray de dos elementos: el elemento en la posición `index` y el siguiente (`index + 1`).
        // Luego, ese subarray se agrega (`push`) al acumulador `result`.
        // De esta manera, estamos agrupando pares de elementos en un array de subarrays.
      }
      return result;
      // Se devuelve el acumulador `result`, que sigue acumulando los subarrays de pares de elementos.
    }, []);
    // `[]` es el valor inicial del acumulador `result`. Comenzamos con un array vacío y lo vamos llenando.

    return pares;
    // Finalmente, devuelve el array `pares`, que contiene subarrays con pares de elementos.
  }

}
Explicación General del ParesPipe:
Este pipe toma un array y lo transforma en un array de subarrays, donde cada subarray contiene un par de elementos consecutivos del array original.

Método transform(arr: any[]):

Recibe como entrada un array (arr).
Luego, utiliza el método reduce para recorrer el array y agrupar sus elementos de dos en dos.
Cada vez que encuentra un índice par (index % 2 === 0), extrae dos elementos consecutivos usando slice(index, index + 2) y los agrega al array result.
reduce():

Es una función muy común en JavaScript que permite "reducir" un array a un solo valor, en este caso, un nuevo array de pares.
Se inicializa con un array vacío ([]).
Para cada par de elementos, se agrega ese par a result.
Resultado:

Si el array original es [1, 2, 3, 4, 5, 6], el resultado será [[1, 2], [3, 4], [5, 6]].
Si el array tiene un número impar de elementos, por ejemplo [1, 2, 3, 4, 5], el último subarray será incompleto: [[1, 2], [3, 4], [5]].
Este pipe es útil cuando necesitas agrupar elementos de un array en pares, como por ejemplo para mostrar elementos en un diseño de cuadrícula o en filas con dos columnas.

Ejemplo de Uso en HTML:
Si tienes un array en tu componente:

ts
Copiar código
export class MiComponente {
  miArray = [1, 2, 3, 4, 5, 6];
}
Puedes usar el pipe en la plantilla para agrupar los elementos de dos en dos:

html
Copiar código
<div *ngFor="let par of miArray | pares">
  {{ par }}
</div>
Esto mostrará:

csharp
Copiar código
[1, 2]
[3, 4]
[5, 6]
Cada par es un subarray de dos elementos, transformado por el pipe pares.
*/