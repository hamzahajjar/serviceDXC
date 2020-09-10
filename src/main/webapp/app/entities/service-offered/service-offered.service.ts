import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceOffered } from 'app/shared/model/service-offered.model';

type EntityResponseType = HttpResponse<IServiceOffered>;
type EntityArrayResponseType = HttpResponse<IServiceOffered[]>;

@Injectable({ providedIn: 'root' })
export class ServiceOfferedService {
  public resourceUrl = SERVER_API_URL + 'api/service-offereds';

  constructor(protected http: HttpClient) {}

  create(serviceOffered: IServiceOffered): Observable<EntityResponseType> {
    return this.http.post<IServiceOffered>(this.resourceUrl, serviceOffered, { observe: 'response' });
  }

  update(serviceOffered: IServiceOffered): Observable<EntityResponseType> {
    return this.http.put<IServiceOffered>(this.resourceUrl, serviceOffered, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceOffered>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceOffered[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
