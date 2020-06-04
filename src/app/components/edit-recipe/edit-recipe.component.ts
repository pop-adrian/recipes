import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientsService } from '../../services/ingredients.service'; 
import {MatSelectModule} from '@angular/material/select';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  currentRecipe: Recipe;
  ingredients: Array<Ingredient>;
  currentIngredient: RecipeIngredient;

  constructor(private ingredientServ: IngredientsService) { }

  ngOnInit() {
    this.ingredients=this.ingredientServ.getIngredients();
    
    this.currentRecipe={
        id: 1,
        name: 'recipe',
        description: 'descriprion',
        ingredients: [{
          id: 1,
          ingredient:this.ingredients[0],
          quantity: 4 } , 
          {
          id: 2,
          ingredient:this.ingredients[1],
          quantity: 2      
        }  ]
      }
    this.currentIngredient = {
        id: this.getNewRecipeIngredientId(),
        ingredient:this.ingredients[1],
        quantity: 0      
      }  
  }

  removeIngredient(recipeIngredient){  
    this.currentRecipe.ingredients = this.currentRecipe.ingredients.filter(ingredient=>{
      return ingredient.ingredient.id!=recipeIngredient.id;
    })  
  }

  getNewRecipeIngredientId(){
    if (this.currentRecipe.ingredients.length==0){
      return 1;
    }
    var lastIngredient=this.currentRecipe.ingredients.reduce((accum, ingr2)=>{
      if (accum.id<ingr2.id) 
        accum=ingr2;
      return accum;  
    });
    return lastIngredient.id+1;
  }
  addIngredient(){   
    var noMatches=this.currentRecipe.ingredients.filter(recipeIngredient=>{     
      return recipeIngredient.ingredient.id==this.currentIngredient.ingredient.id}).length;
    if (noMatches>0){          
      alert("Recipe already contains this ingredient !");
      return;
    } 
    if (this.currentIngredient.quantity<=0){
      alert("Quantity is not valid!");
      return;
    }  
    this.currentRecipe.ingredients.push(this.currentIngredient);
    this.currentIngredient = {
      id: this.getNewRecipeIngredientId(),
      ingredient:this.ingredients[1],
      quantity: 0      
    }  
    console.log(this.currentRecipe)
  }

}
