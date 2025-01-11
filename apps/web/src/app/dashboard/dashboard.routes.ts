import { Route } from '@angular/router';
import { dashboardGuard } from './guards/dashboard.guard';
import { provideHome } from '@web/home';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    canActivate: [dashboardGuard()],
    loadComponent: () => import('./dashboard.layout'),
    children: [
      {
        providers: [provideHome()],
        path: 'home',
        loadChildren: () => import('./home/home.routes'),
      },
    ],
  },
];

export default dashboardRoutes;
