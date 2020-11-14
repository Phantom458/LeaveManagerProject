import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { passwordValidator } from '../../shared/validators/password.validator';
import {AccountsService} from "../../shared/services/account.service";
import {Leave} from "../../shared/models/leave.model";
import {LeaveService} from "../../shared/services/leave.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  formMessage = '';
  private subscription: Subscription;

  id: number;
  userAuth: number;
  defaultLeave: Leave[];

  statusList=['At Work', 'On Leave', 'Inactive'];

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountsService,
              private leaveService: LeaveService,
              private authService: AuthService,
              private routes: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subscription = this.authService.checkRole().subscribe(
      id => {
        this.userAuth = id;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.initForm();
          this.getDefaultLeave();
        }
      )
  }

  get status() {
    return this.signupForm.get('status');
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
    if(this.id > 1) {
      this.submitted = true;
      this.accountService.updateAccount(this.signupForm.value, this.id);
      this.formMessage = 'Your changes have been saved';
      this.routes.navigate(['../../account', this.id, 'detail'], {relativeTo: this.route})
    }else if (this.id == 1) {
      this.submitted = true;
      let statusUpdate= {};
      statusUpdate['status'] = this.status;
      this.accountService.updateStatus(statusUpdate, this.id);
      this.routes.navigate(['../../account', this.id, 'detail'], {relativeTo: this.route})
    }
    else {
      this.submitted = true;
      this.accountService.addAccount(this.signupForm.value);
      this.leaveService.createLeave(this.defaultLeave);
      this.formMessage = 'Registration successful! Please log in to continue';
      this.routes.navigate(['../login'], {relativeTo: this.route});
    }
  }

  onBack() {
    this.routes.navigate(['../login'], {relativeTo: this.route})
  }
  onCancel() {
    this.routes.navigate(['../../account/list'], {relativeTo: this.route})
  }
  onHandleError() {
    this.formMessage = null;
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Success!',{
  //     timeOut: 5000,
  //     easing: 'ease-in',
  //     easeTime: 300
  //   });
  // }
}
