import { RecipeDTO } from "../dtos/recipe.DTO";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../ingredient.model";
import { RecipeIngredient } from '../recipe-ingredient.model';


export class Converter{

    static convert(recipe: RecipeDTO, ingredients: Ingredient[]) : Recipe{
        var currentRecipe : Recipe = {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients.map(ingred=> {
                return <RecipeIngredient> {
                id: ingred.id,
                ingredientId: ingred.ingredientId,
                quantity: ingred.quantity,
                ingredient: ingredients.find(ingredient => {return ingredient.id===ingred.ingredientId})
            }}),
        }
        return currentRecipe;
}

}