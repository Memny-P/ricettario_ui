import { Link } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { movieTheaterCreationDTO } from "./movieTheater.model";
import coordinateDTO from "../utilis/coordinates.model";
import Button from "../utilis/Button";
import TextField from "../forms/TextField";
import MapField from "../forms/MapField";   // import Map from "../utilis/Map";

export default function MovieTheaterForm(props: movieTheaterFormProps) {

    function transformCoordinates(): coordinateDTO[] | undefined   // tipo che ritorna
    {
        if (props.model.latitude && props.model.longitude) {
            const response: coordinateDTO = { lat: props.model.latitude, lng: props.model.longitude };
            return [response];
        }
        return undefined;
    }

    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object({
                    name: Yup.string()
                        .required('This field is required.')
                        .firstLetterUppercase(),
                })
            }>
            {formikProps => (
                <Form>
                    <TextField displayName="Name" field="name" />
                    <div style={{ marginBottom: '1rem' }}>
                        <MapField latField="latitude" lngField="longitude"
                            coordinates={transformCoordinates()} />
                    </div>
                    <Button disabled={formikProps.isSubmitting}
                        type="submit"
                    >Save changes</Button>
                    <Link to="/movietheaters" className="btn btn-secondary">Cancel</Link>


                    {/* <DateField displayName="Date of Birth" field="dateOfBirth" />
                    <ImageField displayName="Picture" field="picture"
                        imageURL={props.model.pictureURL} />
                    <MarkdownField displayName="Biography" field="biography" /> */}
                </Form>
            )}
        </Formik>
    )
}

interface movieTheaterFormProps {
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO, actions: FormikHelpers<movieTheaterCreationDTO>): void;
}


