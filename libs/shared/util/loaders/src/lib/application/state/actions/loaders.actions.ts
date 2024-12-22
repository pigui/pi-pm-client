import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LoadersActions = createActionGroup({
  source: 'Loaders',
  events: {
    startAction: props<{ payload: string }>(),
    stopAction: props<{ payload: string }>(),
  },
});
