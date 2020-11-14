import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AdminGuard} from "../shared/guards/admin.guard";

const routes: Routes = [
  {
    path: ':id/detail',
    component: UserDetailsComponent
  },
  {
    path: 'list',
    component: UserListComponent,
    canActivate: [AdminGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
