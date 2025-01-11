import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../ports/auth.repository';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom, mapResponse } from '@ngrx/operators';
import { AuthActions } from '../actions/auth.actions';
import {
  exhaustMap,
  map,
  catchError,
  of,
  finalize,
  forkJoin,
  withLatestFrom,
  concatMap,
  Observable,
} from 'rxjs';
import { Auth } from '../../../domain/auth';
import { Router } from '@angular/router';
import { LoadersActions } from '@web/shared/util/loaders';
import { Store } from '@ngrx/store';
import { StorageService } from '@web/shared/util/storage';
import { selectRefreshToken } from '../selectors/auth.selectors';

export const START_LOADER_ACTIONS = [
  AuthActions.registerWithPassword,
  AuthActions.loginWithPassword,
  AuthActions.logout,
];

export const SUCCESS_ACTIONS = [
  AuthActions.registerWithPasswordSuccess,
  AuthActions.loginWithPasswordSuccess,
  AuthActions.checkLoggedSuccess,
];

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable()
export class AuthEffects {
  private readonly authRepository = inject(AuthRepository);
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly storageService = inject(StorageService);

  loginWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithPassword),
      exhaustMap((action) => {
        const { payload } = action;
        return this.authRepository
          .loginWithPassword(payload.email, payload.email)
          .pipe(
            exhaustMap((response: Auth) =>
              forkJoin([
                this.storageService.setStorage(
                  ACCESS_TOKEN_KEY,
                  response.accessToken
                ),
                this.storageService.setStorage(
                  REFRESH_TOKEN_KEY,
                  response.refreshToken
                ),
              ]).pipe(
                map(() =>
                  AuthActions.loginWithPasswordSuccess({ payload: response })
                )
              )
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
            exhaustMap((response: Auth) =>
              forkJoin([
                this.storageService.setStorage(
                  ACCESS_TOKEN_KEY,
                  response.accessToken
                ),
                this.storageService.setStorage(
                  REFRESH_TOKEN_KEY,
                  response.refreshToken
                ),
              ]).pipe(
                map(() =>
                  AuthActions.registerWithPasswordSuccess({ payload: response })
                )
              )
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap((action) =>
        of(AuthActions.logoutSuccess()).pipe(
          finalize(() =>
            this.store.dispatch(
              LoadersActions.stopAction({ payload: action.type })
            )
          )
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        exhaustMap(() =>
          this.deleteStorage().pipe(
            map(() => {
              this.router.navigate(['auth', 'login']);
            })
          )
        )
      ),
    { dispatch: false }
  );

  checkLogged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkLogged),
      withLatestFrom(
        this.storageService.get(ACCESS_TOKEN_KEY),
        this.storageService.get(REFRESH_TOKEN_KEY)
      ),
      map(([, accessToken, refreshToken]) => {
        if (accessToken && refreshToken) {
          return AuthActions.checkLoggedSuccess({
            payload: { accessToken, refreshToken },
          });
        }
        return AuthActions.checkLoggedFailure();
      })
    )
  );

  checkLoggedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkLoggedSuccess),
      concatLatestFrom(() => this.store.select(selectRefreshToken)),
      exhaustMap(([, refreshToken]) =>
        this.authRepository.refreshToken(refreshToken).pipe(
          exhaustMap((response: Auth) =>
            forkJoin([
              this.storageService.setStorage(
                ACCESS_TOKEN_KEY,
                response.accessToken
              ),
              this.storageService.setStorage(
                REFRESH_TOKEN_KEY,
                response.refreshToken
              ),
            ]).pipe(
              map(() =>
                AuthActions.registerWithPasswordSuccess({ payload: response })
              )
            )
          ),
          catchError(() =>
            this.deleteStorage().pipe(
              map(() => AuthActions.loginWithPasswordFailure())
            )
          )
        )
      )
    )
  );

  checkLoggedFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.checkLoggedFailure),
        exhaustMap(() => this.deleteStorage())
      ),
    { dispatch: false }
  );

  handleStartLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...START_LOADER_ACTIONS),
      map((action) => LoadersActions.startAction({ payload: action.type }))
    )
  );

  private deleteStorage(): Observable<void> {
    return this.storageService
      .delete(ACCESS_TOKEN_KEY)
      .pipe(concatMap(() => this.storageService.delete(REFRESH_TOKEN_KEY)));
  }
}
