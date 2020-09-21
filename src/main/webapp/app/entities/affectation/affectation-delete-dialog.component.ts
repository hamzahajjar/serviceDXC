import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAffectation } from 'app/shared/model/affectation.model';
import { AffectationService } from './affectation.service';

@Component({
  templateUrl: './affectation-delete-dialog.component.html',
})
export class AffectationDeleteDialogComponent {
  affectation?: IAffectation;

  constructor(
    protected affectationService: AffectationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.affectationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('affectationListModification');
      this.activeModal.close();
    });
  }
}
