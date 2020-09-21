import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiagnostic } from 'app/shared/model/diagnostic.model';
import { DiagnosticService } from './diagnostic.service';

@Component({
  templateUrl: './diagnostic-delete-dialog.component.html',
})
export class DiagnosticDeleteDialogComponent {
  diagnostic?: IDiagnostic;

  constructor(
    protected diagnosticService: DiagnosticService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diagnosticService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diagnosticListModification');
      this.activeModal.close();
    });
  }
}
