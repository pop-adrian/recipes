import { Component, Input, Output } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { ComponentRef, ComponentFactory} from '@angular/core'; 
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

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

  constructor(){
  }

  showEditComponent($event){
    this.showTheRecipe=false;
    this.selectedRecipe=$event;
    console.log($event);
  }

  showMyRecipe($event){
    this.showTheRecipe=true;
    this.selectedRecipe=$event;
    // console.log(this.selectedRecipe);
  }

  recipeChanged($event){
    this.selectedRecipe = $event;
  }
}
