import axios, { AxiosResponse } from "axios";
import { ErrorMessage, Field, FieldArray } from "formik";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { urlIngredientsbase } from "../endpoints";
import { ingredientBaseDTO } from "../ingredients/ingredient.model";

export default function TypeAheadIngredientsBase(props: typeAheadProps) {
    // elementi tra cui cercare
    const [ingredientsBaseDB, setIngredientsBaseDB] = useState<ingredientBaseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSearch(query: string) {
        setIsLoading(true);

        axios.get(`${urlIngredientsbase}/searchByName/${query}`)
            .then((response: AxiosResponse<ingredientBaseDTO[]>) => {
                setIngredientsBaseDB(response.data);
                setIsLoading(false);
            });
    };

    return (
        <div className="mb-3">
            <label htmlFor="typeahead">{props.displayName}</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={(options) => {
                    if (options && options.length > 0) {
                        let ingredient = options[0] as ingredientBaseDTO;
                        props.onSelect(ingredient.id);
                    }
                }}
                options={ingredientsBaseDB}
                labelKey="name"
                filterBy={() => true}   // comunico che il filtro è già applicato a livello della webapi
                isLoading={isLoading}
                onSearch={handleSearch} // consume API
                placeholder="Search generic ingredient..."
                minLength={1}
                flip={true}
                renderMenuItemChildren={
                    ingredient => (
                        <>
                            <span >{(ingredient as ingredientBaseDTO).name}</span>
                        </>
                    )
                }
            />
        </div>
    )
}

interface typeAheadProps {
    displayName: string;
    idIngredientBase?: number;
    // To parent
    onSelect(ingredientBaseId: number): void;
}