import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventUpdateComponent } from './event-update.component';
import { EventAbandonDialogComponent } from './event-abandon-dialog.component';
import { eventRoute } from './event.route';
import { AffectationModalComponent } from 'app/core/affectationModal/AffectationModal.component';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(eventRoute)],
  declarations: [EventComponent, EventDetailComponent, EventUpdateComponent, EventAbandonDialogComponent,AffectationModalComponent],
  entryComponents: [EventAbandonDialogComponent,AffectationModalComponent],
})
export class UserTestEventModule {}
