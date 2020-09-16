import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISociety } from 'app/shared/model/society.model';
import { IUser } from 'app/core/user/user.model';
import { SocietyService } from './society.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IServiceEntity} from 'app/shared/model/service-entity.model';
@Component({
  selector: 'jhi-society-detail',
  templateUrl: './society-detail.component.html',
})
export class SocietyDetailComponent implements OnInit {
  public society: ISociety | null = null;
  users: IUser[] = [];
  serviceEntities: IServiceEntity[] = [];

  constructor(protected activatedRoute: ActivatedRoute, private societyService: SocietyService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ society }) => {
      this.society = society;
      this.societyService.getUsersSociety(society.id)
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            (res.body) ? this.users = res.body : null;
          }
          )).subscribe();
          this.societyService.getServiceEntities(society.id)
          .pipe(
            map((res:HttpResponse<IServiceEntity[]>)=>{
              ((res.body)? this.serviceEntities =res.body : null);
            })
          ).subscribe();
    });
  }

  previousState(): void {
      window.history.back();
    }
}
