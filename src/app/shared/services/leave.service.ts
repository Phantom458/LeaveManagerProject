import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable, Subject} from "rxjs";
import {Leave} from "../models/leave.model";

@Injectable({ providedIn: 'root' })
export class LeaveService{
  listUpdated = new Subject<object>();

  public leaveList: Leave[] = [
    new Leave (2, 'Sick Leave', 5),
    new Leave (1, 'Casual Leave', 2),
  ]

    constructor(private authService: AuthService
    ) {}

    getLeave(){
    }

    applyLeave(type: string, startDate: string, endDate: string) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      const days = (end.getTime() - start.getTime())/(1000*3600*24);
      const leaveApplied = {type: days}
      //add to database
      console.log(leaveApplied);
    }

  getList(): Observable<object> {
    return this.listUpdated.asObservable();
  }

    deleteLeave() {
      }
}
