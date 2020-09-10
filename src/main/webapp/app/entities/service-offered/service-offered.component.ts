import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceOffered } from 'app/shared/model/service-offered.model';
import { ServiceOfferedService } from './service-offered.service';
import { ServiceOfferedDeleteDialogComponent } from './service-offered-delete-dialog.component';

@Component({
  selector: 'jhi-service-offered',
  templateUrl: './service-offered.component.html',
})
export class ServiceOfferedComponent implements OnInit, OnDestroy {
  serviceOffereds?: IServiceOffered[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceOfferedService: ServiceOfferedService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceOfferedService.query().subscribe((res: HttpResponse<IServiceOffered[]>) => (this.serviceOffereds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceOffereds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceOffered): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceOffereds(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceOfferedListModification', () => this.loadAll());
  }

  delete(serviceOffered: IServiceOffered): void {
    const modalRef = this.modalService.open(ServiceOfferedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceOffered = serviceOffered;
  }
}
