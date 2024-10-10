export interface RespuestaMovieDB { //Podemos decir que la respuestas que nos devuelve como Json la API de movie DB es de este tipo.
    page: number;
    results: Pelicula[];
    total_pages: number;
    total_results: number;
}

export interface Pelicula {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
    Ko = "ko",
    Th = "th",
}