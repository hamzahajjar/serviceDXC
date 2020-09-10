import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceOffered, ServiceOffered } from 'app/shared/model/service-offered.model';
import { ServiceOfferedService } from './service-offered.service';
import { ServiceOfferedComponent } from './service-offered.component';
import { ServiceOfferedDetailComponent } from './service-offered-detail.component';
import { ServiceOfferedUpdateComponent } from './service-offered-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceOfferedResolve implements Resolve<IServiceOffered> {
  constructor(private service: ServiceOfferedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceOffered> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceOffered: HttpResponse<ServiceOffered>) => {
          if (serviceOffered.body) {
            return of(serviceOffered.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceOffered());
  }
}

export const serviceOfferedRoute: Routes = [
  {
    path: '',
    component: ServiceOfferedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceOffereds',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceOfferedDetailComponent,
    resolve: {
      serviceOffered: ServiceOfferedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceOffereds',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceOfferedUpdateComponent,
    resolve: {
      serviceOffered: ServiceOfferedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceOffereds',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceOfferedUpdateComponent,
    resolve: {
      serviceOffered: ServiceOfferedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ServiceOffereds',
    },
    canActivate: [UserRouteAccessService],
  },
];
