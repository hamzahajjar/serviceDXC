import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEvent, Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { EventType } from 'app/shared/model/enumerations/event-type.model';
import { IServiceOffered } from 'app/shared/model/service-offered.model';
import { IUser } from 'app/core/user/user.model';

type SelectableEntityServiceOffered = IServiceOffered;

@Component({
  selector: 'jhi-event-update',
  templateUrl: './event-update.component.html',
})
export class EventUpdateComponent implements OnInit {
  isSaving = false;
  eventValues!:IEvent;
  eventTypes: EventType[]=[];
  claimer!:IUser;
  serviceOffereds:IServiceOffered[]=[];
  editForm = this.fb.group({
    id: [],
    title: ['',Validators.required],
    type:['',Validators.required],
    serviceOffered:[],
    claimer:[],
    description: [],
    createdAt: [],
    startDate: [],
    endDate: [],
  });

  constructor(protected eventService: EventService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventValues= this.editForm.value;
    this.claimer=this.editForm.get('claimer')?.value;
    this.activatedRoute.data.subscribe(({ event }) => {
      if (!event.id) {
        event.createdAt = null;
        event.startDate = null;
        event.endDate = null;
      }

      this.updateForm(event);
    });
      this.eventTypes.push(EventType.DEMAND);
      this.eventTypes.push(EventType.INCIDENT);
      this.eventTypes.push(EventType.PROBLEM);
  }

  updateForm(event: IEvent): void {
    
    if(event.claimer)
    {
      if(event.claimer.serviceEntity?.serviceOffereds) this.serviceOffereds=event.claimer.serviceEntity?.serviceOffereds;
    }
    this.editForm.patchValue({
      id: event.id,
      title: event.title,
      type:event.type,
      serviceOffered:event.serviceOffered || null,
      claimer:event.claimer,
      description: event.description,
      createdAt: event.createdAt ? event.createdAt.format(DATE_TIME_FORMAT) : null,
      startDate: event.startDate ? event.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: event.endDate ? event.endDate.format(DATE_TIME_FORMAT) : null,
    });
    console.warn(this.editForm.value);
    
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const event = this.createFromForm();
    if (event.id !== undefined) {
      this.subscribeToSaveResponse(this.eventService.update(event));
      console.warn(event);
    } else {
      this.subscribeToSaveResponse(this.eventService.create(event));
    }
  }

  private createFromForm(): IEvent {
    return {
      ...new Event(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      type: this.editForm.get(['type'])!.value,
      serviceOffered: this.editForm.get(['serviceOffered'])?.value,
      claimer: this.editForm.get(['claimer'])!.value ,
      description: this.editForm.get(['description'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
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
  trackServiceOfferedById(index: number, serviceOffered: SelectableEntityServiceOffered): any {
    return serviceOffered.id;
  }
}
