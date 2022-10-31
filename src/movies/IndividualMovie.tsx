import { movieDTO } from "./movies.model";
import css from './IndividualMovie.module.css'
import { Link } from "react-router-dom";
import customConfirm from "../utilis/customConfirm";
import Button from "../utilis/Button";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utilis/AlertContext";
import Authorized from "../auth/Authorized";

// uso interface per passare un oggetto movie
export default function IndividualMovie(props: movieDTO) {

    // link to movie
    const buildLink = () => `/movies/${props.id}`;
    const customAlert = useContext(AlertContext);

    function deleteMovie() {
        axios.delete(`${urlMovies}/${props.id}`)
            .then(() => {
                // uso context per far comunicare componenti a qualsiasi profoondità
                customAlert();
            });
    }
    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img alt="Poster" src={props.poster} />
            </Link>
            <p>
                <Link to={buildLink()}>
                    {props.title}
                </Link>
            </p>
            <Authorized
                role='admin'
                authorized={<>
                    <div>
                        <Link style={{ marginRight: '1rem' }}
                            className="btn btn-info"
                            to={`/movies/edit/${props.id}`}>
                            Edit
                        </Link>
                        <Button
                            onClick={() => customConfirm(() => deleteMovie())}
                        >
                            Delete</Button>
                    </div>
                </>}
            />
        </div >
    )
}