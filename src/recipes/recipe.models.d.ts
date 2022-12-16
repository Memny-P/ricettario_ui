import { ingredientDTO } from "../ingredients/ingredient.model";
import { measurementDTO } from "../measurements/measurement.model";
import { stepDTO, stepRecipeCreationDTO } from "../steps/step.model";

export interface recipeDTO {
    // .. TODO
    title: string;
    difficulty: number;
    servings: number;
    recipeIngredients: recipeIngredientDTO[];
    recipeSteps: recipeStepDTO[];
    pictureUrl: string;
}
export interface recipeIngredientDTO {
    ingredient: ingredientDTO;
    measurement: measurementDTO;
    quantity: number;
}

// TODO valutare se mettere un creationDTO
export interface recipeCreationDTO {
    title: string;
    difficulty: number;
    servings: number;
    recipeIngredients: recipeIngredientDTO[];
    recipeSteps: stepRecipeCreationDTO[];
    pictureUrl: string;
}