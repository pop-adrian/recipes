import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { ComponentRef, ComponentFactory} from '@angular/core'; 
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { RecipeIngredient } from './models/recipe-ingredient.model';
import { Observable, Subject } from 'rxjs';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'My Recipies';
  selectedRecipe: Recipe ;
  showTheRecipe: boolean = true;
  dialogRef : MatDialogRef<EditRecipeComponent>;
  @Input() editRecipe: Recipe;
  @Input() showRecipe: Recipe;
  @Output() addedRecipe = new EventEmitter<Recipe>();

  constructor(private dialog: MatDialog, private recipeService : RecipesService){
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

  addNewRecipe($event){

    console.log("a intrat in added recipe, iar recipe este");
    this.addedRecipe=$event;

    console.log(this.addedRecipe);
  }

  recipeChanged($event){
    this.selectedRecipe = $event;
  }

  openAddRecipeDialog(){
    this.dialogRef = this.dialog.open(EditRecipeComponent, {
      data :{
        currentRecipe: {
          id: 0,
          name: "",
          description: "",
          ingredients: new Array<RecipeIngredient>()
      },
        addedRecipe : new Subject<Recipe>().subscribe(r => 
          { this.recipeService.subject.next(r);})
    },
      height: '600px',
      width: '600px',
  });
  }
}
