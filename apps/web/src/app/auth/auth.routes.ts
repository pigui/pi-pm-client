import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./auth.layout'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/views/login.view'),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/views/register.view'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

export default authRoutes;
