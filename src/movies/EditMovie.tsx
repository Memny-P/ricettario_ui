import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import { convertMovieToFormData } from "../utilis/formDataUtils";
import Loading from "../utilis/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "./movies.model";

export default function EditMovie() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const { id }: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();

    useEffect(() => {
        axios.get(`${urlMovies}/putget/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
                const model: movieCreationDTO = {
                    title: response.data.movie.title,
                    inTheaters: response.data.movie.inTheaters,
                    trailer: response.data.movie.trailer,
                    posterURL: response.data.movie.poster,
                    summary: response.data.movie.summary,
                    releaseDate: new Date(response.data.movie.releaseDate),
                };

                setMovie(model);
                setMoviePutGet(response.data);
            })
    }, [id])

    async function edit(movieToEdit: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movieToEdit);
            await axios({
                method: 'put',
                url: `${urlMovies}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate(`/movies/${id}`);
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
            <h3>Edit Movie</h3>
            <DisplayErrors errors={errors} />
            {movie && moviePutGet ?
                <MovieForm
                    model={movie}
                    onSumbit={async values => await edit(values)}
                    nonSelectedGenres={moviePutGet.nonSelectedGenres}
                    selectedGenres={moviePutGet.selectedGenres}

                    nonSelectedMovieTheaters={moviePutGet.nonSelectedMovieTheaters}
                    selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
                    selectedActors={moviePutGet.actors}
                /> : <Loading />
            }
        </>
    )
}