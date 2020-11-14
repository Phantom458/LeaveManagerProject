import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/models/register.model";
import {Subscription} from "rxjs";
import {AccountsService} from "../../shared/services/account.service";
import {LeaveService} from "../../shared/services/leave.service";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Leave} from "../../shared/models/leave.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  leave: Leave;
  userId: number;
  userAuth: number;
  errorMessage = '';
  serverMessage;
  private subscription: Subscription;

  constructor(private accountService: AccountsService,
              private leaveService: LeaveService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private routes: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = +params['id'];
        }
      )
    this.subscription = this.authService.checkRole().subscribe(
      id => {
        this.userAuth = id;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.accountService.getAccountById(this.userId)
      .subscribe(accounts => this.user = accounts,
          error => this.errorMessage = error);
    this.leaveService.getLeaveById(this.userId)
      .subscribe(leaveValues => this.leave = leaveValues,
          error => this.errorMessage = error);
    console.log(this.leave);    //getting data as undefined
    // this.leaveService.getMessage(this.id)
    //   .subscribe(message => this.serverMessage = message);
  }

  onEdit() {
    this.routes.navigate(['user', this.userId, 'edit']);
  }

  onDelete() {
    if(this.userAuth != 1) {
      this.accountService.deleteAccount(this.userId);
      this.serverMessage = 'Your account has been successfully removed';
      this.routes.navigate(['/'])
    } else {
      this.accountService.deleteAccount(this.userId);
      this.serverMessage = 'Account has been successfully removed';
      this.routes.navigate(['../../list'], {relativeTo: this.route})
    }
  }

  onHandleError() {
    this.errorMessage = null;
  }
  onHandleMessage() {
    this.serverMessage = null;
    this.leaveService.removeMessage(this.userId);
  }
}
