import { RecipeIngredientDTO } from './recipeIngredient.DTO';

export interface RecipeDTO {
    id: number;
    name: string;
    description: string;
    ingredients: RecipeIngredientDTO[];
}