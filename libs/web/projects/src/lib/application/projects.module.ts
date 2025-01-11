import { NgModule } from '@angular/core';
import { ProjectsInfraestructureModule } from '../infraestructure/projects-infraestructure.module';
import { ProjectStateModule } from './state/project-state.module';
import { ProjectsFacade } from './projects.facade';

@NgModule({
  imports: [ProjectsInfraestructureModule, ProjectStateModule],
  providers: [ProjectsFacade],
})
export class ProjectsModule {}
