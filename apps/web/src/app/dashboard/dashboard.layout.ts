import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { AuthFacade, User } from '@web/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.layout.html',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardNavbarComponent,
    DashboardShellComponent,
    DashboardMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardLayout {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<User> = this.authFacade.user;

  doLogout(): void {
    this.authFacade.doLogout();
  }
}
