import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveFormComponent} from "./leave-form/leave-form.component";
import {LeaveListComponent} from "./leave-list/leave-list.component";
import {LeaveManagementComponent} from "./leave-management/leave-management.component";

const routes: Routes = [
  {
    path: 'form',
    component: LeaveFormComponent
  },
  {
    path: 'list',
    component: LeaveListComponent
  },
  {
    path: ':id/manage',
    component: LeaveManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
