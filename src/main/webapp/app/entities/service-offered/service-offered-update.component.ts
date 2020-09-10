import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServiceOffered, ServiceOffered } from 'app/shared/model/service-offered.model';
import { ServiceOfferedService } from './service-offered.service';

@Component({
  selector: 'jhi-service-offered-update',
  templateUrl: './service-offered-update.component.html',
})
export class ServiceOfferedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected serviceOfferedService: ServiceOfferedService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceOffered }) => {
      this.updateForm(serviceOffered);
    });
  }

  updateForm(serviceOffered: IServiceOffered): void {
    this.editForm.patchValue({
      id: serviceOffered.id,
      name: serviceOffered.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceOffered = this.createFromForm();
    if (serviceOffered.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceOfferedService.update(serviceOffered));
    } else {
      this.subscribeToSaveResponse(this.serviceOfferedService.create(serviceOffered));
    }
  }

  private createFromForm(): IServiceOffered {
    return {
      ...new ServiceOffered(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceOffered>>): void {
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
