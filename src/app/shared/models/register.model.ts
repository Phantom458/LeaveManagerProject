// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   status: string;
// }


export class User {
  public id: number;
  public fName: string;
  public lName: string;
  public email: string;
  public phoneNumber: number;
  public password: string;
  public status: string;
  public adminMessage?: string;

  constructor(
    id: number,
    fName: string,
    lName: string,
    email: string,
    phoneNumber: number,
    password: string,
    status: string,
    adminMessage?: string
  ){
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.status = status;
    this.adminMessage = adminMessage;
  }
}
