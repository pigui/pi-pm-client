import { NgModule } from '@angular/core';
import { HomeRepository } from '../../application/ports/home.repository';
import { HomeRepositoryImpl } from './repositories/home.repository';

@NgModule({
  providers: [
    {
      provide: HomeRepository,
      useClass: HomeRepositoryImpl,
    },
  ],
})
export class ApiInfraestructureModule {}
