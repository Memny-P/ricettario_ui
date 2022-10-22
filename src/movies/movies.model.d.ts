import { actorMovieDTO } from "../actors/actors.model";

// exporting interfaces
export interface movieDTO {
    id: number;
    title: string;
    poster: string;
}
export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatersIds?: number[];
    actors?: actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDTO[]; // di base sono nullable perchè all'inizio del caricamento dell'app potrebbero non avere nessun valore
    upcomingReleases?: movieDTO[];
}