import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/models/register.model";
import {Subscription} from "rxjs";
import {AccountsService} from "../../shared/services/account.service";
import {LeaveService} from "../../shared/services/leave.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  id: number;
  errorMessage = '';
  serverMessage;

  constructor(private accountService: AccountsService,
              private leaveService: LeaveService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
    this.accountService.getAccountById(this.id)
      .subscribe(accounts => this.user = accounts,
        error => this.errorMessage = error);
    // this.leaveService.getMessage(this.id)
    //   .subscribe(message => this.serverMessage = message);
  }

  onEdit() {
    this.routes.navigate(['user', this.id, 'edit']);
  }

  onDelete() {
    this.accountService.deleteAccount(this.id);
    this.serverMessage = 'Your account has been successfully removed';
    this.routes.navigate(['/'])
  }

  onHandleError() {
    this.errorMessage = null;
  }
  onHandleMessage() {
    this.serverMessage = null;
    this.leaveService.removeMessage(this.id);
  }
}
