import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { ENVIRONMENT } from './tokens/environment.token';
import { Environment } from './base.environment';

@Injectable()
export class EnvironmentService {
  private readonly environment: Signal<Environment> = signal(
    inject(ENVIRONMENT)
  ).asReadonly();

  apiUrl = computed(() => this.environment().apiUrl);
  isProduction = computed(() => this.environment().isProduction);
}
