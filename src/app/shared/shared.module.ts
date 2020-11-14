import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from "./helpers/alert/alert.component";
import {LoadingSpinnerComponent} from "./helpers/loading-spinner/loading-spinner.component";
import {PageNotFoundComponent} from "./helpers/page-not-found/page-not-found.component";
import {DropdownDirective} from "./helpers/dropdown.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    DropdownDirective
  ]
})
export class SharedModule { }
