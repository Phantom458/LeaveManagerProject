export class Leave {
  id: number;
  leaveType: string;
  leaveDays: number;

  constructor(
    id: number,
    leaveType: string,
    leaveDays: number
  ){
    this.id = id;
    this.leaveType = leaveType;
    this.leaveDays = leaveDays;
  }
}
