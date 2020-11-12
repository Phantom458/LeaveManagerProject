import {Component, Input, OnInit} from '@angular/core';
import {take} from "rxjs/operators";
import {User} from "../../../shared/models/register.model";
import {AccountsService} from "../../../shared/services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  constructor(private accountService: AccountsService) { }

  ngOnInit(): void {
  }
}
