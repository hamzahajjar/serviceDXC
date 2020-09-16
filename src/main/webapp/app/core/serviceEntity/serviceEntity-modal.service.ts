import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IServiceEntity } from 'app/shared/model/service-entity.model';
import { ISociety } from 'app/shared/model/society.model';

import { ServiceEntityModalComponent } from '../serviceEntity/serviceEntityModal.component';

@Injectable({ providedIn: 'root' })
export class ServiceEntityModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(serviceEntity:IServiceEntity): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(ServiceEntityModalComponent);
    modalRef.componentInstance.serviceEntityForm.value=serviceEntity;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
