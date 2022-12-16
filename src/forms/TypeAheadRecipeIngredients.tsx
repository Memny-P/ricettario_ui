import axios, { AxiosResponse } from "axios";
import { ReactElement, useRef, useState } from "react";
import { AsyncTypeahead, ClearButton } from "react-bootstrap-typeahead";
import { urlRecipes } from "../endpoints";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Spinner } from "react-bootstrap";
import './TypeAhead.css';
import { recipeIngredientDTO } from "../recipes/recipe.models";

export default function TypeAheadRecipeIngredients(props: typeAheadProps) {
    // elementi tra cui cercare
    const [recipeIngredientsDB, setRecipeIngredientsDB] = useState<recipeIngredientDTO[]>([]);
    const [ingredientsIdsSelected, setIngredientsIdsSelected] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const typeaheadRef = useRef<any>(null);

    function handleSearch(query: string) {
        setIsLoading(true);

        axios.get(`${urlRecipes}/recipeIngredients/searchByName/${query}`)
            .then((response: AxiosResponse<recipeIngredientDTO[]>) => {
                setRecipeIngredientsDB(response.data);
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
                        let ingredientChosen = options[0] as recipeIngredientDTO;

                        let IsIngredientAlreadySelected = props.recipeIngredients
                            .findIndex(x => x.ingredient === ingredientChosen.ingredient) === -1;
                        if (IsIngredientAlreadySelected) {
                            props.onAdd([...props.recipeIngredients, ingredientChosen]);
                            setIngredientsIdsSelected([...ingredientsIdsSelected, ingredientChosen.ingredient.id]);
                            typeaheadRef.current.clear()
                        }
                    }
                }}
                options={recipeIngredientsDB}
                labelKey={option => (option as recipeIngredientDTO).ingredient.name}
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
                            <span>{(ingredient as recipeIngredientDTO).ingredient.name}</span>
                        </>
                    )
                }
                ref={typeaheadRef}
            >
                {({ onClear, selected }) => (
                    <div className="rbt-aux">
                        {!!selected.length &&
                            <ClearButton title="clear input"
                                onClick={onClear}
                                style={{ color: 'red' }}
                            />}
                        {!ingredientsIdsSelected.length && <Spinner animation="grow" size="sm" />}
                    </div>
                )}
            </AsyncTypeahead>
            <ul className="list-group">
                {props.recipeIngredients.map(recipeIngredient =>
                    <li key={recipeIngredient.ingredient.id}
                        className="list-group-item list-group-item-action"
                    >
                        {props.listUI(recipeIngredient, <span className="badge badge-primary badge-pill pointer text-dark"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                props.onRemove(recipeIngredient)
                                setIngredientsIdsSelected([...ingredientsIdsSelected.filter(x => x !== recipeIngredient.ingredient.id)]);
                            }}>X</span>)}
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
    listUI(ingredient: recipeIngredientDTO, closeButton: ReactElement): ReactElement;
}