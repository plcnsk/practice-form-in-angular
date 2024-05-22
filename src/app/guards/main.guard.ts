import { inject } from '@angular/core';
import { AuthUserService } from '../shared/services/app/auth-user.service';
import { Router } from '@angular/router';

export function canActivateMain(): boolean {
  const authUserService = inject(AuthUserService);
  const router = inject(Router);

  if (authUserService.isAuthenticated) {
    return true;
  }

  router.navigate(['login']).then();
  return false;
}
