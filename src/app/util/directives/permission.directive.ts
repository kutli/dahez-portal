import { User } from './../../auth/models/user.model';
import { AuthService } from './../../auth/auth.service';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) { }

  roles: Array<string>
  user: Subscription;

  @Input() set appPermission(roles: Array<string>) {
    this.roles = roles;
  }

  /**
   * Subscribe to the user
   */
  ngOnInit(): void {
    this.user = this.authService.user
    .subscribe(user => this.validateUserCredentials(user, this.roles));
  }
  ngOnDestroy(): void {
    this.user.unsubscribe();
  }

  validateUserCredentials(user: User, roles: Array<string>): void {
    this.viewContainer.clear();
    if (!user) {
      this.viewContainer.clear();
    } else if (this.userHasRoles(user, roles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  userHasRoles(user: User, roles: Array<string>): boolean {
    return roles.includes(user.role.name);
  }

}
