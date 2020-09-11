import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEvent, Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventUpdateComponent } from './event-update.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UserType } from 'app/shared/model/enumerations/user-type.model';

@Injectable({ providedIn: 'root' })
export class EventResolve implements Resolve<IEvent> {
  currentAccount!:Account;
  constructor(private service: EventService,private accountService:AccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEvent> | Observable<never> {
    const id = route.params['id'];
    this.accountService.identity().subscribe(account=>{
      if(account) this.currentAccount = account;
    });
    if (id) {
      return this.service.find(id).pipe(
        flatMap((event: HttpResponse<Event>) => {
          if (event.body && (this.currentAccount.type === UserType.INTERN)) {
            return of(event.body);
          }
          else if(event.body?.claimer?.login === this.currentAccount.login)
          {
            return of(event.body);
          }
           else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Event());
  }
}

export const eventRoute: Routes = [
  {
    path: '',
    component: EventComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Events',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EventDetailComponent,
    resolve: {
      event: EventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Events',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EventUpdateComponent,
    resolve: {
      event: EventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Events',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EventUpdateComponent,
    resolve: {
      event: EventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Events',
    },
    canActivate: [UserRouteAccessService],
  },
];
