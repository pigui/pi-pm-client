import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import MyPreset from './theme';
import { FullSpinnerComponent } from '@web/ui/full-spinner';
import { LoadersFacade } from '@web/shared/util/loaders';

@Component({
  imports: [RouterModule, FullSpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly primeng: PrimeNG = inject(PrimeNG);
  private readonly loaderFacade: LoadersFacade = inject(LoadersFacade);

  isLoading: Signal<boolean> = computed(
    () => !!this.loaderFacade.onGoingAction().length
  );
  constructor() {
    this.primeng.theme.set({
      preset: MyPreset,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
  }
}
