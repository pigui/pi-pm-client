import { NgModule } from '@angular/core';
import { ENVIRONMENT } from './tokens/environment.token';
import environment from './environment';
import { EnvironmentService } from './environment.service';

@NgModule({
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    EnvironmentService,
  ],
})
export class EnvironmentModule {}
