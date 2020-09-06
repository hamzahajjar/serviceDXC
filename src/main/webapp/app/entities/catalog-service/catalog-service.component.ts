import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICatalogService } from 'app/shared/model/catalog-service.model';
import { CatalogServiceService } from './catalog-service.service';
import { CatalogServiceDeleteDialogComponent } from './catalog-service-delete-dialog.component';

@Component({
  selector: 'jhi-catalog-service',
  templateUrl: './catalog-service.component.html',
})
export class CatalogServiceComponent implements OnInit, OnDestroy {
  catalogServices?: ICatalogService[];
  eventSubscriber?: Subscription;

  constructor(
    protected catalogServiceService: CatalogServiceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.catalogServiceService.query().subscribe((res: HttpResponse<ICatalogService[]>) => (this.catalogServices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCatalogServices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICatalogService): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCatalogServices(): void {
    this.eventSubscriber = this.eventManager.subscribe('catalogServiceListModification', () => this.loadAll());
  }

  delete(catalogService: ICatalogService): void {
    const modalRef = this.modalService.open(CatalogServiceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.catalogService = catalogService;
  }
}
