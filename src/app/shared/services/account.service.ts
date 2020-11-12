import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {User} from "../models/register.model";

@Injectable({ providedIn: 'root' })
export class AccountsService {
  id: number;

  constructor() {
  }

  userAdded = new Subject<User[]>();
  idAccess = new Subject<number>();

  messageUpdated = new Subject<string>();

  private users: User[] = [
    new User(0, 'Error', 'Magnet', 'sawan.42n@gmail.com',
      17491632, 'iamalemon', 'On Leave'),

    new User(1, 'The', 'Beast', 'sawee42@gmail.com',
      17694200, 'iambatman', 'At Work'),

    new User(2, 'No', 'One', 'noone@gmail.com',
      17777777, 'iamnoone', 'Inactive')
  ];

  //Account Actions
  getAllAccounts() {
    return this.users.slice();
  }

  getAccountById(index: number) {
    return this.users[index];
  }

  addAccount(user: User) {
    this.users.push({id: (this.users.length), ...user});
    this.userAdded.next(this.users.slice());
  }

  updateAccount(index: number, updatedAccount: User) {
    this.users[index] = updatedAccount;
    this.userAdded.next(this.users.slice());
  }

  deleteAccount(index: number) {
    this.users.splice(index, 1);
    this.userAdded.next(this.users.slice());
  }

  //Observables
  checkMessage(): Observable<string> {
    return this.messageUpdated.asObservable();
  }

  getMessage(id: number) {
    return this.users[id].adminMessage;
  }

  resetMessage(id: number) {
    this.users[id].adminMessage = '';
    this.messageUpdated.next(this.users[id].adminMessage = '');
  }

  getId(): Observable<number> {
    return this.idAccess.asObservable();
  }
}
