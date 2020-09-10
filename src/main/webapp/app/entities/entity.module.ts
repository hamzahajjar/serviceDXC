import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.UserTestTeamModule),
      },
      {
        path: 'catalog-service',
        loadChildren: () => import('./catalog-service/catalog-service.module').then(m => m.UserTestCatalogServiceModule),
      },
      {
        path: 'society',
        loadChildren: () => import('./society/society.module').then(m => m.UserTestSocietyModule),
      },
      {
        path: 'service-entity',
        loadChildren: () => import('./service-entity/service-entity.module').then(m => m.UserTestServiceEntityModule),
      },
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then(m => m.UserTestEventModule),
      },
      {
        path: 'service-offered',
        loadChildren: () => import('./service-offered/service-offered.module').then(m => m.UserTestServiceOfferedModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UserTestEntityModule {}
