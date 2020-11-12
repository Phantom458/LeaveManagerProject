import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: ':id/detail',
    component: UserDetailsComponent
  },
  {
    path: 'list',
    component: UserListComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
