import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveFormComponent} from "./leave-form/leave-form.component";
import {LeaveListComponent} from "./leave-list/leave-list.component";
import {LeaveManagementComponent} from "./leave-management/leave-management.component";
import {UserGuard} from "../shared/guards/user.guard";
import {AdminGuard} from "../shared/guards/admin.guard";

const routes: Routes = [
  {
    path: ':id/form',
    component: LeaveFormComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'list',
    component: LeaveListComponent
  },
  {
    path: ':id/manage',
    component: LeaveManagementComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
