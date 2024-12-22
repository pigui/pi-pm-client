import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthFacade } from './auth.facade';
import { AuthInfraestructureModule } from '../infraestructure/auth-infraestructure.module';
import { AuthStateModule } from './state/auth-state.module';

@NgModule({
  imports: [AuthInfraestructureModule, AuthStateModule],
  providers: [AuthService, AuthFacade],
})
export class AuthModule {}
