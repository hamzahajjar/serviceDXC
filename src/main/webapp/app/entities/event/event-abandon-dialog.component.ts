import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvent } from 'app/shared/model/event.model';
import { EventService } from './event.service';

@Component({
  templateUrl: './event-abandon-dialog.component.html',
})
export class EventAbandonDialogComponent {
  event?: IEvent;

  constructor(protected eventService: EventService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmAbandon(id: number): void {
    this.eventService.abandonEvent(id).subscribe(() => {
      this.eventManager.broadcast('eventListModification');
      this.activeModal.close();
    });
  }
}
