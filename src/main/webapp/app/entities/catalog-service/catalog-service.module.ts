import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { CatalogServiceComponent } from './catalog-service.component';
import { CatalogServiceDetailComponent } from './catalog-service-detail.component';
import { CatalogServiceUpdateComponent } from './catalog-service-update.component';
import { CatalogServiceDeleteDialogComponent } from './catalog-service-delete-dialog.component';
import { catalogServiceRoute } from './catalog-service.route';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(catalogServiceRoute)],
  declarations: [
    CatalogServiceComponent,
    CatalogServiceDetailComponent,
    CatalogServiceUpdateComponent,
    CatalogServiceDeleteDialogComponent,
  ],
  entryComponents: [CatalogServiceDeleteDialogComponent],
})
export class UserTestCatalogServiceModule {}
