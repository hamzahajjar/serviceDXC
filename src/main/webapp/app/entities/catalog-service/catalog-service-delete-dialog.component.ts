import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICatalogService } from 'app/shared/model/catalog-service.model';
import { CatalogServiceService } from './catalog-service.service';

@Component({
  templateUrl: './catalog-service-delete-dialog.component.html',
})
export class CatalogServiceDeleteDialogComponent {
  catalogService?: ICatalogService;

  constructor(
    protected catalogServiceService: CatalogServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.catalogServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('catalogServiceListModification');
      this.activeModal.close();
    });
  }
}
