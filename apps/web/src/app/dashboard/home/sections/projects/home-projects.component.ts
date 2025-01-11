import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Project } from '@web/projects';
import { HomeProjectCardComponent } from './home-project-card/home-project-card.component';
import { HomeProjectsEmptyComponent } from './home-projects-empty/home-projects-empty.component';

@Component({
  selector: 'app-home-projects',
  templateUrl: 'home-projects.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HomeProjectCardComponent, HomeProjectsEmptyComponent],
})
export class HomeProjectsComponent {
  readonly projects = input.required<Array<Project>>();
  readonly createProject = output<void>();
}
