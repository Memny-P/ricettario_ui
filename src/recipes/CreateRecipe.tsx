import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlRecipe } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import { ErrorsAxiosHandler } from "../utilis/ErrorsHandler";
import { recipeCreationDTO } from "./recipe.models";
import RecipeForm from "./RecipeForm";

export default function CreateRecipe() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([])

    async function create(recipe: recipeCreationDTO) {
        // mando la richiesta post e poi ridireziono?
        try {
            await axios.post(urlRecipe, recipe);
            navigate('/recipes');
        }
        catch (error) {
            setErrors(ErrorsAxiosHandler(error))
        }
    }

    return (
        <>
            <h3>Create Recipe</h3>
            <DisplayErrors errors={errors} />
            <RecipeForm model={{ title: "", difficulty: 0, servings: 0, recipeSteps: [], recipeIngredients: [], pictureUrl: "" }}
                onSubmit={async value => {
                    create(value);
                }} />
        </>
    )
}