import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientsService } from '../../services/ingredients.service'; 
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { RecipesService } from 'src/app/services/recipes.service';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  
  @Input() currentRecipe: Recipe;
  @Output() showRecipe = new EventEmitter<Recipe>();
  ingredients: Array<Ingredient>;
  currentIngredient: RecipeIngredient;

  constructor(private ingredientServ: IngredientsService, private recipeService : RecipesService) { }

  ngOnInit() {
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
    debugger;
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
      ingredientId: this.ingredients[1].id,
      quantity: 0      
    }  
    console.log(this.currentRecipe)
  }
  onChangedRecipe(someRecipe : Recipe){
    this.currentRecipe = someRecipe;
  }
  closeEditRecipe(){
    this.showRecipe.emit(this.currentRecipe);
    console.log("sendCloseShowRecipe");
  }

  updateRecipe(){
    this.recipeService.updateRecipe(this.currentRecipe);
  }

}
