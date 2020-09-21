import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IAffectation, Affectation } from 'app/shared/model/affectation.model';
import { AffectationService } from './affectation.service';

@Component({
  selector: 'jhi-affectation-update',
  templateUrl: './affectation-update.component.html',
})
export class AffectationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    event: [],
    team: [],
  });

  constructor(protected affectationService: AffectationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affectation }) => {
      if (!affectation.id) {
        const today = moment().startOf('day');
        affectation.startDate = today;
        affectation.endDate = today;
      }

      this.updateForm(affectation);
    });
  }

  updateForm(affectation: IAffectation): void {
    this.editForm.patchValue({
      id: affectation.id,
      event:affectation.event?.title,
      team:affectation.team?.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const affectation = this.createFromForm();
    if (affectation.id !== undefined) {
      this.subscribeToSaveResponse(this.affectationService.update(affectation));
    } else {
      this.subscribeToSaveResponse(this.affectationService.create(affectation));
    }
  }

  private createFromForm(): IAffectation {
    return {
      ...new Affectation(),
      id: this.editForm.get(['id'])!.value,
      event: this.editForm.get(['event'])!.value ,
      team: this.editForm.get(['team'])!.value ,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAffectation>>): void {
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
