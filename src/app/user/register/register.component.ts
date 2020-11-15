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
import {User} from "../../shared/models/register.model";

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
  userAuth: number = null;
  defaultLeave: Leave;
  // private defaultLeave: Leave[] = [
  //   new Leave(
  //     [new LeaveTypeModel("casual", 30, 30, 0)],
  //     [new LeaveTypeModel("sick", 60, 60, 0)],
  //     [new LeaveTypeModel("maternity", 180, 180, 0)],
  //     [new LeaveTypeModel("toil", 50, 50, 0)]
  //   )
  // ];
  userData: User[];

  statusList=['At Work', 'On Leave', 'Inactive'];

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountsService,
              private leaveService: LeaveService,
              private authService: AuthService,
              private routes: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe(
        userData => this.userData = userData
      );
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
  get email() {
    return this.signupForm.get('email');
  }

  private initForm() {
  this.signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [''],
    status: ['']
    }, {validators: passwordValidator});
  }

  private getDefaultLeave() {
    this.leaveService.getDefaultLeave()
      .subscribe(defaultLeave => this.defaultLeave = defaultLeave);
  }

  onRegister(){
    if (this.userAuth == null && this.checkDupeEmail(this.email.value)) {
      this.formMessage = 'This email has already been registered. SignIn to continue';
    } else {
      this.submitted = true;
      if(this.id < 1) {
        this.submitted = true;
        this.accountService.updateAccount(this.signupForm.value, this.id);
        this.formMessage = 'Your changes have been saved';
      }
      else {
        this.submitted = true;
        this.accountService.addAccount(this.signupForm.value);
        this.leaveService.createLeave(this.defaultLeave);
        this.formMessage = 'Registration successful! Please log in to continue';
      }
    }
  }
  checkDupeEmail(email: string) {
    const dupeEmail = this.userData.find(user => user.email == email);
    if (dupeEmail) {
      return true;
    }
  }

  onBack() {
    this.routes.navigate(['../login'], {relativeTo: this.route})
  }
  onCancel() {
    this.routes.navigate(['../../account/', this.id, 'detail'], {relativeTo: this.route})
  }
  onHandleError() {
    this.formMessage = null;
    if(this.id > 1 || this.id == 1) {
      this.routes.navigate(['user/account', this.id, 'detail'])
    } else {
      this.routes.navigate(['user/login']);
    }
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Success!',{
  //     timeOut: 5000,
  //     easing: 'ease-in',
  //     easeTime: 300
  //   });
  // }
}
