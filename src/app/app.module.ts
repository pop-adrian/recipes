import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { ShowRecipeComponent } from './components/show-recipe/show-recipe.component';
import {MatCardModule} from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    EditRecipeComponent,
    ShowRecipeComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [
    { 
      provide: APP_BASE_HREF,
      useValue: environment.apiRoot,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
