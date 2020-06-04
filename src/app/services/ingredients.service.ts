import { Injectable } from '@angular/core';
import { Ingredient } from '../../app/models/ingredient.model'; 

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }
  
  getIngredients(){
    const ingredient1: Ingredient = {
      id: 1,
      name: 'flour'
    }
    const ingredient2: Ingredient = {
      id: 2,
      name: 'onion'
    }
    const ingredient3: Ingredient = {
      id: 3,
      name: 'tomatoes'
    }
    const ingredient4: Ingredient = {
      id: 4,
      name: 'potatoes'
    }
    var list = new Array();
    list.push(ingredient1);
    list.push(ingredient2);
    list.push(ingredient3);
    list.push(ingredient4);
    return list;
  }
}
