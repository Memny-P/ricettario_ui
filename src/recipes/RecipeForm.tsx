import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { urlIngredientsbase } from "../endpoints";
import ImageField from "../forms/ImageField";
import TextField from "../forms/TextField";
import TypeAheadIngredientsBase from "../forms/TypeAheadIngredientsBase";
import Button from "../utilis/Button";
import Difficulty from "../utilis/Difficulty";
import { ingredientBaseDTO, ingredientCreationDTO, ingredientEditDTO } from "./ingredient.model";

export default function RecipeForm(props: recipeFormDTO) {

    const [idIngredientBase, setIngredientBase] = useState<number>(props.model.ingredientBaseId);

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, action) => {
                values.ingredientBaseId = idIngredientBase;
                props.onSubmit(values, action)
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('This field is required.')
                    .max(75, 'Max length is 75 characters.')
            })}>
            {(formikProps) => (
                <Form>
                    <TextField field="title" displayName="Name" />
                    <Difficulty
                        maximumValue={3}
                        onChange={value => console.log(value)}
                        selectedValue
                    />
                    <TypeAheadIngredients
                        defaultvalue={props.initialIngredient ?
                            [props.initialIngredient.ingredientBase] : []}
                        displayName="Generic ingredient"
                        onSelect={idIngredientBaseSelected => setIngredientBase(idIngredientBaseSelected)}
                    />


                    <table>

                    </table>

                    <ImageField
                        field="picture"
                        displayName="Picture"
                        imageURL={props.model.pictureUrl}
                    />
                    <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/ingredients">Cancel</Link>
                </Form>
            )}
        </Formik>
    )

}

interface recipeFormDTO {
    model: recipeCreationDTO;
    // voglio poter modificar il comportamento dal parent component
    onSubmit(values: ingredientCreationDTO, action: FormikHelpers<ingredientCreationDTO>): void;
}