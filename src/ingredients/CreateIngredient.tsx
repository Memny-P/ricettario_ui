import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlIngredients } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import { ErrorsAxiosHandler } from "../utilis/ErrorsHandler";
import { ingredientCreationDTO } from "./ingredient.model";
import IngredientForm from "./IngredientForm";

export default function CreateIngredient() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([])

    async function create(ingredient: ingredientCreationDTO) {
        // mando la richiesta post e poi ridireziono?
        try {
            await axios.post(urlIngredients, ingredient);
            navigate('/ingredients');
        }
        catch (error) {
            setErrors(ErrorsAxiosHandler(error))
        }
    }
    return (
        <>
            <h3>Create Ingredient</h3>
            <DisplayErrors errors={errors} />
            <IngredientForm model={{ name: "", ingredientBaseId: -1, pictureUrl: "" }}
                onSubmit={async value => {
                    create(value);
                }} />
        </>
    )
}