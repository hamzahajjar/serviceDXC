import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from 'app/shared/model/event.model';

import { AffectationModalComponent } from './AffectationModal.component';

@Injectable({ providedIn: 'root' })
export class AffectationModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(event:IEvent): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(AffectationModalComponent);
    modalRef.componentInstance.affectationForm.get(['event']).value=event;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
