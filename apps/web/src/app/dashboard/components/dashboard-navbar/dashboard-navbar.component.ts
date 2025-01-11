import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '@web/auth';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: 'dashboard-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [TranslatePipe, ButtonModule, TitleCasePipe],
})
export class DashboardNavbarComponent {
  readonly user = input.required<User>();
  readonly fullName = computed(
    () => `${this.user()?.firstName} ${this.user()?.lastName}`
  );
  readonly logout = output();
}
