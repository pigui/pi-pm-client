import { createSelector } from '@ngrx/store';
import { loadersFeature } from '../reducers/loaders.reducer';

export const selectOnGoingAction = createSelector(
  loadersFeature.selectOnGoingAction,
  (state) => state
);
