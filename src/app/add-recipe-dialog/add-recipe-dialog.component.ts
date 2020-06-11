import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss']
})
export class AddRecipeDialogComponent implements OnInit {
  currentRecipe: Recipe;
  ingredients: Array<Ingredient>;

  constructor(public dialogRef: MatDialogRef<AddRecipeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data,
   private ingredientServ: IngredientsService, private recipeService: RecipesService) {
    this.currentRecipe = data.currentRecipe;
    this.ingredientServ.getIngredients().subscribe(data => { 
      this.ingredients = data;  });
   }

  ngOnInit(): void {

  }
  saveNewRecipe(){
    this.recipeService.saveNewRecipe(this.currentRecipe);
  }

}
