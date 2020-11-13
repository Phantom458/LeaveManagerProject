import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import {LeaveFormComponent} from "./leave-form/leave-form.component";
import {LeaveManagementComponent} from "./leave-management/leave-management.component";
import {LeaveComponent} from "./leave.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {LeaveListComponent} from "./leave-list/leave-list.component";
import { LeaveValueComponent } from './leave-list/leave-value/leave-value.component';


@NgModule({
  declarations: [
    LeaveComponent,
    LeaveFormComponent,
    LeaveListComponent,
    LeaveManagementComponent,
    LeaveValueComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    LeaveComponent,
    LeaveFormComponent,
    LeaveListComponent,
    LeaveManagementComponent,
    LeaveValueComponent
  ]
})
export class LeaveModule { }
