import { importProvidersFrom } from '@angular/core';
import { AuthModule } from './lib/application/auth.module';

export * from './lib/application/auth.facade';
export function provideAuth() {
  return importProvidersFrom(AuthModule);
}
