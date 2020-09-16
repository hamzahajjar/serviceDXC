import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISociety, Society } from 'app/shared/model/society.model';
import { SocietyService } from './society.service';
import { IServiceEntity } from 'app/shared/model/service-entity.model';
import { ServiceEntityService } from '../service-entity/service-entity.service';

@Component({
  selector: 'jhi-society-update',
  templateUrl: './society-update.component.html',
})
export class SocietyUpdateComponent implements OnInit {
  isSaving = false;
  allServiceEntities:IServiceEntity[]=[];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    serviceEntities: []
  });

  constructor(protected societyService: SocietyService,protected serviceEntityService:ServiceEntityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ society }) => {
      this.updateForm(society);
      this.serviceEntityService.query().subscribe((res:HttpResponse<IServiceEntity[]>)=>{
        this.allServiceEntities=res.body || [];
      })
    });
  }

  updateForm(society: ISociety): void {
    this.editForm.patchValue({
      id: society.id,
      name: society.name,
      description: society.description,
      serviceEntities: society.serviceEntities,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const society = this.createFromForm();
    if (society.id !== undefined) {
      this.subscribeToSaveResponse(this.societyService.update(society));
    } else {
      this.subscribeToSaveResponse(this.societyService.create(society));
    }
  }

  private createFromForm(): ISociety {
    return {
      ...new Society(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      serviceEntities: this.editForm.get(['serviceEntities'])?.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISociety>>): void {
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
