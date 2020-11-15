import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Leave} from "../models/leave.model";
import {HttpClient} from "@angular/common/http";
import {AppliedModel} from "../models/applied.model";
import {User} from "../models/register.model";

@Injectable({ providedIn: 'root' })
export class LeaveService{
  daysApplied: number;

  private leaveURL = 'http://localhost:3000/Leaves';
  private appliedURL = 'http://localhost:3000/Applied';

  constructor(private Http: HttpClient
    ) {}

    //Storing default leave values for newly registered users
    getDefaultLeave(): Observable<Leave> {
      return this.Http.get<Leave>(`${this.leaveURL}/${1}`)
  }
    createLeave(defaultLeave: Leave): Observable<Leave> {
      return this.Http.post<Leave>(this.leaveURL, defaultLeave)
  }

    //To display applied leave in LeaveListComponent and LeaveManagementComponent
    getAppliedLeave(): Observable<AppliedModel[]> {
      return this.Http.get<AppliedModel[]>(this.appliedURL)
  }
    getAppliedLeaveById(id: number): Observable<AppliedModel> {
      return this.Http.get<AppliedModel>(`${this.appliedURL}/${id}`)
    }
    getLeaveById(id: number): Observable<Leave> {
      return this.Http.get<Leave>(`${this.leaveURL}/${id}`)
  }

    //Save applied leave to database
    applyLeave(id: number, type: string, startDate: string, endDate: string, interim: string) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      this.daysApplied = (end.getTime() - start.getTime())/(1000*3600*24);

      const leaveApplied = {};
      leaveApplied['type'] = type;
      leaveApplied['startDate'] = startDate;
      leaveApplied['endDate'] = endDate;
      leaveApplied['daysApplied'] = this.daysApplied;
      leaveApplied['interim'] = interim;
      console.log(leaveApplied);
      return this.Http.post<AppliedModel[]>((this.appliedURL), leaveApplied);
    }

    //Functions to update leave taken days for specific user
    onLeaveAccept(id: number, updatedLeave: object) {
      return this.Http.patch<number>(`${this.leaveURL}/${id}`, updatedLeave) //how to patch to leave Array
      return this.Http.patch<string>(`${this.appliedURL}/${id}`, {"adminMessage": 'Your leave has been approved. Please inform to the HR office once you are back'})
    }
    onLeaveComplete(id: number) {
      return this.Http.delete<AppliedModel[]>(`${this.appliedURL}/${id}`);
    }
    onLeaveReject(id: number): Observable<string> {
      return this.Http.patch<string>(`${this.appliedURL}/${id}`, ({"adminMessage": 'Your leave has been rejected. Please contact HR for details.'}));
    }
    deleteLeave(id: number) {
      return this.Http.delete<number>(`${this.leaveURL}/${id}`);
    }
}
