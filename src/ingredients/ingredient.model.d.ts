export interface ingredientCreationDTO {
    name: string;
    ingredientBaseId: number;
    pictureUrl: string;
}

export interface ingredientDTO {
    id: number;
    name: string;
    idIngredientBase: number;
}

export interface ingredientBaseDTO {
    id: number;
    name: string;
}