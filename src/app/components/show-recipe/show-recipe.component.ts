import { Component, OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {

  @Input() recipe : Recipe;
  @Output() editRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  changeToEditMode(){
    this.editRecipe.emit(this.recipe);
    console.log("edit recipe fired");
   
  }
  
}
