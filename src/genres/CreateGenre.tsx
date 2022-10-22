import axios from "axios";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genres.module";

export default function CreateGenre() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([])

    async function create(genre: genreCreationDTO) {
        // mando la richiesta post e poi ridireziono?
        try {
            await axios.post(urlGenres, genre);
            navigate('/genres');
        }
        catch (error) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }
    return (
        <>
            <h3>Create Genre</h3>
            <DisplayErrors errors={errors} />
            <GenreForm model={{ name: "" }}
                onSubmit={async value => {
                    create(value);
                }} />
        </>
    )
}

{/* <GenreForm model={{ name: "" }}
    onSubmit={async value => {    // (, action)
        // when posted
        await new Promise(r => setTimeout(r, 1)); // fake latency
        console.log(value);
        // action.
    }} /> */}
{/* ESEMPIO: utilizzo del navigate

// const navigate = useNavigate();// v6 usa questo == const history = useHistory();
import { Link } from "react-router-dom";    // , useNavigate
<Button onClick={() => {
    // .. Saving in db
    navigate('/genres');    // history.push('/genres');
}}>Save changes</Button> */}