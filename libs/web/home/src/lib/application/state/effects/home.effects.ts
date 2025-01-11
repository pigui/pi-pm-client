import { inject, Injectable } from '@angular/core';
import { HomeRepository } from '../../ports/home.repository';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeActions } from '../actions/home.actions';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { Project } from '@web/projects';
import { LoadersActions } from '@web/shared/util/loaders';
import { Store } from '@ngrx/store';

export const START_LOADER_ACTIONS = [HomeActions.getProjects];

@Injectable()
export class HomeEffects {
  private readonly homeRepository = inject(HomeRepository);
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.getProjects),
      mergeMap((action) =>
        this.homeRepository.getProducts().pipe(
          map((response: Array<Project>) =>
            HomeActions.getProjectsSuccess({ payload: response ?? [] })
          ),
          catchError(() => of(HomeActions.getProjectsFailure())),
          finalize(() =>
            this.store.dispatch(
              LoadersActions.stopAction({ payload: action.type })
            )
          )
        )
      )
    )
  );

  handleStartLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...START_LOADER_ACTIONS),
      map((action) => LoadersActions.startAction({ payload: action.type }))
    )
  );
}
