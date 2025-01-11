import { Observable } from 'rxjs';

export abstract class StorageService {
  abstract setStorage<T = unknown>(key: string, value: T): Observable<void>;
  abstract clearStorage(): Observable<void>;
  abstract get(key: string): Observable<string>;
  abstract delete(key: string): Observable<void>;
}
