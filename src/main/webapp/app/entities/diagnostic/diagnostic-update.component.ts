import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiagnostic, Diagnostic } from 'app/shared/model/diagnostic.model';
import { DiagnosticService } from './diagnostic.service';

@Component({
  selector: 'jhi-diagnostic-update',
  templateUrl: './diagnostic-update.component.html',
})
export class DiagnosticUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [],
  });

  constructor(protected diagnosticService: DiagnosticService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diagnostic }) => {
      this.updateForm(diagnostic);
    });
  }

  updateForm(diagnostic: IDiagnostic): void {
    this.editForm.patchValue({
      id: diagnostic.id,
      description: diagnostic.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diagnostic = this.createFromForm();
    if (diagnostic.id !== undefined) {
      this.subscribeToSaveResponse(this.diagnosticService.update(diagnostic));
    } else {
      this.subscribeToSaveResponse(this.diagnosticService.create(diagnostic));
    }
  }

  private createFromForm(): IDiagnostic {
    return {
      ...new Diagnostic(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnostic>>): void {
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
