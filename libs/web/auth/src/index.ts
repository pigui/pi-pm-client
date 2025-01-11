import { importProvidersFrom } from '@angular/core';
import { AuthModule } from './lib/application/auth.module';

// Interceptors
export * from './lib/interceptors/access-token.interceptor';

// Effects
export * from './lib/application/state/effects/auth.effects';

// Domain
export * from './lib/domain/auth';
export * from './lib/domain/user';
export * from './lib/domain/value-objects/user-role';
export * from './lib/domain/value-objects/user-status';

export * from './lib/application/auth.facade';
export function provideAuth() {
  return importProvidersFrom(AuthModule);
}
