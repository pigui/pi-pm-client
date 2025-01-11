import { importProvidersFrom } from '@angular/core';
import { StorageModule } from './lib/storage.module';

export * from './lib/storage.module';
export * from './lib/storage.service';

export function provideStorage() {
  return importProvidersFrom(StorageModule);
}
