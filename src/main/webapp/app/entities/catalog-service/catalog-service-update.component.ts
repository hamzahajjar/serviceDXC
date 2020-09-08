import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICatalogService, CatalogService } from 'app/shared/model/catalog-service.model';
import { CatalogServiceService } from './catalog-service.service';

@Component({
  selector: 'jhi-catalog-service-update',
  templateUrl: './catalog-service-update.component.html',
})
export class CatalogServiceUpdateComponent implements OnInit {
  isSaving = false;
  catalogServiceValues!:ICatalogService;

  editForm = this.fb.group({
    id: [],
    user:[],
    sla: [],
  });

  constructor(protected catalogServiceService: CatalogServiceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.catalogServiceValues=this.editForm.value;
    this.activatedRoute.data.subscribe(({ catalogService }) => {
      this.updateForm(catalogService);
    });
  }

  updateForm(catalogService: ICatalogService): void {
    this.editForm.patchValue({
      id: catalogService.id,
      user:catalogService.user,
      sla: catalogService.sla,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const catalogService = this.createFromForm();
    if (catalogService.id !== undefined) {
      this.subscribeToSaveResponse(this.catalogServiceService.update(catalogService));
    } else {
      this.subscribeToSaveResponse(this.catalogServiceService.create(catalogService));
    }
  }

  private createFromForm(): ICatalogService {
    return {
      ...new CatalogService(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      sla: this.editForm.get(['sla'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICatalogService>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
