import { measurementDTO } from "../measurements/measurement.model";

export interface ingredientCreationDTO {
    name: string;
    ingredientBaseId: number;
    measurementId: number;
    pictureUrl: string;
}

export interface ingredientDTO {
    id: number;
    name: string;
    ingredientBaseId: number;
    measurementId: number;
    pictureUrl: string;
}

export interface ingredientEditDTO {
    id: number;
    name: string;
    ingredientBase: ingredientBaseDTO;
    measurement: measurementDTO;
    pictureUrl: string;
}
export interface ingredientBaseDTO {
    id: number;
    name: string; 3
}

export interface ingredientRecipeDTO {
    id: number;
    name: string;
    quantity: number;
    measurementId: string;
}