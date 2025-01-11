import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProjectSelectors from './state/selectors/projects.selectors';
import { Project } from '@web/projects';
import { HomeActions } from './state/actions/home.actions';

@Injectable()
export class HomeFacade {
  private readonly store = inject(Store);

  readonly projects: Signal<Array<Project>> = this.store.selectSignal(
    ProjectSelectors.selectAll
  );

  readonly projectsIsLoading = this.store.selectSignal(
    ProjectSelectors.selectIsLoading
  );

  loadProjects(): void {
    this.store.dispatch(HomeActions.getProjects());
  }
}
