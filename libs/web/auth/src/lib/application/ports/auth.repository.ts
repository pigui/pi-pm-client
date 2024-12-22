import { Observable } from 'rxjs';
import { Auth } from '../../domain/auth';

export abstract class AuthRepository {
  abstract loginWithPassword(email: string, password: string): Observable<Auth>;
  abstract registerWithPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<Auth>;
  abstract refreshToken(refreshToken: string): Observable<Auth>;
}
