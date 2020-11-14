import { Component, OnInit } from '@angular/core';
import {LeaveService} from "../../shared/services/leave.service";
import {AppliedModel} from "../../shared/models/applied.model";
import {User} from "../../shared/models/register.model";
import {AccountsService} from "../../shared/services/account.service";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  appliedList: AppliedModel;

  constructor(private leaveService: LeaveService,
              private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.leaveService.getAppliedLeave()
      .subscribe(appliedLeave => this.appliedList = appliedLeave);
  }
}
