import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from '@web/projects';

export const HomeActions = createActionGroup({
  source: 'Auth',
  events: {
    getProjects: emptyProps(),
    getProjectsSuccess: props<{ payload: Array<Project> }>(),
    getProjectsFailure: emptyProps(),
  },
});
