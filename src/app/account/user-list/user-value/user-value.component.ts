import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/register.model";
import {AccountsService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {
  @Input() user: User;

  constructor(private accountService: AccountsService) { }

  ngOnInit(): void {
  }
}
