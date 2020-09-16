import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceEntity } from 'app/shared/model/service-entity.model';
import { ServiceEntityService } from './service-entity.service';
import { ServiceEntityDeleteDialogComponent } from './service-entity-delete-dialog.component';
import { map } from 'rxjs/operators';
import { ISociety } from 'app/shared/model/society.model';

@Component({
  selector: 'jhi-service-entity',
  templateUrl: './service-entity.component.html',
})
export class ServiceEntityComponent implements OnInit, OnDestroy {
  serviceEntities?: IServiceEntity[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceEntityService: ServiceEntityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceEntityService.query().subscribe((res: HttpResponse<IServiceEntity[]>) => {
      this.serviceEntities = res.body || [];
      this.serviceEntities.forEach(serviceEntity => {
        if(serviceEntity.id)
        {
          this.serviceEntityService.getServiceEntitySociety(serviceEntity.id).pipe(
            map((resSociety:HttpResponse<ISociety>) =>{
              (resSociety.body)? serviceEntity.society=resSociety.body : null;
            })
          ).subscribe();
        }
        
        
      });
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceEntities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceEntity): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceEntities(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceEntityListModification', () => this.loadAll());
  }

  delete(serviceEntity: IServiceEntity): void {
    const modalRef = this.modalService.open(ServiceEntityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceEntity = serviceEntity;
  }
}
