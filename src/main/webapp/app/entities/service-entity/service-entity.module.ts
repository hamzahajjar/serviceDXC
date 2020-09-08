import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { ServiceEntityComponent } from './service-entity.component';
import { ServiceEntityDetailComponent } from './service-entity-detail.component';
import { ServiceEntityUpdateComponent } from './service-entity-update.component';
import { ServiceEntityDeleteDialogComponent } from './service-entity-delete-dialog.component';
import { serviceEntityRoute } from './service-entity.route';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(serviceEntityRoute)],
  declarations: [ServiceEntityComponent, ServiceEntityDetailComponent, ServiceEntityUpdateComponent, ServiceEntityDeleteDialogComponent],
  entryComponents: [ServiceEntityDeleteDialogComponent],
})
export class UserTestServiceEntityModule {}
