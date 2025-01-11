import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { iif, Observable } from 'rxjs';

import { AuthFacade } from '../application/auth.facade';

export function accessTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authFacade = inject(AuthFacade);
  const { url } = req;
  console.log({ url });
  const accessToken = authFacade.accessToken();
  return iif(
    () => !!accessToken,
    next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      })
    ),
    next(req)
  );
}
