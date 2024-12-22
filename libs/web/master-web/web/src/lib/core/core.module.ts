import { NgModule } from '@angular/core';
import {
  EnvironmentModule,
  EnvironmentService,
} from '@web/shared/util/environment';
import { ApiConfiguration, ApiModule } from '@web/shared/util/api';

@NgModule({
  declarations: [],
  imports: [EnvironmentModule, ApiModule],
  providers: [
    {
      provide: ApiConfiguration,
      useFactory: (envService: EnvironmentService) => {
        const apiConfiguration = new ApiConfiguration();
        apiConfiguration.rootUrl = envService.apiUrl();
        return apiConfiguration;
      },
      deps: [EnvironmentService],
    },
  ],
})
export class CoreModule {}
