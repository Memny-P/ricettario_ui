import axios, { AxiosResponse } from "axios";
import { ErrorMessage, Field, FieldArray } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { AsyncTypeahead, ClearButton } from "react-bootstrap-typeahead";
import { urlIngredients, urlIngredientsbase, urlRecipe } from "../endpoints";
import { ingredientBaseDTO, ingredientDTO } from "../ingredients/ingredient.model";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Spinner } from "react-bootstrap";
import './TypeAhead.css';
import { recipeIngredientDTO } from "../recipes/recipe.models";

export default function TypeAheadRecipeIngredients(props: typeAheadProps) {
    // elementi tra cui cercare
    const [ingredientsDB, setIngredientsDB] = useState<ingredientDTO[]>([]);
    const [ingredientsIdsSelected, setIngredientsIdsSelected] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSearch(query: string) {
        setIsLoading(true);

        axios.get(`${urlRecipe}/searchByName/${query}}`)
            .then((response: AxiosResponse<ingredientDTO[]>) => {
                setIngredientsDB(response.data);
                setIsLoading(false);
            });
    }

    return (
        <div className="mb-3">
            <label htmlFor="typeahead">{props.displayName}</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={(options) => {
                    if (options && options.length > 0) {
                        let ingredientChosen = options[0] as ingredientDTO;

                        let IsIngredientAlreadySelected = props.recipeIngredients
                            .findIndex(x => x.ingredient.id === ingredientChosen.id) === -1;
                        if (IsIngredientAlreadySelected) {
                            let recipeIngredient = {
                                ingredient: ingredientChosen,
                                measurement: 'TODO recuperare starter',
                                quantity: 0
                            }

                            props.onAdd([...props.recipeIngredients, recipeIngredient]);
                            setIngredientsIdsSelected([...ingredientsIdsSelected, ingredientChosen.id]);
                        }
                    }
                }}
                options={ingredientsDB}
                labelKey="name"
                filterBy={() => true}   // comunico che il filtro è già applicato a livello della webapi
                isLoading={isLoading}
                onSearch={handleSearch} // consume API
                placeholder="Search ingredient..."
                minLength={1}
                flip={true}
                defaultSelected={props.defaultvalues}
                renderMenuItemChildren={
                    ingredient => (
                        <>
                            <span>{(ingredient as ingredientDTO).name}</span>
                        </>
                    )
                }
            >
                {({ onClear, selected }) => (
                    <div className="rbt-aux">
                        {!!selected.length &&
                            <ClearButton title="clear input"
                                onClick={onClear}
                                style={{ color: 'red' }}
                            />}
                        {/* {!selected.length && <Spinner animation="grow" size="sm" />} */}
                    </div>
                )}
            </AsyncTypeahead>
            <ul className="list-group">
                {props.recipeIngredients.map(recipeIngredient =>
                    <li key={recipeIngredient.ingredient.id}
                        className="list-group-item list-group-item-action"
                    >
                        {props.listUI(recipeIngredient)}
                        <span className="badge badge-primary badge-pill pointer text-dark"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => props.onRemove(recipeIngredient)}>X</span>
                    </li>)}
            </ul>
        </div>
    )
}

interface typeAheadProps {
    displayName: string;
    recipeIngredients: recipeIngredientDTO[];
    defaultvalues: recipeIngredientDTO[];
    // To parent
    onAdd(ingredients: recipeIngredientDTO[]): void;
    onRemove(ingredient: recipeIngredientDTO): void;
    listUI(ingredient: recipeIngredientDTO): ReactElement;
}