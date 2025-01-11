/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateProjectDto } from '../../models/create-project-dto';
import { ProjectDto } from '../../models/project-dto';

export interface ProjectsControllerCreate$Params {
      body: CreateProjectDto
}

export function projectsControllerCreate(http: HttpClient, rootUrl: string, params: ProjectsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
  const rb = new RequestBuilder(rootUrl, projectsControllerCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProjectDto>;
    })
  );
}

projectsControllerCreate.PATH = '/projects/create';