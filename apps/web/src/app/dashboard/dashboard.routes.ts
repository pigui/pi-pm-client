import { Route } from '@angular/router';
import { dashboardGuard } from './guards/dashboard.guard';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    canActivate: [dashboardGuard()],
    loadComponent: () => import('./dashboard.layout'),
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes'),
      },
    ],
  },
];

export default dashboardRoutes;
