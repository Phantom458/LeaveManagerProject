import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/models/register.model";
import {AccountsService} from "../../shared/services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  id: number;

  access: string;
  subscription: Subscription;

  constructor(private accountService: AccountsService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.user = this.accountService.getAccountById(this.id);
        }
      )
  }

  onEdit() {
    this.routes.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.accountService.deleteAccount(this.id);
    this.routes.navigate(['./'], {relativeTo: this.route})
  }
}
