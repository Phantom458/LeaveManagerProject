import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor( private authService: AuthService,
    private routes: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): boolean | UrlTree {
    let hasId = null;
    this.authService.checkRole()
      .subscribe(id => hasId = id);

    if (hasId != 1) {
      return true;
    } else {
      this.routes.createUrlTree(['/'])
    }
  }
}
