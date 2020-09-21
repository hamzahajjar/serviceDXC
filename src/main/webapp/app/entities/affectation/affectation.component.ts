import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAffectation } from 'app/shared/model/affectation.model';
import { AffectationService } from './affectation.service';
import { AffectationDeleteDialogComponent } from './affectation-delete-dialog.component';

@Component({
  selector: 'jhi-affectation',
  templateUrl: './affectation.component.html',
})
export class AffectationComponent implements OnInit, OnDestroy {
  affectations?: IAffectation[];
  eventSubscriber?: Subscription;

  constructor(
    protected affectationService: AffectationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.affectationService.query().subscribe((res: HttpResponse<IAffectation[]>) => (this.affectations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAffectations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  validateAffectation(id:number):void{
    this.affectationService.validateAffectation(id).subscribe();
    window.location.reload();

  }

  trackId(index: number, item: IAffectation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAffectations(): void {
    this.eventSubscriber = this.eventManager.subscribe('affectationListModification', () => this.loadAll());
  }

  delete(affectation: IAffectation): void {
    const modalRef = this.modalService.open(AffectationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.affectation = affectation;
  }
}
