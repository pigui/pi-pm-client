import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loadersFeature } from './reducers/loaders.reducer';

@NgModule({
  imports: [StoreModule.forFeature(loadersFeature)],
})
export class LoadersStateModule {}
