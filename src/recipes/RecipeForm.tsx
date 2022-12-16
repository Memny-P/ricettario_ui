import { Form, Formik, FormikHelpers } from "formik";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import ImageField from "../forms/ImageField";
import StepsField from "../forms/StepsField";
import TextField from "../forms/TextField";
import TypeAheadRecipeIngredients from "../forms/TypeAheadRecipeIngredients";
import Button from "../utilis/Button";
import Difficulty from "../utilis/Difficulty";
import { recipeCreationDTO, recipeIngredientDTO } from "./recipe.models";

export default function RecipeForm(props: recipeFormDTO) {

    const [recipeIngredients, setRecipeIngredients] = useState<recipeIngredientDTO[]>([])   // TODO import useFormik..
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
                        listUI={(recipeIngredient: recipeIngredientDTO, deleteButton: ReactElement) =>
                            <div style={{ display: 'flex' }}>
                                <div className="col">{recipeIngredient.ingredient.name}</div>
                                <div className="col">
                                    <input placeholder="Quantity"
                                        type="number"
                                        value={recipeIngredient.quantity}
                                        onChange={e => {
                                            const index = recipeIngredients
                                                .findIndex(x => x.ingredient.id == recipeIngredient.ingredient.id);

                                            const _recipeIngredients = [...recipeIngredients];
                                            _recipeIngredients[index].quantity = Number.parseFloat(e.currentTarget.value);
                                            setRecipeIngredients(_recipeIngredients);
                                        }}
                                    /></div>
                                <div className="col">{recipeIngredient.measurement.name}</div>
                                <div className="col">{deleteButton}</div>
                            </div>
                        }
                    />
                    <StepsField
                        field="steps"
                        displayName="Steps"
                        steps={props.model.recipeSteps}
                    />
                    <ImageField
                        field="picture"
                        displayName="Picture"
                        imageURL={props.model.pictureUrl}
                    />
                    <Button type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/ingredients">Cancel</Link>
                </Form>
            )}
        </Formik>
    )

}

interface recipeFormDTO {
    model: recipeCreationDTO;
    // voglio poter modificar il comportamento dal parent component
    onSubmit(values: recipeCreationDTO, action: FormikHelpers<recipeCreationDTO>): void;
}