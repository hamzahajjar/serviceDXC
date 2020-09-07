import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISociety, Society } from 'app/shared/model/society.model';
import { SocietyService } from './society.service';
import { SocietyComponent } from './society.component';
import { SocietyDetailComponent } from './society-detail.component';
import { SocietyUpdateComponent } from './society-update.component';

@Injectable({ providedIn: 'root' })
export class SocietyResolve implements Resolve<ISociety> {
  constructor(private service: SocietyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISociety> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((society: HttpResponse<Society>) => {
          if (society.body) {
            return of(society.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Society());
  }
}

export const societyRoute: Routes = [
  {
    path: '',
    component: SocietyComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Societies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SocietyDetailComponent,
    resolve: {
      society: SocietyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Societies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SocietyUpdateComponent,
    resolve: {
      society: SocietyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Societies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SocietyUpdateComponent,
    resolve: {
      society: SocietyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Societies',
    },
    canActivate: [UserRouteAccessService],
  },
];
