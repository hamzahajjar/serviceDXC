import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiagnostic, Diagnostic } from 'app/shared/model/diagnostic.model';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosticComponent } from './diagnostic.component';
import { DiagnosticDetailComponent } from './diagnostic-detail.component';
import { DiagnosticUpdateComponent } from './diagnostic-update.component';

@Injectable({ providedIn: 'root' })
export class DiagnosticResolve implements Resolve<IDiagnostic> {
  constructor(private service: DiagnosticService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiagnostic> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diagnostic: HttpResponse<Diagnostic>) => {
          if (diagnostic.body) {
            return of(diagnostic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Diagnostic());
  }
}

export const diagnosticRoute: Routes = [
  {
    path: '',
    component: DiagnosticComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Diagnostics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiagnosticDetailComponent,
    resolve: {
      diagnostic: DiagnosticResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Diagnostics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiagnosticUpdateComponent,
    resolve: {
      diagnostic: DiagnosticResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Diagnostics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiagnosticUpdateComponent,
    resolve: {
      diagnostic: DiagnosticResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Diagnostics',
    },
    canActivate: [UserRouteAccessService],
  },
];
