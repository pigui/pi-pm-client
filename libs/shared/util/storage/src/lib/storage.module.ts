import { NgModule } from '@angular/core';
import { LocalStorageModule } from './localstorage/localstorage.module';

@NgModule({
  imports: [LocalStorageModule],
  exports: [LocalStorageModule],
})
export class StorageModule {}
