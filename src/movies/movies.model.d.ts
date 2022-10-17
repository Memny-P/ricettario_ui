// exporting interfaces
export interface movieDTO{
    id:number;
    title: string;
    poster: string;
}

export interface landingPageDTO{
    inTheaters?:movieDTO[]; // di base sono nullable perchè all'inizio del caricamento dell'app potrebbero non avere nessun valore
    upcomingReleases?:movieDTO[];
}