import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {

  }

  getFeature() {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1865f43a0549ca50d341dd9ab8b29f49&primary_release_date.gte=2020-01-01&language=es&include_image_language=es`)
  }
}
