import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: 'dashboard-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  host: {
    '[class]': 'className()',
  },
})
export class DashboardMenuComponent {
  readonly className = signal('w-64 h-full min-h-full max-w-64 bg-slate-700');
  readonly startMenuTemplate =
    contentChild<TemplateRef<any>>('startMenuTemplate');
}
