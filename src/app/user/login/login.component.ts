import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLog: FormGroup;
  errorMessage = "";

  constructor(private routes: Router,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

    get email() {
      return this.userLog.get("email");
    }
    get password() {
      return this.userLog.get("password");
    }

  ngOnInit(): void {
    this.userLog = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onRegister(){
    this.routes.navigate(['../register'], {relativeTo: this.route});
  }

  onLogin() {
    this.authService.loginUser(this.userLog.value)
      .subscribe(
        response => {
          console.log('Success!', response);
          // localStorage.setItem('token', response.access_token);
          // localStorage.setItem('user', JSON.stringify(response.user));
          this.routes.navigate(['leave/form']);
        }
        ,
        error => {
          console.error('Error!', error)
          this.errorMessage = "Invalid Username or Password. Please try again.";
          this.userLog.reset();
        }
      );
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
