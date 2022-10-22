import { genreDTO } from "../genres/genres.module";
import { movieTheatersDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function CreateMovie() {
    // è sempre vuoto in caso di creazione il selected
    const nonSelectedGenres: genreDTO[] = [{ id: 1, name: 'Comedy' }, { id: 2, name: 'Drama' }];

    const selectedMovieTheaters: movieTheatersDTO[] = [];
    const nonSelectedMovieTheaters: movieTheatersDTO[] =
        [{ id: 1, name: 'Sabil' }, { id: 2, name: 'Arcadia' }];
    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm
                model={{ title: '', inTheaters: false, trailer: '' }}
                onSumbit={values => console.log(values)}
                selectedGenres={[]}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheaters={selectedMovieTheaters}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedActors={[]}
            />
        </>
    )
}