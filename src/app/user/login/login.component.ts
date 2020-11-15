import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/register.model";
import {AccountsService} from "../../shared/services/account.service";
import {AppliedModel} from "../../shared/models/applied.model";
import {LeaveService} from "../../shared/services/leave.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: User[];

  userLog: FormGroup;
  errorMessage = "";

  constructor(private routes: Router,
              private authService: AuthService,
              public formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private accountService: AccountsService
              ) { }

    get email() {
      return this.userLog.get("email");
    }
    get password() {
      return this.userLog.get("password");
    }

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe(
        userData => this.userData = userData
      );
    this.userLog = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onRegister(){
    this.routes.navigate(['../register'], {relativeTo: this.route});
  }

  onLogin() {
    const correctEmail = this.userData.find(user => user.email == this.email.value);
    const correctPassword = this.userData.find(user => user.password == this.password.value);
    const user = this.userData.filter(user => user.email === this.email.value); //Get single user [{data}]
    const userSelected = user.find(user => user.email == this.email.value); //remove array and keep object

    if (correctEmail && correctPassword) {
      this.authService.loginUser(userSelected.id);
    } else {
      this.errorMessage = "Incorrect email or password";
    }
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
