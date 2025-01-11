import { NgModule } from '@angular/core';
import { StorageService } from '../storage.service';
import { LocalStorageService } from './localstorage.service';
import { CRYPTO, SECRET } from './keys/localstorage.config';
import * as CryptoJS from 'crypto-js';

@NgModule({
  providers: [
    { provide: StorageService, useClass: LocalStorageService },
    {
      provide: CRYPTO,
      useValue: CryptoJS,
    },
    {
      provide: SECRET,
      useValue: 'secret',
    },
  ],
})
export class LocalStorageModule {}
