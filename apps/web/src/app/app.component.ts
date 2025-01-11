import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  Signal,
  ViewEncapsulation,
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import MyPreset from './theme';
import { FullSpinnerComponent } from '@web/ui/full-spinner';
import { LoadersFacade } from '@web/shared/util/loaders';
import { AuthFacade } from '@web/auth';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterModule, FullSpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  private readonly primeng: PrimeNG = inject(PrimeNG);
  private readonly loaderFacade: LoadersFacade = inject(LoadersFacade);
  private readonly authFacade: AuthFacade = inject(AuthFacade);
  private readonly platformId = inject(PLATFORM_ID);

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
    if (isPlatformBrowser(this.platformId)) {
      this.authFacade.checkLogged();
    }
  }
}
