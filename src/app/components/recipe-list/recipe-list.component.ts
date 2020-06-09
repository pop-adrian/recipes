import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {

  constructor(private service : RecipesService) { }
  
  recipes : Recipe[];
  @Output() selectedRecipeChanged = new EventEmitter();

  ngOnInit() {
      this.service.getRecipes().subscribe(data => this.recipes = data);
  }

  handleSelection(event) : void{
    if (event.option.selected) {
      event.source.deselectAll();
      event.option._setSelected(true);
      this.selectedRecipeChanged.emit(event.option.value);
    }
  }

}
