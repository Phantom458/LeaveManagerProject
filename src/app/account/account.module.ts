import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {UserListComponent} from "./user-list/user-list.component";
import {UserValueComponent} from "./user-list/user-value/user-value.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {SharedModule} from "../shared/shared.module";
import {DropdownDirective} from "../shared/helpers/dropdown.directive";


@NgModule({
  declarations: [
    UserListComponent,
    UserValueComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  exports: [
    UserListComponent,
    UserValueComponent,
    UserDetailsComponent
  ]
})
export class AccountModule { }
