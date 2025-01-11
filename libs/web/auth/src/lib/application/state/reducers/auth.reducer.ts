import { User } from '../../../domain/user';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

interface State {
  user: User;
  accessToken: string;
  refreshToken: string;
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
      return { ...state, ...initialState, isLoading: true };
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
        ...initialState,
        isLoading: false,
      };
    }),
    on(AuthActions.registerWithPassword, (state) => {
      return {
        ...state,
        ...initialState,
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
        ...initialState,
        isLoading: false,
      };
    }),
    on(AuthActions.logout, (state) => {
      return { ...state, ...initialState, isLoading: true };
    }),
    on(AuthActions.logoutSuccess, (state) => {
      return { ...state, ...initialState };
    }),
    on(AuthActions.checkLogged, (state) => {
      return { ...state, ...initialState, isLoading: true };
    }),
    on(AuthActions.checkLoggedSuccess, (state, action) => {
      const { payload } = action;
      return {
        ...state,
        ...initialState,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        isLoading: false,
      };
    }),
    on(AuthActions.checkLoggedFailure, (state) => {
      return { ...state, ...initialState };
    })
  ),
});
