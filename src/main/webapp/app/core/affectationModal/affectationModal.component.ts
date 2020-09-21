import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Affectation, IAffectation } from '../../shared/model/affectation.model';
import {AffectationService} from '../../entities/affectation/affectation.service';
import {EventService} from '../../entities/event/event.service';
import {TeamService} from '../../entities/team/team.service';
import { ITeam } from '../../shared/model/team.model';
import { IEvent } from 'app/shared/model/event.model';

type SelectableEntityTeam = ITeam;

@Component({
  selector: 'jhi-affectation-modal',
  templateUrl: './affectationModal.component.html',
})
export class AffectationModalComponent implements AfterViewInit {
  @ViewChild('event', { static: false })
  event?: ElementRef;
  
  isSaving= false;
  teams:ITeam[]=[];
  public currentEvent!:IEvent;


  

  affectationForm = this.fb.group({
    event: [''],
    team: [''],
  });

  constructor(protected activatedRoute: ActivatedRoute,private affectationService:AffectationService,private eventService:EventService,private teamService:TeamService, private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,private cdr:ChangeDetectorRef) {}


  ngAfterViewInit(): void {
    if (this.event) {
      this.event.nativeElement.focus();
    }
    if(this.affectationForm.get('event')?.value)
    {this.currentEvent=this.affectationForm.get('event')!.value;}
    this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => {

      this.teams = res.body || [];
    });

   
 
    
    this.cdr.detectChanges();

  }

 
 
  private createFromForm():IAffectation{
    return {
      ...new Affectation(),
      event:this.affectationForm.get(['event'])!.value,
      team:this.affectationForm.get(['team'])!.value,
    };
  }
  save():void{
    console.warn(this.createFromForm());
      this.subscribeToSaveResponse(this.affectationService.create(this.createFromForm()));
  }

  protected subscribeToSaveResponse(result:Observable<HttpResponse<IAffectation>>):void{
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
  trackTeamById(index: number, team: SelectableEntityTeam): any {
    return team.id;
  }


}
