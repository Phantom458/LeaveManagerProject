import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/register.model";
import {Subscription} from "rxjs";
import {AccountsService} from "../../shared/services/account.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  errorMessage;

  constructor(private accountService: AccountsService) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe(allAccounts => this.users = allAccounts,
      error => this.errorMessage = error);
  }
}
