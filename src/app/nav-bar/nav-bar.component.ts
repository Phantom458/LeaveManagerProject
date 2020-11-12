import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthService,
    private routes: Router) { }

  ngOnInit(): void {
  }

  goToDetail() {
    this.routes.navigate(['user/account',2,'detail'])
  }
  onAddUser() {
    this.routes.navigate(['user/register']);
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
