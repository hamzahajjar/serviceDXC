import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISociety } from 'app/shared/model/society.model';
import { SocietyService } from './society.service';

@Component({
  templateUrl: './society-delete-dialog.component.html',
})
export class SocietyDeleteDialogComponent {
  society?: ISociety;

  constructor(protected societyService: SocietyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.societyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('societyListModification');
      this.activeModal.close();
    });
  }
}
