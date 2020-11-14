import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/register.model";
import {LeaveTypeModel} from "../../../shared/models/leave-type.model";
import {AppliedModel} from "../../../shared/models/applied.model";
import {LeaveService} from "../../../shared/services/leave.service";

@Component({
  selector: 'app-leave-value',
  templateUrl: './leave-value.component.html',
  styleUrls: ['./leave-value.component.css']
})
export class LeaveValueComponent implements OnInit {
  @Input() appliedLeaveData: AppliedModel;

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
  }

}
