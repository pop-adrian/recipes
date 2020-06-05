import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private ingredientsService:  IngredientsService) { }

  createDescription(length) : string{
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  getRecipes(): Recipe[]{
    const numberOfRecipes = 10;
    const numberOfIngredients = 3;
    const numberOfDescriptionCharacters = 20;
    const recipeNames = ['bread','pancakes','pizza','apple pie','creme brulee'];
    const recipeNamesIndexes = new Array(recipeNames.length);
    let recipes : Recipe[] = new Array();
    for(var i = 0; i < recipeNames.length; i++){
      recipeNamesIndexes[i] = 0;
    }
    const ingredients: Array<Ingredient> = this.ingredientsService.getIngredients();
    for(var j = 0; j < numberOfRecipes; j++){
      const recipeIngredients: RecipeIngredient[] = new Array();
      const previousIndexes = new Array();
    for (var i = 0 ; i <numberOfIngredients ;i++){
      var index=Math.floor(Math.random() * ingredients.length)
      var quantity = Math.random() + 2;
      if(!previousIndexes.includes(index)){
        var ing : Ingredient = ingredients[index];
        let recipeIngredient : RecipeIngredient = {id:j*numberOfIngredients+i+1 , ingredient : ing, quantity: quantity};
        recipeIngredients.push(recipeIngredient);
        previousIndexes.push(index);
      }
    }
    var index = Math.floor(Math.random()*recipeNames.length);
    if(recipeNamesIndexes[index]==0){
      let recipe : Recipe = {id: j+1, name: recipeNames[index], description: this.createDescription(numberOfDescriptionCharacters), ingredients: recipeIngredients};
      recipeNamesIndexes[index]++;
      recipes.push(recipe);
    }
    else{
      let recipe : Recipe = {id: j+1, name: recipeNames[index]+'_'+recipeNamesIndexes[index], description: this.createDescription(numberOfDescriptionCharacters), ingredients: recipeIngredients};
      recipeNamesIndexes[index]++;
      recipes.push(recipe);
    }
  }
    return recipes;
  }
}
