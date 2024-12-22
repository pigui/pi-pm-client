import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Auth } from '../../../domain/auth';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    loginWithPassword: props<{
      payload: { email: string; password: string };
    }>(),
    loginWithPasswordSuccess: props<{ payload: Auth }>(),
    loginWithPasswordFailure: emptyProps(),
    registerWithPassword: props<{
      payload: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      };
    }>(),
    registerWithPasswordSuccess: props<{ payload: Auth }>(),
    registerWithPasswordFailure: emptyProps(),
  },
});
