import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { passwordValidator } from '../../shared/validators/password.validator';
import {AccountsService} from "../../shared/services/account.service";
import {Leave} from "../../shared/models/leave.model";
import {LeaveService} from "../../shared/services/leave.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  formMessage = '';
  editMode = false;

  id: number;
  defaultLeave: Leave[];

  statusList=['At Work', 'On Leave', 'Inactive'];

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountsService,
              private leaveService: LeaveService,
              private routes: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          this.getDefaultLeave();
        }
      )
  }

  private initForm() {
  this.signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [''],
    status: ['', Validators.required]
    }, {validators: passwordValidator});
  }

  private getDefaultLeave() {
    this.leaveService.getDefaultLeave()
      .subscribe(defaultLeave => this.defaultLeave = defaultLeave);
  }

  onRegister(){
    this.submitted = true;
    if(this.editMode) {
      this.submitted = true;
      this.accountService.updateAccount(this.signupForm.value, this.id);
      this.formMessage = 'Your changes have been saved';
      this.routes.navigate(['../'], {relativeTo: this.route})
    }
    else {
      this.accountService.addAccount(this.signupForm.value);
      this.leaveService.createLeave(this.defaultLeave);
      this.formMessage = 'Registration successful! Please log in to continue';
      this.routes.navigate(['/']);
    }
  }
}
