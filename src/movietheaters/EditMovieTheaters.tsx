import { ReactElement, JSXElementConstructor } from "react";
import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import { movieTheaterCreationDTO, movieTheatersDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheaters() {
    return (
        <EditEntity<movieTheaterCreationDTO, movieTheatersDTO>
            url={urlMovieTheaters}
            entityName="Movie Theater"
            indexURL='/movietheaters'
        >
            {(entity, edit) =>
                <MovieTheaterForm
                    model={entity}
                    onSubmit={async values => edit(values)}
                />}
        </EditEntity>
    )
}