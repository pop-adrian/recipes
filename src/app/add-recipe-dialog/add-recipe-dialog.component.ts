import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';
import { RecipesService } from '../services/recipes.service';
import { RecipeIngredient } from '../models/recipe-ingredient.model';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss']
})
export class AddRecipeDialogComponent implements OnInit {
  currentRecipe: Recipe;
  ingredients: Array<Ingredient>;
  currentIngredient: RecipeIngredient;

  constructor(public dialogRef: MatDialogRef<AddRecipeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data,
   private ingredientServ: IngredientsService, private recipeService: RecipesService) {
    this.currentRecipe = data.currentRecipe;
    this.ingredientServ.getIngredients().subscribe(data => { 
      this.ingredients = data;  });
   }

  ngOnInit(): void {
    this.currentIngredient = {
      id: 1,
      ingredientId: 1,
      ingredient:null,
      quantity: 0,
  }
      this.ingredientServ.getIngredients().subscribe(data => { 
        this.ingredients = data;  
          this.currentIngredient = {
          id: this.getNewRecipeIngredientId(),
          ingredientId: this.ingredients[0].id,
          ingredient:this.ingredients[0],
          quantity: 0,
      };}); 

  }
  saveNewRecipe(){
    this.recipeService.saveNewRecipe(this.currentRecipe);
  }

  
  removeIngredient(recipeIngredient){  
    this.currentRecipe.ingredients = this.currentRecipe.ingredients.filter(ingredient=>{
      return ingredient.ingredient.id!=recipeIngredient.id;
    })  
  }

  getNewRecipeIngredientId(){
    if (!this.currentRecipe || !this.currentRecipe.ingredients || this.currentRecipe.ingredients.length==0){
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
    this.currentIngredient.quantity = <number>this.currentIngredient.quantity;
    console.log("aici1");
    console.log(typeof this.currentIngredient.quantity);
    console.log("aici2");
    this.currentRecipe.ingredients.push(this.currentIngredient);
    this.currentIngredient = {
      id: this.getNewRecipeIngredientId(),
      ingredient:this.ingredients[1],
      ingredientId: this.ingredients[1].id,
      quantity: 0      
    }  
    console.log(this.currentRecipe)
  }

  

}
