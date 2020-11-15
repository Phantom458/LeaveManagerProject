import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/register.model";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AccountsService {
  id: number;

  constructor(private Http: HttpClient) {
  }

  private accountURL = 'http://localhost:3000/Users';

  //Account Actions
  getAllAccounts(): Observable<User[]> {
    return this.Http.get<User[]>(this.accountURL)
      // .catchError(this.errorHandler)
  }
  // errorHandler(error: HttpErrorResponse){
  //   return Observable.throwError(error.message || 'Server Error')
  // }
  getAccountById(id: number): Observable<User> {
    return this.Http.get<User>(`${this.accountURL}/${id}`);
  }
  async addAccount(newAccount: User) {
    await fetch(this.accountURL, {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newAccount)
    })
  }

  updateAccount(user: User, id: number): Observable<User> {
    return this.Http.patch<User>(`${this.accountURL}/${id}`, user);
  }
  updateStatus(status: object, id: number): Observable<object> {
    return this.Http.patch<object>(`${this.accountURL}/${id}`, status);
  }
  deleteAccount(id: number): Observable<User> {
    return this.Http.delete<User>(`${this.accountURL}/${id}`);
  }
}
