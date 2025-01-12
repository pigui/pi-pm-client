import { NgModule } from '@angular/core';
import { AuthRepository } from '../../application/ports/auth.repository';
import { AuthRepositoryImpl } from './repositories/auth.respository';

@NgModule({
  providers: [{ provide: AuthRepository, useClass: AuthRepositoryImpl }],
})
export class ApiInfraestructureModule {}
