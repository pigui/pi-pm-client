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

import { ProjectDto } from '../models/project-dto';
import { projectsControllerCreate } from '../fn/projects/projects-controller-create';
import { ProjectsControllerCreate$Params } from '../fn/projects/projects-controller-create';
import { projectsControllerFindMeProjects } from '../fn/projects/projects-controller-find-me-projects';
import { ProjectsControllerFindMeProjects$Params } from '../fn/projects/projects-controller-find-me-projects';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `projectsControllerCreate()` */
  static readonly ProjectsControllerCreatePath = '/projects/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `projectsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  projectsControllerCreate$Response(params: ProjectsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
    return projectsControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `projectsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  projectsControllerCreate(params: ProjectsControllerCreate$Params, context?: HttpContext): Observable<ProjectDto> {
    return this.projectsControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectDto>): ProjectDto => r.body)
    );
  }

  /** Path part for operation `projectsControllerFindMeProjects()` */
  static readonly ProjectsControllerFindMeProjectsPath = '/projects/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `projectsControllerFindMeProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectsControllerFindMeProjects$Response(params?: ProjectsControllerFindMeProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProjectDto>>> {
    return projectsControllerFindMeProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `projectsControllerFindMeProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectsControllerFindMeProjects(params?: ProjectsControllerFindMeProjects$Params, context?: HttpContext): Observable<Array<ProjectDto>> {
    return this.projectsControllerFindMeProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProjectDto>>): Array<ProjectDto> => r.body)
    );
  }

}