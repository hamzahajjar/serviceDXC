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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UserTestEntityModule {}
