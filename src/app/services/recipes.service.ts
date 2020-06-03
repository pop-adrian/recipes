import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  getRecipes()  : Recipe[]{
    let ing : Ingredient = {id: 1, name: 'flour'};
    let recipeIngredient : RecipeIngredient = {id:1 , ingredient : ing, quantity: 2};
    let recipeIngredients : RecipeIngredient[] = [recipeIngredient];
    let r1 : Recipe = {id: 1, name: 'bread', description: 'abc', ingredients: recipeIngredients};
    let r2 : Recipe = {id: 2, name: 'pancakes', description: 'bcd', ingredients: recipeIngredients};
    let r3 : Recipe = {id: 3, name: 'pizza', description: 'cde', ingredients: recipeIngredients};
    let recipes : Recipe[] = [r1,r2,r3];
    return recipes;
  }
}
