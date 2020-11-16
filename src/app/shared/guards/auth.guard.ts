import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private routes: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              router: RouterStateSnapshot): boolean | UrlTree {
    let hasId = null;
    this.authService.checkRole()
      .subscribe(id => hasId = id);

    if (hasId != null) {
      return true;
    } else {
      this.routes.createUrlTree(['/'])
    }
  }
}
