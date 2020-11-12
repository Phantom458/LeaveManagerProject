import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import {LeaveFormComponent} from "./leave-form/leave-form.component";
import {LeaveListComponent} from "./leave-list/leave-list.component";
import {LeaveManagementComponent} from "./leave-management/leave-management.component";
import {LeaveComponent} from "./leave.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from "../shared/helpers/alert/alert.component";


@NgModule({
  declarations: [
    LeaveComponent,
    LeaveFormComponent,
    LeaveListComponent,
    LeaveManagementComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LeaveComponent,
    LeaveFormComponent,
    LeaveListComponent,
    LeaveManagementComponent,
    AlertComponent
  ]
})
export class LeaveModule { }
