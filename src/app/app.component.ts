import { Component } from '@angular/core';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'My Recipies';
  

  selectedRecipe: Recipe ;
 

  recipeChanged($event){
    this.selectedRecipe = $event;
  }
}
