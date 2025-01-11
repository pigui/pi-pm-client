import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Auth } from '../../../domain/auth';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    checkLogged: emptyProps(),
    checkLoggedSuccess: props<{
      payload: { accessToken: string; refreshToken: string };
    }>(),
    checkLoggedFailure: emptyProps(),
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
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
  },
});
