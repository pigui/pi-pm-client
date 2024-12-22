import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../ports/auth.repository';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.actions';
import { exhaustMap, map, catchError, of, EMPTY, finalize } from 'rxjs';
import { Auth } from '../../../domain/auth';
import { Router } from '@angular/router';
import { LoadersActions } from '@web/shared/util/loaders';
import { Store } from '@ngrx/store';

export const START_LOADER_ACTIONS = [
  AuthActions.registerWithPassword,
  AuthActions.loginWithPassword,
];

export const SUCCESS_ACTIONS = [
  AuthActions.registerWithPasswordSuccess,
  AuthActions.loginWithPasswordSuccess,
];

@Injectable()
export class AuthEffects {
  private readonly authRepository = inject(AuthRepository);
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  loginWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithPassword),
      exhaustMap((action) => {
        const { payload } = action;
        return this.authRepository
          .loginWithPassword(payload.email, payload.email)
          .pipe(
            map((response: Auth) =>
              AuthActions.loginWithPasswordSuccess({ payload: response })
            ),
            catchError(() => of(AuthActions.loginWithPasswordFailure())),
            finalize(() =>
              this.store.dispatch(
                LoadersActions.stopAction({ payload: action.type })
              )
            )
          );
      })
    )
  );

  registerWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerWithPassword),
      exhaustMap((action) => {
        const { payload } = action;
        return this.authRepository
          .registerWithPassword(
            payload.email,
            payload.password,
            payload.firstName,
            payload.lastName
          )
          .pipe(
            map((response: Auth) =>
              AuthActions.registerWithPasswordSuccess({ payload: response })
            ),
            catchError(() => of(AuthActions.registerWithPasswordFailure())),
            finalize(() =>
              this.store.dispatch(
                LoadersActions.stopAction({ payload: action.type })
              )
            )
          );
      })
    )
  );

  loggedSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...SUCCESS_ACTIONS),
        map(() => {
          this.router.navigate(['home']);
        })
      ),
    { dispatch: false }
  );

  handleStartLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...START_LOADER_ACTIONS),
      map((action) => LoadersActions.startAction({ payload: action.type }))
    )
  );
}
