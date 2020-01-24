import { User } from './../auth/models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
              private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    const roles = route.data.roles;
    return this.authService.isLoged() ? this.hasRoles(roles) : this.handleRedirect();
  }

  hasRoles(roles: Array<string>): boolean | Observable<boolean> {
    if (this.authService.getCurrentUser()) {
      return this.userHasRole(this.authService.getCurrentUser(), roles);
    } else {
      return this.handleUser(roles);
    }
  }

  handleRedirect(): boolean {
    this.authService.revokeToken();
    this.router.navigateByUrl('/');
    return false;
  }

  userHasRole(user: User, roles: Array<string>): boolean {
    const hasRoles = roles.includes(user.role.name);
    return hasRoles ? true : this.handleRedirect();
  }

  handleUser(roles: Array<string>): Observable<boolean> {
    return this.authService.getUserInfo()
    .pipe(map(user => {
      if (user) {
        return this.userHasRole(user, roles);
      } else {
        this.handleRedirect();
      }
    }));
  }
}
