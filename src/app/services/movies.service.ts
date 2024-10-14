import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMovieDB } from '../Interfaces/interfaces';
import { environment } from 'src/environments/environment';


const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // Propiedad privada para la gestion de las páginas.
  private popularesPagina = 0;

  constructor(private http: HttpClient) {

  }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;

    query = query + `&api_key=${apiKey}&language=es&include_image_language=es`
    // console.log(query) // Para comprobar que la URl está siendo correcta

    return this.http.get<T>(query) //importante aqui la <T> en el return
  }

  getFeature() {
    /*Tras crear las constantes de URL y apiKey que traen el contenido como variables globales en enviroment 
    y tras crear el metodo ejecutar quest que va formando la url para la consulta con esos y otros dataos
    cambio este metodo de getFeature para que no use tolo lo anterior sino que llame al otro metodo
    pasandole solo lo que necesita.
    Cambiamos la sentencia anterior:
     //return this.http.get<RespuestaMovieDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2020-01-01&api_key=1865f43a0549ca50d341dd9ab8b29f49&language=es&include_image_language=es`)
    por:return this.ejecutarQuery<RespuestaMovieDB>("discover/movie?primary_release_date.gte=2020-01-01");

    De modo que solo se mande el codigo que realmente es unico de esta peticion, 
    aun asi hay que retocar para que cosas como la fecha sean modificables
    */

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate /* MIRAR NOTAS DEBAJO*/
    const mes = hoy.getMonth() + 1; // A los meses se les suma 1 porque empiezan en 0
    // El mes no me vale como 1,2,3 necesito que sea 01,02,03 asi queharemos una variable para el mes, pero solo si es menor que 10
    let mesString

    // Si el mes tiene 1 cifra le concateno el cero a mes
    if (mes < 10) {
      mesString = '0' + mes;
    } else { // Y sino, mesString será simplemente el mes porque ya tiene 2 cifras
      mesString = mes
    }

    const fechaInicio = `${hoy.getFullYear()}-${mesString}-01`; //01 porque en este caso quiero el dia 1 siempre
    const fechaFinal = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMovieDB>(`/discover/movie?primary_release_date.gte=${fechaInicio}&rimary_release_date.lte=${fechaFinal}`);

  }

  /* Incoroporo el uso de las paginas con su incremento */
  getPopulars() {

    //dado que empiezo en cero ya empiezo incrementándola.
    this.popularesPagina++;
    // eso del sort se ve en https://developer.themoviedb.org/reference/discover-movie
    // incorporo la pagina con $page=${this.popularesPagina}
    // ahora cada vez que se llame nos dará la siguiente página.
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPagina}`

    return this.ejecutarQuery<RespuestaMovieDB>(query);
  }
}

/*Respecto a las const de hoy de ultimoDia: 
explico paso a paso qué hace este fragmento de código:

1. const hoy = new Date();
Esta línea crea un objeto Date que representa la fecha y hora actuales.
new Date() sin argumentos devuelve la fecha y hora en el momento exacto en que se ejecuta el código.
 Por ejemplo, si se ejecuta el 11 de octubre de 2024 a las 14:00, entonces hoy tendrá ese valor.
Ejemplo:

const hoy = new Date();
console.log(hoy); 

// Salida: Fri Oct 11 2024 14:00:00 GMT+0000 (Coordinated Universal Time)

2. const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
Esta línea está calculando el último día del mes actual.
Vamos a desglosarlo:
Desglose:
hoy.getFullYear():

getFullYear() obtiene el año actual de la fecha hoy. Por ejemplo, 
si la fecha actual es el 11 de octubre de 2024, hoy.getFullYear() devolvería 2024.
hoy.getMonth() + 1:

getMonth() devuelve el número del mes actual, pero empezando desde 0 (enero es 0, febrero es 1, etc.).
Si el mes actual es octubre (mes 9, porque empieza en 0), entonces hoy.getMonth() devolverá 9.
 Al sumarle 1, obtenemos 10, lo que representa noviembre.
Este valor 10 se usa para crear un nuevo objeto Date que corresponde al último día del mes.
new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0):

El constructor de Date en JavaScript acepta tres parámetros: año, mes (donde el mes 0 es enero) y día.
Al pasar 0 como el día, JavaScript automáticamente calcula el último día del mes anterior al mes especificado.
Por ejemplo, si le pasamos hoy.getFullYear() (2024),
 hoy.getMonth() + 1 (10, que es noviembre) y 0, el resultado es el último día de octubre de 2024.
En este caso, new Date(2024, 10, 0) creará un objeto Date que corresponde al 31 de octubre de 2024.
.getDate():

El método .getDate() obtiene el día del mes de una fecha Date.
En este caso, estamos llamando a getDate() en el objeto Date que representa el 31 de octubre de 2024,
 por lo que el valor devuelto será 31.
Resumen:
hoy contiene la fecha actual.
ultimoDia calcula el último día del mes actual (en formato numérico). 
En el caso de octubre de 2024, ultimoDia será 31, porque octubre tiene 31 días.

Ejemplo completo:
Si hoy es el 11 de octubre de 2024:


const hoy = new Date();  
console.log(hoy);  // Fri Oct 11 2024 14:00:00 GMT+0000 (Coordinated Universal Time)

const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
console.log(ultimoDia);  // 31
Esto es útil si necesitas saber cuántos días tiene el mes en curso, como para calcular 
rangos de fechas o hacer validaciones.
*/
