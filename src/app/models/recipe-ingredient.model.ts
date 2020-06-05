import { Ingredient } from './ingredient.model';

export interface RecipeIngredient {
    id: number;
    ingredientId: number;
    ingredient: Ingredient;
    quantity: number;
}