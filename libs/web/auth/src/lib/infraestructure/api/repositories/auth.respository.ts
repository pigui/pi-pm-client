import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../../application/ports/auth.repository';
import { map, Observable } from 'rxjs';
import { Auth } from '../../../domain/auth';
import { AuthDto, AuthService } from '@web/shared/util/api';
import { User } from '../../../domain/user';
import { UserRole } from '../../../domain/value-objects/user-role';
import { UserStatus } from '../../../domain/value-objects/user-status';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  private readonly authService = inject(AuthService);

  loginWithPassword(email: string, password: string): Observable<Auth> {
    return this.authService
      .authControllerLoginWithPassword({ body: { email, password } })
      .pipe(
        map((authDto: AuthDto) => {
          const { user, accessToken, refreshToken } = authDto;
          return new Auth(
            new User(
              user.id,
              user.email,
              user.firstName,
              user.lastName,
              new UserRole(user.role.value as 'user' | 'admin'),
              new UserStatus(user.status.value as 'active' | 'blocked'),
              new Date(user.createdAt),
              new Date(user.updatedAt)
            ),
            accessToken,
            refreshToken
          );
        })
      );
  }
  registerWithPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<Auth> {
    return this.authService
      .authControllerRegisterWithPassword({
        body: {
          email,
          password,
          firstName,
          lastName,
        },
      })
      .pipe(
        map((authDto: AuthDto) => {
          const { user, accessToken, refreshToken } = authDto;
          return new Auth(
            new User(
              user.id,
              user.email,
              user.firstName,
              user.lastName,
              new UserRole(user.role.value as 'user' | 'admin'),
              new UserStatus(user.status.value as 'active' | 'blocked'),
              new Date(user.createdAt),
              new Date(user.updatedAt)
            ),
            accessToken,
            refreshToken
          );
        })
      );
  }

  refreshToken(refreshToken: string): Observable<Auth> {
    return this.authService
      .authControllerRefreshToken({
        body: { refreshToken },
      })
      .pipe(
        map((authDto: AuthDto) => {
          const { user, accessToken, refreshToken } = authDto;
          return new Auth(
            new User(
              user.id,
              user.email,
              user.firstName,
              user.lastName,
              new UserRole(user.role.value as 'user' | 'admin'),
              new UserStatus(user.status.value as 'active' | 'blocked'),
              new Date(user.createdAt),
              new Date(user.updatedAt)
            ),
            accessToken,
            refreshToken
          );
        })
      );
  }
}
