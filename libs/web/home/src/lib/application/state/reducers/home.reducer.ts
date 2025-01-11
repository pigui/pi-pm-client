import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '@web/projects';
import { HomeActions } from '../actions/home.actions';

export interface ProjectState extends EntityState<Project> {
  isLoading: boolean;
}

export interface State {
  projects: ProjectState;
}

export const projectAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({});

export const initialState: State = {
  projects: projectAdapter.getInitialState({ isLoading: false }),
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(HomeActions.getProjects, (state) => {
      return {
        ...state,
        projects: projectAdapter.removeAll({
          ...state.projects,
          isLoading: true,
        }),
      };
    }),
    on(HomeActions.getProjectsSuccess, (state, action) => {
      return {
        ...state,
        projects: projectAdapter.addMany(action.payload, {
          ...state.projects,
          isLoading: false,
        }),
      };
    }),
    on(HomeActions.getProjectsFailure, (state) => {
      return {
        ...state,
        projects: projectAdapter.removeAll({
          ...state.projects,
          isLoading: false,
        }),
      };
    })
  ),
});
