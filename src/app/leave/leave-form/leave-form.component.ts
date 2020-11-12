import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LeaveService} from "../../shared/services/leave.service";
import {DateValidators} from "../../shared/validators/date.validator";

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  submitted = false;

  selectedLeave: string;
  alertMessage = "";

  leaveList = ['Casual', 'Sick', 'Maternity/Paternity', 'Toil'];

  get leaveType() { return this.leaveForm.get('leaveType'); }
  get startDate() { return this.leaveForm.get('startDate'); }
  get endDate() { return this.leaveForm.get('endDate'); }

  constructor(private formBuilder: FormBuilder,
              private leaveService: LeaveService,
              private routes: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    }, {validators: Validators.compose([
        DateValidators.validRange('startDate', 'endDate', { 'loadDate': true })
    ])});
  }

  changeLeave(e) {
    const {value} = e.target;
    this.selectedLeave = value;
    this.leaveForm.get('leaveType').setValue(e.target.value, {
      onlySelf: true
    })
    return true;
  }

  onApply() {
    this.submitted = true;
    this.leaveService.applyLeave(this.leaveType.value, this.startDate.value, this.endDate.value);
    this.alertMessage = 'Leave has been applied';
  }

  onHandleMessage() {
    this.alertMessage = null;
    console.log(this.alertMessage);
    this.routes.navigate(['../'], {relativeTo: this.route})
  }

  onCancel() {
    this.routes.navigate(['../'], {relativeTo: this.route})
  }


}
