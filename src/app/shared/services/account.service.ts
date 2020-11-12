import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    // return this.users[index];
    return this.Http.get<User>(`${this.accountURL}/${id}`);
  }
  addAccount(newAccount: User): Observable<User> {
    return this.Http.post<User>(this.accountURL, newAccount);
  }
  updateAccount(user: User, id: number): Observable<any> {
    return this.Http.patch<any>(`${this.accountURL}/${id}`, user);
  }
  deleteAccount(id: number) {
    return this.Http.delete(`${this.accountURL}/${id}`);
  }
  adminChanges(changes, id: number): Observable<any> {
    return this.Http.put<any>(`${this.accountURL}/${id}`, id)
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
