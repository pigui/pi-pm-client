import { inject, Injectable } from '@angular/core';
import { HomeRepository } from '../../../application/ports/home.repository';
import { Project, ProjectStatus } from '@web/projects';
import { concatMap, from, Observable, map, toArray } from 'rxjs';
import { ProjectDto, ProjectsService, UserDto } from '@web/shared/util/api';
import { User, UserRole, UserStatus } from '@web/auth';

@Injectable()
export class HomeRepositoryImpl implements HomeRepository {
  private readonly projectsService = inject(ProjectsService);
  getProducts(): Observable<Array<Project>> {
    return this.projectsService.projectsControllerFindMeProjects().pipe(
      concatMap((projects: Array<ProjectDto>) => {
        return from(projects).pipe(
          map((project: ProjectDto) => {
            const { status, owner, users } = project;
            return new Project(
              project.id,
              project.name,
              project.description,
              new ProjectStatus(status.value),
              new User(
                owner.id,
                owner.email,
                owner.firstName,
                owner.lastName,
                new UserRole(owner.role.value),
                new UserStatus(owner.status.value),
                new Date(owner.createdAt),
                new Date(owner.updatedAt)
              ),
              users.map((user: UserDto) => {
                return new User(
                  user.id,
                  user.email,
                  user.firstName,
                  user.lastName,
                  new UserRole(user.role.value),
                  new UserStatus(user.status.value),
                  new Date(user.createdAt),
                  new Date(user.updatedAt)
                );
              }),
              new Date(project.createdAt),
              new Date(project.updatedAt)
            );
          })
        );
      }),
      toArray()
    );
  }
}
