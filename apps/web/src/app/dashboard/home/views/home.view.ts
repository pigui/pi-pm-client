import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { HomeFacade } from '@web/home';
import { Project } from '@web/projects';
import { HomeProjectsComponent } from '../sections/projects/home-projects.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeProjectsComponent],
})
export default class HomeView {
  private readonly homeFacade = inject(HomeFacade);
  readonly projects: Signal<Array<Project>> = this.homeFacade.projects;
  readonly projectsIsLoading: Signal<boolean> =
    this.homeFacade.projectsIsLoading;
  readonly projectsLoaded = computed(() => {
    return !!this.projects()?.length && !this.projectsIsLoading();
  });

  constructor() {
    this.homeFacade.loadProjects();
  }

  createProject(): void {}
}
