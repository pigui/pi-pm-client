import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-projects-empty',
  templateUrl: 'home-projects-empty.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ButtonModule, CardModule],
  host: {
    class: 'w-full',
  },
})
export class HomeProjectsEmptyComponent {
  readonly createProject = output<void>();
}
