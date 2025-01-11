import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Project } from '@web/projects';

@Component({
  selector: 'app-home-project-card',
  templateUrl: 'home-project-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeProjectCardComponent {
  readonly project = input.required<Project>();
}
