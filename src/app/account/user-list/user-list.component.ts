import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/register.model";
import {AccountsService} from "../../shared/services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  subscription: Subscription;

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.subscription = this.accountsService.userAdded
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
    this.users = this.accountsService.getAllAccounts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
