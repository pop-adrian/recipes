import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {

  recipes : Recipe[] = new Array();

  constructor(private service : RecipesService) {  
    service.subject.subscribe(rec=> this.recipes.push(rec)); 
  }
  
 
  @Output() selectedRecipeChanged = new EventEmitter();
  @Input() addedRecipe : Recipe;

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
