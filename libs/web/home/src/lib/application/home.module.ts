import { NgModule } from '@angular/core';
import { HomeInfraestructureModule } from '../infraestructure/home-infraestructure.module';
import { HomeStateModule } from './state/home-state.module';
import { HomeFacade } from './home.facade';

@NgModule({
  imports: [HomeInfraestructureModule, HomeStateModule],
  providers: [HomeFacade],
})
export class HomeModule {}
