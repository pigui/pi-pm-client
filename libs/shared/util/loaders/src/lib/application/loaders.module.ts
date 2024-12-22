import { NgModule } from '@angular/core';
import { LoadersFacade } from './loaders.facade';
import { LoadersStateModule } from './state/loaders-state.module';

@NgModule({
  imports: [LoadersStateModule],
  providers: [LoadersFacade],
})
export class LoadersModule {}
