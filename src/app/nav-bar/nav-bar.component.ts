import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: string = '';

  constructor(public authService: AuthService,
    private routes: Router) { }

  ngOnInit(): void {
    this.authService.checkRole
      .subscribe(
        (role => {
          this.role = role;
        })
      )
  }

  onMyPage() {
    this.routes.navigate(['']);
  }
  onAddUser() {
    this.routes.navigate(['']);
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
