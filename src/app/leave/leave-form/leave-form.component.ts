import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LeaveService} from "../../shared/services/leave.service";
import {DateValidators} from "../../shared/validators/date.validator";
import {Leave} from "../../shared/models/leave.model";
import {AppliedModel} from "../../shared/models/applied.model";

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  submitted = false;
  private id: number;

  private selectedLeave: string;
  alertMessage = null;

  leaveList = ['Casual', 'Sick', 'Maternity', 'Toil'];

  get leaveType() { return this.leaveForm.get('leaveType'); }
  get startDate() { return this.leaveForm.get('startDate'); }
  get endDate() { return this.leaveForm.get('endDate'); }
  get interim() { return this.leaveForm.get('interim'); }

  constructor(private formBuilder: FormBuilder,
              private leaveService: LeaveService,
              private routes: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )

    this.leaveForm = this.formBuilder.group({
      leaveType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      interim: ['']
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
    this.leaveService.applyLeave(this.id, this.leaveType.value, this.startDate.value, this.endDate.value, this.interim.value);
    this.alertMessage = 'Leave has been applied';
  }

  onHandleMessage() {
    this.alertMessage = null;
    this.routes.navigate(['user/account', this.id, 'detail'])
  }

  onCancel() {
    this.routes.navigate(['user/account', this.id, 'detail'])
  }
}
