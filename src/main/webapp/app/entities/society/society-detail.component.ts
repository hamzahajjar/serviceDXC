import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISociety } from 'app/shared/model/society.model';
import { IUser } from 'app/core/user/user.model';
import { SocietyService } from './society.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-society-detail',
  templateUrl: './society-detail.component.html',
})
export class SocietyDetailComponent implements OnInit {
  society: ISociety | null = null;
  users: IUser[] = [];

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
    });
  }

  previousState(): void {
      window.history.back();
    }
}
