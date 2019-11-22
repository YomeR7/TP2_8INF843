import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FrontBarComponent } from './front-bar/front-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { InformationComponent } from './information/information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { TrajetPersoComponent } from './trajet-perso/trajet-perso.component'; 


@NgModule({
  declarations: [
    AppComponent,
    FrontBarComponent,
    SearchResultComponent,
    ConnexionComponent,
    InscriptionComponent,
    InformationComponent,
    TrajetPersoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatGridListModule,
    RouterModule.forRoot([
      { path: '', component: SearchResultComponent },
      { path:'Connexion' , component : ConnexionComponent },
      { path:'Inscription' , component : InscriptionComponent },
      { path:'Information' , component : InformationComponent },
      { path:'TrajetPerso' , component : TrajetPersoComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
