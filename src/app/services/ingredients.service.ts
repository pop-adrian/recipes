import { Injectable } from '@angular/core';
import { Ingredient } from '../../app/models/ingredient.model'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private _url: string = environment.apiRoot+ "api/Ingredients";
  constructor(private http: HttpClient) { }
  
  getIngredients() : Observable<Ingredient[]>{  
    return this.http.get<Ingredient[]>(this._url);   
  }
}
