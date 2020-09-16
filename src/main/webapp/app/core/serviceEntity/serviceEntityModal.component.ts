import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import {SocietyService} from '../../entities/society/society.service'
import { IServiceEntity, ServiceEntity } from 'app/shared/model/service-entity.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ISociety } from 'app/shared/model/society.model';
import { SocietyDetailComponent } from 'app/entities/society/society-detail.component';
@Component({
  selector: 'jhi-service-entity-modal',
  templateUrl: './serviceEntityModal.component.html',
})
export class ServiceEntityModalComponent implements AfterViewInit {
  @ViewChild('name', { static: false })
  name?: ElementRef;
  society:ISociety | null  =null;
  isSaving= false;

  serviceEntityValues!:IServiceEntity;
  

  serviceEntityForm = this.fb.group({
    id:[''],
    name: [''],
    user: [''],

  });

  constructor(protected activatedRoute: ActivatedRoute,private societyService:SocietyService, private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,private cdr:ChangeDetectorRef) {}


  ngAfterViewInit(): void {
    if (this.name) {
      this.name.nativeElement.focus();
    }
    this.activatedRoute.data.subscribe(({ society }) => {
      this.society = society;
      console.warn("soci="+this.society);
    });

    this.serviceEntityValues=this.serviceEntityForm.value;
    
    this.serviceEntityForm.get('society')?.disable();
    this.cdr.detectChanges();

  }

 
  updateServiceEntity(serviceEntity:IServiceEntity):void
  {
    this.serviceEntityForm.patchValue({
      id:serviceEntity.id,
      name:serviceEntity.name,
      user: serviceEntity.user,
    })

  }
  private createFromForm():IServiceEntity{
    return {
      ...new ServiceEntity(),
      id:this.serviceEntityForm.get(['id'])!.value,
      name:this.serviceEntityForm.get(['name'])!.value,
      user:this.serviceEntityForm.get(['user'])!.value,
    };
  }
  save():void{
    
    this.isSaving=true;
    console.warn("clicked");
    const serviceEntity = this.createFromForm();
    console.warn("s="+serviceEntity.name+" "+SocietyDetailComponent);
    if(serviceEntity.society?.id){
      console.warn("s="+serviceEntity);
      this.subscribeToSaveResponse(this.societyService.createServiceEntity(serviceEntity,serviceEntity.society?.id));
    }

  }

  protected subscribeToSaveResponse(result:Observable<HttpResponse<ISociety>>):void{
    result.subscribe(
      ()=>this.onSaveSuccess(),
      ()=>this.onSaveError()
    );
  }


  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
  previousState(): void {
    this.activeModal.dismiss('closed');
  }


}
