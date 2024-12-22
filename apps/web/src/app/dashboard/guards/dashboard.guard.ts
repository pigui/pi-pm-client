import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '@web/auth';

export function dashboardGuard(): CanActivateFn {
  return () => {
    const authFacade = inject(AuthFacade);
    if (!authFacade.isLogged()) {
      const routes = inject(Router);
      routes.navigate(['auth', 'login']);
      return false;
    }

    return true;
  };
}
