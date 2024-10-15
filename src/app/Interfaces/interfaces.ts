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

export interface DetallesPelicula {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: ColeccionQuePertenece;
    budget?: number;
    genres?: Genero[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    origin_country?: string[];
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    release_date?: Date;
    revenue?: number;
    runtime?: number;
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface ColeccionQuePertenece {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genero {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}


export interface ActoresPelicula {
    id?: number;
    cast: Cast[];
    crew?: Cast[];
}

export interface Cast {
    adult?: boolean;
    gender?: number;
    id?: number;
    known_for_department?: Department;
    name?: string;
    original_name?: string;
    popularity?: number;
    profile_path: string;
    cast_id?: number;
    character?: string;
    credit_id?: string;
    order?: number;
    department?: Department;
    job?: string;
}

export enum Department {
    Acting = "Acting",
    Art = "Art",
    Camera = "Camera",
    CostumeMakeUp = "Costume & Make-Up",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Lighting = "Lighting",
    Production = "Production",
    Sound = "Sound",
    VisualEffects = "Visual Effects",
    Writing = "Writing",
}
