import { ingredientDTO } from "../ingredients/ingredient.model";
import { stepDTO } from "../steps/step.model";

export interface recipeDTO {
    // .. TODO
    title: string;
    difficulty: number;
    servings: number;
    recipeIngredients: recipeIngredientDTO[];
    recipeSteps: recipeStepDTO[];
<<<<<<< HEAD
=======
    pictureUrl: string;
>>>>>>> 70adf8f959984b79f2bc50d9f5a9988a605d0d42
}
export interface recipeIngredientDTO {
    ingredient: ingredientDTO;
    measurement: string;
    quantity: number;
}
export interface recipeStepDTO {
<<<<<<< HEAD
 step:stepDTO;
=======
    step: stepDTO;
}
// TODO valutare se mettere un creationDTO
export interface recipeCreationDTO {
    title: string;
    difficulty: number;
    servings: number;
    recipeIngredients: recipeIngredientDTO[];
    recipeSteps: recipeStepDTO[];
    pictureUrl: string;
>>>>>>> 70adf8f959984b79f2bc50d9f5a9988a605d0d42
}