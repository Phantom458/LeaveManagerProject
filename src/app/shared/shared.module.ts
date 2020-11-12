import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from "./helpers/alert/alert.component";
import {LoadingSpinnerComponent} from "./helpers/loading-spinner/loading-spinner.component";
import {PageNotFoundComponent} from "./helpers/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
