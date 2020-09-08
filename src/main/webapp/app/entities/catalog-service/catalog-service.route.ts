import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICatalogService, CatalogService } from 'app/shared/model/catalog-service.model';
import { CatalogServiceService } from './catalog-service.service';
import { CatalogServiceComponent } from './catalog-service.component';
import { CatalogServiceDetailComponent } from './catalog-service-detail.component';
import { CatalogServiceUpdateComponent } from './catalog-service-update.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Injectable({ providedIn: 'root' })
export class CatalogServiceResolve implements Resolve<ICatalogService> {
  currentAccount !: Account;
  constructor(private service: CatalogServiceService, private router: Router,private accountService:AccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICatalogService> | Observable<never> {
    const id = route.params['id'];
    this.accountService.identity().subscribe(account => {
      if(account){
        this.currentAccount=account;
      }
    })
    if (id) {
      return this.service.find(id).pipe(
        flatMap((catalogService: HttpResponse<CatalogService>) => {
          if (catalogService.body && this.currentAccount.authorities.includes(Authority.ADMIN)) {
            return of(catalogService.body);
          } 
          else if(catalogService.body?.user?.login === this.currentAccount.login)
          {
            return of(catalogService.body);
          }
          
          else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CatalogService());
  }
}

export const catalogServiceRoute: Routes = [
  {
    path: '',
    component: CatalogServiceComponent,
    data: {
      authorities: [Authority.ADMIN,Authority.MANAGER],
      pageTitle: 'CatalogServices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CatalogServiceDetailComponent,
    resolve: {
      catalogService: CatalogServiceResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.MANAGER],
      pageTitle: 'CatalogServices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CatalogServiceUpdateComponent,
    resolve: {
      catalogService: CatalogServiceResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.MANAGER],
      pageTitle: 'CatalogServices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CatalogServiceUpdateComponent,
    resolve: {
      catalogService: CatalogServiceResolve,
    },
    data: {
      authorities: [Authority.ADMIN,Authority.MANAGER],
      pageTitle: 'CatalogServices',
    },
    canActivate: [UserRouteAccessService],
  },
];
