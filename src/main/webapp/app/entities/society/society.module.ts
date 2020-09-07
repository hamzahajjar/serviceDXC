import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { SocietyComponent } from './society.component';
import { SocietyDetailComponent } from './society-detail.component';
import { SocietyUpdateComponent } from './society-update.component';
import { SocietyDeleteDialogComponent } from './society-delete-dialog.component';
import { societyRoute } from './society.route';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(societyRoute)],
  declarations: [SocietyComponent, SocietyDetailComponent, SocietyUpdateComponent, SocietyDeleteDialogComponent],
  entryComponents: [SocietyDeleteDialogComponent],
})
export class UserTestSocietyModule {}
