import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from "../utilis/Button";
import TextField from "../forms/TextField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import DateField from "../forms/DateField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { genreDTO } from "../genres/genres.module";
import { useState } from "react";
import { movieTheatersDTO } from "../movietheaters/movieTheater.model";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../forms/MarkdownField";

export default function MovieForm(props: movieFormProps) {

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres))

    const [selectedMovieTheaters, setSelectedMovieTheaters] =
        useState(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] =
        useState(mapToModel(props.nonSelectedMovieTheaters))

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: { id: number, name: string }[]): multipleSelectorModel[] {
        return items.map(item => {
            return { key: item.id, value: item.name }
        })
    }
    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, action) => {
                values.genresIds = selectedGenres.map(item => item.key);
                values.movieTheatersIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;
                props.onSumbit(values, action);
            }}
            validationSchema={
                Yup.object({
                    title: Yup.string()
                        .required('This field is required.')
                        .firstLetterUppercase(),

                })
            }
        >
            {(formikProps) => (
                <Form>
                    <TextField field="title" displayName="Title" />
                    <CheckboxField displayName="In Theaters" field="inTheaters" />
                    <TextField field="trailer" displayName="Trailer" />
                    <DateField field="releaseDate" displayName="Realease Date" />
                    <ImageField field="poster" displayName="Poster"
                        imageURL={props.model.posterURL}
                    />

                    <MarkdownField displayName="Summary" field="summary" />

                    <MultipleSelector
                        displayName="Genres"
                        selected={selectedGenres}
                        nonSelected={nonSelectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />

                    <MultipleSelector
                        displayName="Movie Theaters"
                        selected={selectedMovieTheaters}
                        nonSelected={nonSelectedMovieTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelectedMovieTheaters(selected);
                            setNonSelectedMovieTheaters(nonSelected);
                        }}
                    />
                    <TypeAheadActors
                        displayName="Actors"
                        actors={selectedActors}
                        onAdd={actors => { setSelectedActors(actors); }}
                        onRemove={actor => {
                            const actors = selectedActors.filter(x => x !== actor);
                            setSelectedActors(actors);
                        }}
                        listUI={(actor: actorMovieDTO) =>
                            <>
                                {actor.name} / <input placeholder="Character"
                                    type="text"
                                    value={actor.character}
                                    onChange={e => {
                                        const index = selectedActors.findIndex(x => x.id == actor.id);

                                        const actors = [...selectedActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }}
                                />
                            </>
                        }
                    />

                    <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface movieFormProps {
    model: movieCreationDTO;
    onSumbit(values: movieCreationDTO, action: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheatersDTO[];
    nonSelectedMovieTheaters: movieTheatersDTO[];
    selectedActors: actorMovieDTO[];
}