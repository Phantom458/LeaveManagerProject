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

  setMessage(message: string) {
    this.displayMessage.next(this.adminMessage = message);
  }
  resetMessage() {
    this.displayMessage.next(this.adminMessage = null);
  }
}
