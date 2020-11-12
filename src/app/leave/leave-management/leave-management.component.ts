import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onApprove(id: number) {
    console.log("Approved");
  }
  onReject(id: number) {
    console.log("Rejected");
  }
  onCancel(id: number) {
    console.log("Canceled");
  }
  onCompleted(id: number) {
    console.log("Completed");
  }

}
