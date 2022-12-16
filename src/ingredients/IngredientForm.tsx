import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { urlIngredientsbase } from "../endpoints";
import ImageField from "../forms/ImageField";
import MeasurementField from "../forms/MeasurementField";
import TextField from "../forms/TextField";
import TypeAheadIngredientsBase from "../forms/TypeAheadIngredientsBase";
import Button from "../utilis/Button";
import { ingredientBaseDTO, ingredientCreationDTO, ingredientEditDTO } from "./ingredient.model";

export default function IngredientForm(props: ingredientFormProps) {

    // const [idIngredientBase, setIngredientBase] = useState<number>(props.model.ingredientBaseId);

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, action) => {
                //  values.ingredientBaseId = idIngredientBase;
                console.log(values);
                props.onSubmit(values, action)
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('This field is required.')
                    .max(75, 'Max length is 75 characters.'),
                idIngredientBase: Yup.number().min(1, () => {
                    Swal.fire({
                        title: 'Error',
                        text: 'You need to choose a Generic ingredient',
                        icon: 'error'
                    });
                })
            })}>
            {(formikProps) => (
                <Form>
                    <TextField field="name" displayName="Name" />
                    <TypeAheadIngredientsBase
                        field="ingredientBaseId"
                        displayName="Generic ingredient"
                        defaultvalue={props.initialIngredient ?
                            [props.initialIngredient.ingredientBase] : []}
                    // onSelect={idIngredientBaseSelected => setIngredientBase(idIngredientBaseSelected)}
                    />
                    <MeasurementField
                        field="measurementId"
                        displayName="Choose default measurement"
                    />
                    <ImageField
                        field="picture"
                        displayName="Picture"
                        imageURL={props.model.pictureUrl}
                    />
                    {/* <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button> */}
                    <Button type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/ingredients">Cancel</Link>
                </Form>
            )}
        </Formik>
    )

}

interface ingredientFormProps {
    model: ingredientCreationDTO;
    initialIngredient?: ingredientEditDTO;
    // voglio poter modificar il comportamento dal parent component
    onSubmit(values: ingredientCreationDTO, action: FormikHelpers<ingredientCreationDTO>): void;
}