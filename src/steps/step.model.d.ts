import { number } from "yup";

export interface stepDTO {
    description: string;
    time: number;
}
export interface stepRecipeCreationDTO {
    id: number;
    description: string;
    order: number;
    time: number;
}