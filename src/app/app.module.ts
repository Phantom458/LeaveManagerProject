import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
// import { environment } from '../environments/environment';
import {AppRoutingModule} from "./app-routes.module";
import {DropdownDirective} from "./shared/helpers/dropdown.directive";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent
  ],
  bootstrap: [AppComponent],
  // providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}]
})
export class AppModule { }
