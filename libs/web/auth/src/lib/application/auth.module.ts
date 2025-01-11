import { NgModule } from '@angular/core';

import { AuthFacade } from './auth.facade';
import { AuthInfraestructureModule } from '../infraestructure/auth-infraestructure.module';
import { AuthStateModule } from './state/auth-state.module';

@NgModule({
  imports: [AuthInfraestructureModule, AuthStateModule],
  providers: [AuthFacade],
})
export class AuthModule {}
