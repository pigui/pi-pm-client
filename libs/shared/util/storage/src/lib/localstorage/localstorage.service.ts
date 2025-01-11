import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageService } from '../storage.service';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  Subscriber,
} from 'rxjs';
import { CRYPTO, SECRET } from './keys/localstorage.config';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly crypto = inject(CRYPTO);
  private readonly secret = inject(SECRET);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storeSource = new BehaviorSubject<Record<string, string>>(
    {}
  );
  readonly store$ = this.storeSource.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initData();
    }
  }
  setStorage<T = unknown>(key: string, value: T): Observable<void> {
    return new Observable<void>((subscribe: Subscriber<void>) => {
      const encrypted = this.crypto.AES.encrypt(
        value.toString(),
        this.secret
      ).toString();
      localStorage.setItem(key, encrypted);
      this.storeSource.next({
        ...this.storeSource.value,
        [key]: value.toString(),
      });
      subscribe.next();
      subscribe.complete();
    });
  }
  clearStorage(): Observable<void> {
    return new Observable<void>((subscribe: Subscriber<void>) => {
      localStorage.clear();
      this.storeSource.next({});
      subscribe.next();
      subscribe.complete();
    });
  }
  get(key: string): Observable<string> {
    return this.store$.pipe(
      map((store) => {
        return store[key];
      }),
      catchError(() => EMPTY)
    );
  }

  delete(key: string): Observable<void> {
    return new Observable<void>((subscribe) => {
      localStorage.removeItem(key);
      this.storeSource.next({ ...this.storeSource.value, [key]: undefined });
      subscribe.next();
      subscribe.complete();
    });
  }

  private initData(): void {
    for (let idx = 0; idx < localStorage.length; idx++) {
      const key = localStorage.key(idx);
      this.storeSource.next({
        ...this.storeSource.value,
        [key]: this.crypto.AES.decrypt(
          localStorage.getItem(key),
          this.secret
        ).toString(CryptoJS.enc.Utf8),
      });
    }
  }
}
