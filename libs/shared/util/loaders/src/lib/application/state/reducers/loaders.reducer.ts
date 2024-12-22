import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadersActions } from '../actions/loaders.actions';

interface State {
  onGoingAction: Array<string>;
}

export const initialState: State = {
  onGoingAction: [],
};

export const loadersFeature = createFeature({
  name: 'loaders',
  reducer: createReducer(
    initialState,
    on(LoadersActions.startAction, (state, action) => {
      return {
        ...state,
        onGoingAction: [...state.onGoingAction, action.payload],
      };
    }),
    on(LoadersActions.stopAction, (state, action) => {
      const onGoingAction = state.onGoingAction.filter(
        (currentActions) => currentActions !== action.payload
      );
      return { ...state, onGoingAction };
    })
  ),
});
