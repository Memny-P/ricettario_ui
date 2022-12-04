import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actorDTO, actorMovieDTO } from "../actors/actors.model";
import { urlMovies } from "../endpoints";
import { genreDTO } from "../genres/genres.module";
import { movieTheatersDTO } from "../movietheaters/movieTheater.model";
import DisplayErrors from "../utilis/DisplayErrors";
import { convertMovieToFormData } from "../utilis/formDataUtils";
import Loading from "../utilis/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model";

export default function CreateMovie() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] =
        useState<movieTheatersDTO[]>([]);

    const [selectedGenres, setSelectedGenres] = useState<genreDTO[]>([]);
    const [selectedMovieTheaters, setSelectedMovieTheaters] =
        useState<movieTheatersDTO[]>([]);

    const [selectedActors, setSelectedActors] = useState<actorMovieDTO[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // load info fromdb
        axios.get(`${urlMovies}/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);
                setLoading(false);
            })
    }, [])

    async function create(movie: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: 'post',
                url: urlMovies,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            navigate(`/movies/${response.data}`);    // dovrebbe essere id
        } catch (error) {
            if (error && error.response)
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors(['An error has occurred']);
                }
        }
    }
    return (
        <>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <MovieForm
                    model={{ title: '', inTheaters: false, trailer: '' }}
                    onSumbit={async values => await create(values)}
                    selectedGenres={selectedGenres}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedMovieTheaters={selectedMovieTheaters}
                    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                    selectedActors={selectedActors}
                />
            }
        </>
    )
}