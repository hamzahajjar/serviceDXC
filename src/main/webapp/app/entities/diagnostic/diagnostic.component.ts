import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiagnostic } from 'app/shared/model/diagnostic.model';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosticDeleteDialogComponent } from './diagnostic-delete-dialog.component';

@Component({
  selector: 'jhi-diagnostic',
  templateUrl: './diagnostic.component.html',
})
export class DiagnosticComponent implements OnInit, OnDestroy {
  diagnostics?: IDiagnostic[];
  eventSubscriber?: Subscription;

  constructor(protected diagnosticService: DiagnosticService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.diagnosticService.query().subscribe((res: HttpResponse<IDiagnostic[]>) => (this.diagnostics = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiagnostics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiagnostic): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiagnostics(): void {
    this.eventSubscriber = this.eventManager.subscribe('diagnosticListModification', () => this.loadAll());
  }

  delete(diagnostic: IDiagnostic): void {
    const modalRef = this.modalService.open(DiagnosticDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diagnostic = diagnostic;
  }
}
