import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAffectation, Affectation } from 'app/shared/model/affectation.model';
import { AffectationService } from './affectation.service';
import { AffectationComponent } from './affectation.component';
import { AffectationDetailComponent } from './affectation-detail.component';
import { AffectationUpdateComponent } from './affectation-update.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Injectable({ providedIn: 'root' })
export class AffectationResolve implements Resolve<IAffectation> {
  currentAccount!:Account; 
  constructor(private service: AffectationService,private accountService:AccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAffectation> | Observable<never> {
    const id = route.params['id'];
    this.accountService.identity().subscribe(account =>{
      if(account){
        this.currentAccount=account;
      }
    })
    if (id) {
      return this.service.find(id).pipe(
        flatMap((affectation: HttpResponse<Affectation>) => {
          if (affectation.body && (this.currentAccount.authorities.includes(Authority.ADMIN) || this.currentAccount.authorities.includes(Authority.AGENT)) ) {
            return of(affectation.body);
          } 
          else if((affectation.body?.team) && affectation.body?.team?.id === this.currentAccount.team?.id){
            return of(affectation.body);
          }
          else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Affectation());
  }
}

export const affectationRoute: Routes = [
  {
    path: '',
    component: AffectationComponent,
    resolve:{
      affectation: AffectationResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.LEVEL_1,Authority.AGENT],
      pageTitle: 'Affectations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AffectationDetailComponent,
    resolve: {
      affectation: AffectationResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.LEVEL_1,Authority.AGENT],
      pageTitle: 'Affectations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AffectationUpdateComponent,
    resolve: {
      affectation: AffectationResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.LEVEL_1,Authority.AGENT],
      pageTitle: 'Affectations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AffectationUpdateComponent,
    resolve: {
      affectation: AffectationResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.LEVEL_1,Authority.AGENT],
      pageTitle: 'Affectations',
    },
    canActivate: [UserRouteAccessService],
  },
];
