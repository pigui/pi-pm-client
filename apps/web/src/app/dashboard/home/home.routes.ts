import { Route } from '@angular/router';

export const homeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./views/home.view'),
  },
];

export default homeRoutes;
