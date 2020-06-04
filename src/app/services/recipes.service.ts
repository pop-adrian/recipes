import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private ingredientsService :  IngredientsService) { }

  getRecipes()  : Recipe[]{
    let ingredients : Array<Ingredient> = this.ingredientsService.getIngredients();
    let recipeIngredients : RecipeIngredient[] = new Array();
    let currentIndex=-1;
    for (var i = 0 ; i <3 ;i++){
      var index=Math.floor(Math.random() * ingredients.length)
      if(currentIndex!=index){
        var ing : Ingredient = ingredients[index];
        let recipeIngredient : RecipeIngredient = {id:1 , ingredient : ing, quantity: 2};
        recipeIngredients.push(recipeIngredient);
        currentIndex=index;
        console.log(recipeIngredient);
      }
    }
    let r1 : Recipe = {id: 1, name: 'bread', description: 'abc', ingredients: recipeIngredients};
    let r2 : Recipe = {id: 2, name: 'pancakes', description: 'bcd', ingredients: recipeIngredients};
    let r3 : Recipe = {id: 3, name: 'pizza', description: 'cde', ingredients: recipeIngredients};
    let recipes : Recipe[] = [r1,r2,r3];
    return recipes;
  }
}
