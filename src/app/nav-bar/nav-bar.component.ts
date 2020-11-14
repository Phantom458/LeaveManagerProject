import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userId: number;
  private subscription: Subscription;

  constructor(public authService: AuthService,
    private routes: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.checkRole().subscribe(
      id => {
        this.userId = id;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
