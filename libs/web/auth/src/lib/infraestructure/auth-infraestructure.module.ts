import { NgModule } from '@angular/core';
import { ApiInfraestructureModule } from './api/api-infraestructure.module';

@NgModule({
  imports: [ApiInfraestructureModule],
  exports: [ApiInfraestructureModule],
})
export class AuthInfraestructureModule {}
