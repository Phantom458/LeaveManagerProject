import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LeaveService} from "../../shared/services/leave.service";
import {Leave} from "../../shared/models/leave.model";
import {AppliedModel} from "../../shared/models/applied.model";

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  id: number;
  userLeaveLeft: Leave[] = [];
  userAppliedLeave: AppliedModel[] = [];

  constructor(private route: ActivatedRoute,
              private leaveService: LeaveService,
              private routes: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
    this.leaveService.getLeaveById(1)
      .subscribe(userLeave => this.userLeaveLeft = userLeave);
    this.leaveService.getAppliedLeaveById(1)
      .subscribe(appliedLeave => this.userAppliedLeave = appliedLeave);
  }

  onApprove() {
    this.leaveService.onLeaveAccept(this.id);
  }
  onReject() {
    this.leaveService.onLeaveReject(this.id);
  }
  onCancel() {
    this.leaveService.onLeaveComplete(this.id);
  }
  onCompleted() {
    this.leaveService.onLeaveComplete(this.id);
  }

  addLeaveDays() {

  }
}
