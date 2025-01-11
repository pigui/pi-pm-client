import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AuthFacade } from '@web/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: () => {
      const authFacade = inject(AuthFacade);
      return authFacade.isLogged ? 'home' : 'auth';
    },
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.routes'),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
      },
    ],
  },
];
