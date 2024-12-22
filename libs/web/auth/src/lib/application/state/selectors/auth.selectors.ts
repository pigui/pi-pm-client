import { createSelector } from '@ngrx/store';
import { authFeature } from '../reducers/auth.reducer';

export const selectUser = createSelector(
  authFeature.selectUser,
  (state) => state
);

export const selectAccessToken = createSelector(
  authFeature.selectRefreshToken,
  (state) => state
);

export const selectRefreshToken = createSelector(
  authFeature.selectRefreshToken,
  (state) => state
);

export const selectIsLoading = createSelector(
  authFeature.selectIsLoading,
  (state) => state
);

export const isLogged = createSelector(
  authFeature.selectUser,
  authFeature.selectAccessToken,
  (user, accessToken) => !!user && !!accessToken
);
