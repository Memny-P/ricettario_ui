export interface ingredientCreationDTO {
    name: string;
    ingredientBaseId: number;
    pictureUrl: string;
}

export interface ingredientDTO {
    id: number;
    name: string;
    ingredientBaseId: number;
    pictureUrl: string;
}

export interface ingredientEditDTO {
    id: number;
    name: string;
    ingredientBase: ingredientBaseDTO;
    pictureUrl: string;
}
export interface ingredientBaseDTO {
    id: number;
    name: string;3
}

export interface ingredientRecipeDTO {
    id: number;
    name: string;
    quantity_value: number;
    quantity_type: string;
}