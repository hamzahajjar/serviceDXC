import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTestSharedModule } from 'app/shared/shared.module';
import { DiagnosticComponent } from './diagnostic.component';
import { DiagnosticDetailComponent } from './diagnostic-detail.component';
import { DiagnosticUpdateComponent } from './diagnostic-update.component';
import { DiagnosticDeleteDialogComponent } from './diagnostic-delete-dialog.component';
import { diagnosticRoute } from './diagnostic.route';

@NgModule({
  imports: [UserTestSharedModule, RouterModule.forChild(diagnosticRoute)],
  declarations: [DiagnosticComponent, DiagnosticDetailComponent, DiagnosticUpdateComponent, DiagnosticDeleteDialogComponent],
  entryComponents: [DiagnosticDeleteDialogComponent],
})
export class UserTestDiagnosticModule {}
