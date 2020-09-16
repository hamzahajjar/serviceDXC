import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServiceEntity, ServiceEntity } from 'app/shared/model/service-entity.model';
import { ServiceEntityService } from './service-entity.service';
import { ISociety } from 'app/shared/model/society.model';
import { SocietyService } from '../society/society.service';
import { ServiceOfferedService } from '../service-offered/service-offered.service';
import { IServiceOffered } from 'app/shared/model/service-offered.model';


@Component({
  selector: 'jhi-service-entity-update',
  templateUrl: './service-entity-update.component.html',
})
export class ServiceEntityUpdateComponent implements OnInit {
  isSaving = false;
  serviceEntityValues!: IServiceEntity;
  allServiceOffered: IServiceOffered[] = [];
  societies: ISociety[] = [];
  editForm = this.fb.group({
    id: [],
    user: [],
    society: [],
    name: [Validators.required],
    serviceOffereds: [],
  });

  constructor(protected serviceEntityService: ServiceEntityService, protected serviceOferredService: ServiceOfferedService, protected societyService: SocietyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.serviceEntityValues = this.editForm.value;
    this.activatedRoute.data.subscribe(({ serviceEntity }) => {
      this.updateForm(serviceEntity);
      this.serviceOferredService.query().subscribe((res: HttpResponse<IServiceOffered[]>) => {
        this.allServiceOffered = res.body || [];

      })
    });
  }

  updateForm(serviceEntity: IServiceEntity): void {
    this.editForm.patchValue({
      id: serviceEntity.id,
      user: serviceEntity.user,
      name: serviceEntity.name,
      serviceOffereds: serviceEntity.serviceOffereds,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceEntity = this.createFromForm();
    if (serviceEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceEntityService.update(serviceEntity));
      console.warn(serviceEntity);
    } else {
      this.subscribeToSaveResponse(this.serviceEntityService.create(serviceEntity));
    }
  }

  private createFromForm(): IServiceEntity {
    return {
      ...new ServiceEntity(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      name: this.editForm.get(['name'])!.value,
      serviceOffereds: this.editForm.get(['serviceOffereds'])?.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceEntity>>): void {
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
