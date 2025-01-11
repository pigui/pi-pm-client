import { createSelector } from '@ngrx/store';
import { homeFeature } from '../reducers/home.reducer';

export const selectProject = createSelector(
  homeFeature.selectHomeState,
  (state) => state.projects
);
