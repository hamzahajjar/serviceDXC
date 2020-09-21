import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAffectation } from 'app/shared/model/affectation.model';

type EntityResponseType = HttpResponse<IAffectation>;
type EntityArrayResponseType = HttpResponse<IAffectation[]>;

@Injectable({ providedIn: 'root' })
export class AffectationService {
  public resourceUrl = SERVER_API_URL + 'api/affectations';

  constructor(protected http: HttpClient) {}

  create(affectation: IAffectation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affectation);
    return this.http
      .post<IAffectation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(affectation: IAffectation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affectation);
    return this.http
      .put<IAffectation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAffectation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  validateAffectation(id:number):Observable<EntityResponseType>{
    return this.http.post<IAffectation>(`${this.resourceUrl}/${id}/validate`,id,{observe:'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffectation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(affectation: IAffectation): IAffectation {
    const copy: IAffectation = Object.assign({}, affectation, {
      startDate: affectation.startDate && affectation.startDate.isValid() ? affectation.startDate.toJSON() : undefined,
      endDate: affectation.endDate && affectation.endDate.isValid() ? affectation.endDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((affectation: IAffectation) => {
        affectation.startDate = affectation.startDate ? moment(affectation.startDate) : undefined;
        affectation.endDate = affectation.endDate ? moment(affectation.endDate) : undefined;
      });
    }
    return res;
  }
}
