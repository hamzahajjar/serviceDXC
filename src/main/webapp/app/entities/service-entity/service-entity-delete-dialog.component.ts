import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceEntity } from 'app/shared/model/service-entity.model';
import { ServiceEntityService } from './service-entity.service';

@Component({
  templateUrl: './service-entity-delete-dialog.component.html',
})
export class ServiceEntityDeleteDialogComponent {
  serviceEntity?: IServiceEntity;

  constructor(
    protected serviceEntityService: ServiceEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceEntityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceEntityListModification');
      this.activeModal.close();
    });
  }
}
