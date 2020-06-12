import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { IngredientsService } from './ingredients.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Converter } from '../models/converters/recipe.converter';
import { RecipeDTO } from  "../models/dtos/recipe.DTO";
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _url : string =environment.apiRoot+"api/recipes";

  constructor(private ingredientsService:  IngredientsService, private httpClient : HttpClient) { }

  createDescription(length) : string{
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  getRecipes() : Observable<Recipe[]>{
    var allRecipes : Subject<Recipe[]> = new Subject();
    this.ingredientsService.getIngredients().subscribe(ingredients => { 
      this.httpClient.get<RecipeDTO[]>(this._url).subscribe(recipes =>{ 
          var result = recipes.map(dto => Converter.convert(dto, ingredients));
          allRecipes.next(result);
        });
   });
    return allRecipes;
  }

  updateRecipe(recipe : Recipe) : void{
    console.log(recipe);

    var recipeDTO : RecipeDTO = Converter.recipeToRecipeDTO(recipe);
    var putURL = this._url+"/"+recipe.id;
    this.httpClient.put(putURL, recipeDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(recipe=> console.log(recipe));
  }

  saveNewRecipe(recipe: Recipe) : void{
     console.log("intra in save");
     var recipeDTO : RecipeDTO = Converter.recipeToRecipeDTO(recipe);
     console.log(recipeDTO);
      this.httpClient.post<string>(this._url, recipeDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
     }).subscribe(data=>console.log(data));
  }
}

