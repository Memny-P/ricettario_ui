export interface actorDTO {
    id: number;
    name: string;
    biography: string;
    dateOfBirth: date;
    picture: string;
}

export interface actorCreationDTO {
    name: string;
    dateOfBirth?: date;
    picture?: File;
    pictureURL?: string;
    biography?: string;
}

export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    picture: string;
}