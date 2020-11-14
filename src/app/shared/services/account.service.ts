import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/register.model";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AccountsService {
  id: number;
  // private userData: User;
  // private allUsersData: User[];
  // private userState = new BehaviorSubject<User>(this.userData);
  // private allUsersState = new BehaviorSubject<User>(this.allUsersData);

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
  addAccount(newAccount: User): Observable<User> {
    return this.Http.post<User>(this.accountURL, newAccount);
  }
  updateAccount(user: User, id: number): Observable<User> {
    return this.Http.patch<User>(`${this.accountURL}/${id}`, user);
  }
  updateStatus(status: object, id: number): Observable<object> {
    return this.Http.patch<object>(`${this.accountURL}/${id}`, status);
  }
  deleteAccount(id: number) {
    return this.Http.delete(`${this.accountURL}/${id}`);
  }
  adminChanges(changes, id: number): Observable<any> {
    return this.Http.put<any>(`${this.accountURL}/${id}`, changes)
  }

  //Observables
  // checkMessage(): Observable<string> {
  //   return this.messageUpdated.asObservable();
  // }
  // getMessage(id: number) {
  //   return this.users[id].adminMessage;
  // }
  // resetMessage(id: number) {
  //   this.users[id].adminMessage = '';
  //   this.messageUpdated.next(this.users[id].adminMessage = '');
  // }
}
