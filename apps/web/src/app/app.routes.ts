import { Route } from '@angular/router';
import { provideAuth } from '@web/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    providers: [provideAuth()],
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
