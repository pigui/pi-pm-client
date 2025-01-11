import { InjectionToken } from '@angular/core';
import * as CryptoJS from 'crypto-js';

export const CRYPTO = new InjectionToken<typeof CryptoJS>('crypto');
export const SECRET = new InjectionToken<string>('secret');
