import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISociety } from 'app/shared/model/society.model';
import { SocietyService } from './society.service';
import { SocietyDeleteDialogComponent } from './society-delete-dialog.component';

@Component({
  selector: 'jhi-society',
  templateUrl: './society.component.html',
})
export class SocietyComponent implements OnInit, OnDestroy {
  societies?: ISociety[];
  eventSubscriber?: Subscription;

  constructor(protected societyService: SocietyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.societyService.query().subscribe((res: HttpResponse<ISociety[]>) => (this.societies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSocieties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISociety): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSocieties(): void {
    this.eventSubscriber = this.eventManager.subscribe('societyListModification', () => this.loadAll());
  }

  delete(society: ISociety): void {
    const modalRef = this.modalService.open(SocietyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.society = society;
  }
}
