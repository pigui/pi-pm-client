/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { UserDto } from '../models/user-dto';
import { usersControllerCreateUserWithPassword } from '../fn/users/users-controller-create-user-with-password';
import { UsersControllerCreateUserWithPassword$Params } from '../fn/users/users-controller-create-user-with-password';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `usersControllerCreateUserWithPassword()` */
  static readonly UsersControllerCreateUserWithPasswordPath = '/users/with-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerCreateUserWithPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreateUserWithPassword$Response(params: UsersControllerCreateUserWithPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return usersControllerCreateUserWithPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersControllerCreateUserWithPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreateUserWithPassword(params: UsersControllerCreateUserWithPassword$Params, context?: HttpContext): Observable<UserDto> {
    return this.usersControllerCreateUserWithPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

}