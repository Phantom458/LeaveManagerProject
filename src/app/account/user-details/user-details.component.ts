import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/models/register.model";
import {Subscription} from "rxjs";
import {AccountsService} from "../../shared/services/account.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  id: number;
  errorMessage;

  deletionMessage;

  constructor(private accountService: AccountsService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
    this.accountService.getAccountById(this.id)
      .subscribe(accounts => this.user = accounts,
        error => this.errorMessage = error);
  }

  onEdit() {
    this.routes.navigate(['user', this.id, 'edit']);
  }

  onDelete() {
    this.accountService.deleteAccount(this.id);
    this.deletionMessage = 'Your account has been successfully removed';
    this.routes.navigate(['/'])
  }

  onHandleError() {
    this.deletionMessage = null;
  }
}
