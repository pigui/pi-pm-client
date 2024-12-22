import { User } from '../../../domain/user';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

interface State {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.loginWithPassword, (state) => {
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: true,
      };
    }),
    on(AuthActions.loginWithPasswordSuccess, (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    }),
    on(AuthActions.loginWithPasswordFailure, (state) => {
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
      };
    }),
    on(AuthActions.registerWithPassword, (state) => {
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: true,
      };
    }),
    on(AuthActions.registerWithPasswordSuccess, (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    }),
    on(AuthActions.registerWithPasswordFailure, (state) => {
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
      };
    })
  ),
});
