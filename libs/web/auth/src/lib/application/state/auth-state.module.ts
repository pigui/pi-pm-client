import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStateModule {}
