import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LeaveService} from "../../shared/services/leave.service";
import {Leave} from "../../shared/models/leave.model";
import {AppliedModel} from "../../shared/models/applied.model";
import {AccountsService} from "../../shared/services/account.service";
import {User} from "../../shared/models/register.model";

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  id: number;
  userLeaveLeft: Leave;
  userAppliedLeave: AppliedModel;
  userData: User;

  constructor(private leaveService: LeaveService,
              private accountService: AccountsService,
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
      .subscribe(userData => this.userData = userData);
    this.leaveService.getLeaveById(this.id)
      .subscribe(userLeave => this.userLeaveLeft = userLeave);
    this.leaveService.getAppliedLeaveById(this.id)
      .subscribe(appliedLeave => this.userAppliedLeave = appliedLeave);
  }

  onApprove() {
    this.leaveService.onLeaveAccept(this.id, this.daysUpdate());
    this.routes.navigate(['../../list'], {relativeTo: this.route});
  }
  daysUpdate() {
    const days = this.userLeaveLeft.leave.find(x => x.type == this.userAppliedLeave.type)
    const updateLeaveDays = {}
    updateLeaveDays['leaveLeft'] = days.leaveLeft - this.userAppliedLeave.daysApplied;
    updateLeaveDays['leaveTaken'] = days.leaveTaken + this.userAppliedLeave.daysApplied;
    return updateLeaveDays;
  }
  onReject() {
    this.leaveService.onLeaveReject(this.id);
    this.routes.navigate(['../../list'], {relativeTo: this.route});
  }
  onCancel() {
    this.leaveService.onLeaveComplete(this.id);
    this.routes.navigate(['../../list'], {relativeTo: this.route});
  }
  onCompleted() {
    this.leaveService.onLeaveComplete(this.id);
    this.routes.navigate(['../../list'], {relativeTo: this.route});
  }
}
