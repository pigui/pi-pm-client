import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-shell',
  templateUrl: 'dashboard-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class DashboardShellComponent {
  readonly headerTemplate =
    contentChild.required<TemplateRef<any>>('headerTemplate');
  readonly menuTemplate =
    contentChild.required<TemplateRef<any>>('menuTemplate');

  readonly contentTemplate =
    contentChild.required<TemplateRef<any>>('contentTemplate');
}
