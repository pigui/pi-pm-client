import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { homeFeature } from './reducers/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './effects/home.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeStateModule {}
