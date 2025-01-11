import { importProvidersFrom } from '@angular/core';
import { HomeModule } from './lib/application/home.module';

export * from './lib/application/home.facade';

export function provideHome() {
  return importProvidersFrom(HomeModule);
}
