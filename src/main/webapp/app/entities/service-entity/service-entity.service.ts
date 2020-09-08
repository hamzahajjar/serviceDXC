import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceEntity } from 'app/shared/model/service-entity.model';

type EntityResponseType = HttpResponse<IServiceEntity>;
type EntityArrayResponseType = HttpResponse<IServiceEntity[]>;

@Injectable({ providedIn: 'root' })
export class ServiceEntityService {
  public resourceUrl = SERVER_API_URL + 'api/service-entities';

  constructor(protected http: HttpClient) {}

  create(serviceEntity: IServiceEntity): Observable<EntityResponseType> {
    return this.http.post<IServiceEntity>(this.resourceUrl, serviceEntity, { observe: 'response' });
  }

  update(serviceEntity: IServiceEntity): Observable<EntityResponseType> {
    return this.http.put<IServiceEntity>(this.resourceUrl, serviceEntity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
