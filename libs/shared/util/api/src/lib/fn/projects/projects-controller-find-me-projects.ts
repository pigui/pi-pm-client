/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProjectDto } from '../../models/project-dto';

export interface ProjectsControllerFindMeProjects$Params {
}

export function projectsControllerFindMeProjects(http: HttpClient, rootUrl: string, params?: ProjectsControllerFindMeProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProjectDto>>> {
  const rb = new RequestBuilder(rootUrl, projectsControllerFindMeProjects.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProjectDto>>;
    })
  );
}

projectsControllerFindMeProjects.PATH = '/projects/me';
