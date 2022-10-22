import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utilis/Button";
import { genreCreationDTO } from "./genres.module";

export default function GenreForm(props: genreFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('This field is required.')
                    .max(50, 'Max length is 50 characters.')
                    .firstLetterUppercase(),

            })}>
            {(formikProps) => (
                <Form>
                    <TextField field="name" displayName="Name" />

                    <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface genreFormProps {
    model: genreCreationDTO;
    // voglio poter modificar il comportamento dal parent component
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void;
}