import { ingredientCreationDTO } from "../ingredients/ingredient.model";

export function convertIngredientToFormData(ingredient: ingredientCreationDTO): FormData {
    const formData = new FormData();
    formData.append('name', ingredient.name);
    if (ingredient.ingredientBaseId) formData.append('ingredientBaseId', ingredient.ingredientBaseId.toString())
    if (ingredient.pictureUrl) formData.append('picture', ingredient.pictureUrl);

    return formData;
}