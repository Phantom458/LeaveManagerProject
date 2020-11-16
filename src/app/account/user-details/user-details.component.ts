import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/models/register.model";
import {Subscription} from "rxjs";
import {AccountsService} from "../../shared/services/account.service";
import {LeaveService} from "../../shared/services/leave.service";
import {AuthService} from "../../shared/services/auth.service";
import {Leave} from "../../shared/models/leave.model";
import {AppliedModel} from "../../shared/models/applied.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  leave: Leave;
  appliedLeave: AppliedModel;
  userId: number;
  userAuth: number;
  formMessage: string;
  adminMessage: string;
  nullMessage: string;

  private subscription: Subscription;

  constructor(private accountService: AccountsService,
              private leaveService: LeaveService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = +params['id'];
        }
      );
    this.subscription = this.authService.checkRole().subscribe(
      id => {
        this.userAuth = id;
      }
    );
    this.accountService.getAccountById(this.userId)
      .subscribe(accounts => this.user = accounts);
    this.leaveService.getLeaveById(this.userId)
      .subscribe(leaveValues => this.leave = leaveValues);
    this.leaveService.getAppliedLeaveById(this.userId)
      .subscribe(appliedLeave => this.appliedLeave = appliedLeave);
  }

  onEdit() {
    if (this.userAuth == 1) {
      this.routes.navigate(['../edit'], {relativeTo: this.route});
    } else {
      this.routes.navigate(['user', this.userId, 'edit']);
    }
  }
  onDelete() {
    if(this.userAuth != 1) {
      this.accountService.deleteAccount(this.userId);
      this.leaveService.deleteLeave(this.userId);
      this.formMessage = 'Your account has been successfully removed';
    } else {
      this.accountService.deleteAccount(this.userId);
      this.leaveService.deleteLeave(this.userId);
      this.formMessage = 'Account has been successfully removed';
    }
  }

  messageUpdate() {
    const adminMessage = this.appliedLeave.adminMessage;
    if (adminMessage == undefined) {
      this.nullMessage = "No Leave Updates";
      this.getMessage();
    } else {
      this.accountService.setMessage(adminMessage);
    }
  }
  getMessage() {
    this.accountService.checkMessage()
      .subscribe(message => this.adminMessage = message);
  }


  onHandleMessage() {
    this.formMessage = null;
    if (this.userAuth != 1){
      this.routes.navigate(['/'])
    } else {
      this.routes.navigate(['../../list'], {relativeTo: this.route})
    }
  }
  onHandleAdminMessage() {
    this.adminMessage = null;
    this.accountService.resetMessage()
    this.leaveService.resetLeaveData(this.userId);
  }
}
