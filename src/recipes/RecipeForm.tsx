import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { number } from "yup/lib/locale";
import ImageField from "../forms/ImageField";
import TextField from "../forms/TextField";
import TypeAheadRecipeIngredients from "../forms/TypeAheadRecipeIngredients";
import Button from "../utilis/Button";
import Difficulty from "../utilis/Difficulty";
import { recipeCreationDTO, recipeDTO, recipeIngredientDTO } from "./recipe.models";

export default function RecipeForm(props: recipeFormDTO) {

    const [recipeIngredients, setRecipeIngredients] = useState<recipeIngredientDTO[]>([])
    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, action) => {
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
                        selectedValue={props.model.difficulty}
                    />

                    <TypeAheadRecipeIngredients
                        displayName="Recipe ingredients"
                        defaultvalues={props.model.recipeIngredients ?
                            props.model.recipeIngredients : []}
                        recipeIngredients={recipeIngredients}
                        onAdd={recipeIngredients => { setRecipeIngredients(recipeIngredients); }}
                        onRemove={recipeIngredient => {
                            const recipeIngredientsFiltered = recipeIngredients.filter(x => x !== recipeIngredient);
                            setRecipeIngredients(recipeIngredientsFiltered);
                        }}
                        listUI={(recipeIngredient: recipeIngredientDTO) =>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>{recipeIngredient.ingredient.name}</td>
                                        <td>
                                            <input placeholder="Quntity"
                                                type="number"
                                                value={recipeIngredient.quantity}
                                                onChange={e => {
                                                    const index = recipeIngredients
                                                        .findIndex(x => x.ingredient.id == recipeIngredient.ingredient.id);

                                                    const _recipeIngredients = [...recipeIngredients];
                                                    _recipeIngredients[index].quantity = Number.parseFloat(e.currentTarget.value);
                                                    setRecipeIngredients(_recipeIngredients);
                                                }}
                                            /></td>
                                        <td>{recipeIngredient.measurement}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    />

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
    model: recipeDTO;
    // voglio poter modificar il comportamento dal parent component
    onSubmit(values: recipeCreationDTO, action: FormikHelpers<recipeCreationDTO>): void;
}