import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/register.model";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AccountsService {
  id: number;
  private adminMessage: string = null;
  private displayMessage = new BehaviorSubject<string>(this.adminMessage);

  constructor(private Http: HttpClient) {
  }

  private accountURL = 'http://localhost:3000/Users';

  checkMessage(): Observable<string> {
    return this.displayMessage.asObservable();
  }

  //Account Actions
  getAllAccounts(): Observable<User[]> {
    return this.Http.get<User[]>(this.accountURL)
  }
  getAccountById(id: number): Observable<User> {
    return this.Http.get<User>(`${this.accountURL}/${id}`);
  }
  addAccount(user: User) {
    return this.Http.post<User>(this.accountURL, user)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  updateAccount(user: User, id: number) {
    return this.Http.patch<User>(`${this.accountURL}/${id}`, user)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  updateStatus(status: object, id: number) {
    return this.Http.patch<object>(`${this.accountURL}/${id}`, status)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  deleteAccount(id: number) {
    return this.Http.delete<User>(`${this.accountURL}/${id}`)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  setMessage(message: string) {
    this.displayMessage.next(this.adminMessage = message);
  }
  resetMessage() {
    this.displayMessage.next(this.adminMessage = null);
  }
}
