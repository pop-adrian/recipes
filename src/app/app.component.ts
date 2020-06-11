import { Component, Input, Output } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { ComponentRef, ComponentFactory} from '@angular/core'; 
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { AddRecipeDialogComponent } from './add-recipe-dialog/add-recipe-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { RecipeIngredient } from './models/recipe-ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'My Recipies';
  selectedRecipe: Recipe ;
  showTheRecipe: boolean = true;

  @Input() editRecipe: Recipe;
  @Input() showRecipe: Recipe;

  constructor(private dialog: MatDialog){
  }

  showEditComponent($event){
    this.showTheRecipe=false;
    this.selectedRecipe=$event;
    console.log($event);
  }

  showMyRecipe($event){
    this.showTheRecipe=true;
    this.selectedRecipe=$event;
  }

  recipeChanged($event){
    this.selectedRecipe = $event;
  }
  openAddRecipeDialog(){
    let dialogRef = this.dialog.open(AddRecipeDialogComponent, {
      data :{
        currentRecipe: {
          name: "",
          description: "",
          ingredients: new Array<RecipeIngredient>()
      },
    },
      height: '600px',
      width: '600px',
  });
  }
}
