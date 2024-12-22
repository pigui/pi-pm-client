import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOnGoingAction } from './state/selectors/loaders.selectors';

@Injectable()
export class LoadersFacade {
  private readonly store = inject(Store);
  readonly onGoingAction: Signal<Array<string>> =
    this.store.selectSignal(selectOnGoingAction);
}
