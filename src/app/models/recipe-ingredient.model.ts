import { Ingredient } from './ingredient.model';

export interface RecipeIngredient {
    id: number;
    ingredient: Ingredient;
    quantity: number;
}