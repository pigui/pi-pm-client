import { createSelector } from '@ngrx/store';
import { projectAdapter } from '../reducers/home.reducer';
import { selectProject } from './home.selectors';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  projectAdapter.getSelectors(selectProject);

export const selectIsLoading = createSelector(
  selectProject,
  (state) => state.isLoading
);
