import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { ServiceOfferedComponent } from './service-offered.component';
import { ServiceOfferedDetailComponent } from './service-offered-detail.component';
import { ServiceOfferedUpdateComponent } from './service-offered-update.component';
import { ServiceOfferedDeleteDialogComponent } from './service-offered-delete-dialog.component';
import { serviceOfferedRoute } from './service-offered.route';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(serviceOfferedRoute)],
  declarations: [
    ServiceOfferedComponent,
    ServiceOfferedDetailComponent,
    ServiceOfferedUpdateComponent,
    ServiceOfferedDeleteDialogComponent,
  ],
  entryComponents: [ServiceOfferedDeleteDialogComponent],
})
export class UserTestServiceOfferedModule {}
