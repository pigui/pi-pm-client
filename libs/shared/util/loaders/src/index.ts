import { importProvidersFrom } from '@angular/core';
import { LoadersModule } from './lib/application/loaders.module';

export * from './lib/application/loaders.facade';
export * from './lib/application/state/actions/loaders.actions';
export function provideLoaders() {
  return importProvidersFrom([LoadersModule]);
}
