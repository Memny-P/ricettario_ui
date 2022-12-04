import { ingredientDTO } from "../ingredients/ingredient.model";
import { stepDTO } from "../steps/step.model";

export interface recipeDTO {
    // .. TODO
    title: string;
    difficulty: number;
    servings: number;
    recipeIngredients: recipeIngredientDTO[];
    recipeSteps: recipeStepDTO[];
}
export interface recipeIngredientDTO {
    ingredient: ingredientDTO;
    measurement: string;
    quantity: number;
}
export interface recipeStepDTO {
 step:stepDTO;
}