import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../../shared/validators/password.validator';
import { User } from '../../shared/models/register.model';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  errorMessage = '';

  statusList=['At Work', 'On Leave', 'Inactive'];

  constructor(private formBuilder: FormBuilder,
    private registrationService: RegisterService,
    private routes: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      status: ['', Validators.required]
    }, {validators: passwordValidator});
  }

  onRegister(){
    console.log('You have been registered. Please log in to continue');
    console.log('A new user has been added.');
    this.registrationService.createUser(this.signupForm.value);
    // this.dataStorageService.storeAccounts();
    console.log(this.signupForm.value);
    this.routes.navigate(['/']);
  }

}
