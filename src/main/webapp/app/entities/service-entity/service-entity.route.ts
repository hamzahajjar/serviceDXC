import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceEntity, ServiceEntity } from 'app/shared/model/service-entity.model';
import { ServiceEntityService } from './service-entity.service';
import { ServiceEntityComponent } from './service-entity.component';
import { ServiceEntityDetailComponent } from './service-entity-detail.component';
import { ServiceEntityUpdateComponent } from './service-entity-update.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Injectable({ providedIn: 'root' })
export class ServiceEntityResolve implements Resolve<IServiceEntity> {
  currentAccount !: Account;
  constructor(private service: ServiceEntityService, private router: Router, private accountService: AccountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceEntity> | Observable<never> {
    const id = route.params['id'];

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.currentAccount = account;
      }
    });
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceEntity: HttpResponse<ServiceEntity>) => {
          if (serviceEntity.body && this.currentAccount.authorities.includes(Authority.ADMIN)) {
            return of(serviceEntity.body);
          }
          else if (serviceEntity.body?.user?.login === this.currentAccount.login) {
            return of(serviceEntity.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceEntity());
  }
}

export const serviceEntityRoute: Routes = [
  {
    path: '',
    component: ServiceEntityComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER],
      pageTitle: 'ServiceEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceEntityDetailComponent,
    resolve: {
      serviceEntity: ServiceEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceEntityUpdateComponent,
    resolve: {
      serviceEntity: ServiceEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceEntityUpdateComponent,
    resolve: {
      serviceEntity: ServiceEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceEntities',
    },
    canActivate: [UserRouteAccessService],
  },
];
