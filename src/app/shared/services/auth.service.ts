import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private Http: HttpClient, private routes: Router) { }

  private loginUrl = 'http://localhost:3000/auth/login'; // Server log in Service

  loginUser(userData): Observable<any> {
    return this.Http.post<any>(this.loginUrl, userData);
  }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  admin() {
    return this.isLoggedIn() && JSON.parse(JSON.stringify(localStorage.getItem('user'))).role === 'admin'; //working when its stringified.
  }

  // showUserId() {
  //   return JSON.parse(localStorage.getItem('user')).id;
  // }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.routes.navigate(['']);
  }
}
