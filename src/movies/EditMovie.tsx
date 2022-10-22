import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.module";
import { movieTheatersDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie() {

    const nonSelectedGenres: genreDTO[] = [{ id: 2, name: 'Drama' }];
    const selectedGenres: genreDTO[] = [{ id: 1, name: 'Comedy' }];

    const nonSelectedMovieTheaters: movieTheatersDTO[] = [{ id: 2, name: 'Arcadia' }];
    const selectedMovieTheaters: movieTheatersDTO[] = [{ id: 1, name: 'Sabil' }];

    const selectedActors: actorMovieDTO[] = [
        { id: 1, name: "Felipe", character: 'Geralt', picture: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tom_Holland_by_Gage_Skidmore.jpg' },]
    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm

                model={{
                    title: 'Toy story', inTheaters: false,
                    trailer: 'url', releaseDate: new Date('2019-01-01T00:00:00')
                }}
                onSumbit={values => console.log(values)}
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={selectedGenres}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedMovieTheaters={selectedMovieTheaters}
                selectedActors={selectedActors}
            />
        </>
    )
}