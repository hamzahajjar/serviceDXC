import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceOffered } from 'app/shared/model/service-offered.model';
import { ServiceOfferedService } from './service-offered.service';

@Component({
  templateUrl: './service-offered-delete-dialog.component.html',
})
export class ServiceOfferedDeleteDialogComponent {
  serviceOffered?: IServiceOffered;

  constructor(
    protected serviceOfferedService: ServiceOfferedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceOfferedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceOfferedListModification');
      this.activeModal.close();
    });
  }
}
