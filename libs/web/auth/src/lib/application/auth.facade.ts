import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  isLogged,
  selectAccessToken,
  selectIsLoading,
  selectRefreshToken,
  selectUser,
} from './state/selectors/auth.selectors';
import { User } from '../domain/user';
import { AuthActions } from './state/actions/auth.actions';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  readonly user: Signal<User | null> = this.store.selectSignal(selectUser);
  readonly accessToken: Signal<string | null> =
    this.store.selectSignal(selectAccessToken);
  readonly refreshToken: Signal<string | null> =
    this.store.selectSignal(selectRefreshToken);

  readonly isLoading: Signal<boolean> =
    this.store.selectSignal(selectIsLoading);

  readonly isLogged: Signal<boolean> = this.store.selectSignal(isLogged);

  loginWithPassword(email: string, password: string): void {
    this.store.dispatch(
      AuthActions.loginWithPassword({ payload: { email, password } })
    );
  }

  registerWithPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): void {
    this.store.dispatch(
      AuthActions.registerWithPassword({
        payload: { email, password, firstName, lastName },
      })
    );
  }
}
