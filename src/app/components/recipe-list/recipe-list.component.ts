import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import {MatSelectionList, MatListOption} from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {

  constructor(private service : RecipesService) { }
  
  recipes : Recipe[];

  ngOnInit() {
      this.recipes = this.service.getRecipes();

  }

  handleSelection(event) : void{
    if (event.option.selected) {
      event.source.deselectAll();
      event.option._setSelected(true);
    }
  }

}
