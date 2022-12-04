import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlMovieTheaters } from "../endpoints";
import { movieCreationDTO } from "../movies/movies.model";
import DisplayErrors from "../utilis/DisplayErrors";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function CreateMovieTheaters() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(movieTheater: movieTheaterCreationDTO) {
        try {
            await axios.post(urlMovieTheaters, movieTheater);
            navigate('/movietheaters')
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
            <h3>Create MovieTheaters</h3>
            <DisplayErrors errors={errors} />
            <MovieTheaterForm
                model={{ name: '' }}
                onSubmit={async values => await create(values)} />
        </>
    )
}