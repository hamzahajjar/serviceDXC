import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEvent, Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventUpdateComponent } from './event-update.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IAffectation } from 'app/shared/model/affectation.model';

@Injectable({ providedIn: 'root' })
export class EventResolve implements Resolve<IEvent> {
  currentAccount!: Account;
  currentEvent!: IEvent;
  constructor(private service: EventService, private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IEvent> | Observable<never> {
    const id = route.params['id'];
    this.accountService.identity().subscribe(account => {
      if (account) this.currentAccount = account;
    });
    if (id) {
      return this.service.find(id).pipe(
        flatMap((event: HttpResponse<Event>) => {

          if (event.body && (this.currentAccount.authorities.includes(Authority.ADMIN) || this.currentAccount.authorities.includes(Authority.AGENT) || this.currentAccount.authorities.includes(Authority.MANAGER))) {
            return of(event.body);
          }
          else if (event.body && event.body.id && (this.currentAccount.authorities.includes(Authority.LEVEL_1))) {
            this.service.getEventAffectations(event.body.id)
              .pipe(
                map((res: HttpResponse<IAffectation[]>) => {
                  if (res.body) {
                    event.body!.affectations = res.body;
                  }
                })
              ).subscribe();
            if (event.body.affectations) {
              if(event.body.affectations[event.body.affectations.length -1].team?.id === this.currentAccount.team.id){
                console.warn(event.body.affectations[event.body.affectations.length -1]);
                return of(event.body);
              }
              else{
                return EMPTY;
              }
            }
            else {
              return of(new Event);
            }

          }
          else if (event.body?.claimer?.login === this.currentAccount.login) {
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
