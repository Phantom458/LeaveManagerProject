import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {LeaveService} from "../../shared/services/leave.service";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  subscription: Subscription;
  leaveList = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.subscription = this.leaveService.getList()
      .subscribe(
        (leaveList) => {
          this.leaveList.push(leaveList);
        }
      )
  }

}
