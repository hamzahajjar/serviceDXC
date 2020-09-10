import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISociety } from 'app/shared/model/society.model';
import { IUser } from 'app/core/user/user.model';
import { IServiceEntity } from 'app/shared/model/service-entity.model';

type EntityResponseType = HttpResponse<ISociety>;
type EntityArrayResponseType = HttpResponse<ISociety[]>;

@Injectable({ providedIn: 'root' })
export class SocietyService {
  public resourceUrl = SERVER_API_URL + 'api/societies';

  constructor(protected http: HttpClient) {}

  create(society: ISociety): Observable<EntityResponseType> {
    return this.http.post<ISociety>(this.resourceUrl, society, { observe: 'response' });
  }

  update(society: ISociety): Observable<EntityResponseType> {
    return this.http.put<ISociety>(this.resourceUrl, society, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISociety>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISociety[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  getUsersSociety(id: number):Observable<EntityArrayResponseType>{
    return this.http.get<IUser[]>(`${this.resourceUrl}/${id}/users`,{observe: 'response'});
  }
  getServiceEntities(id: number):Observable<EntityArrayResponseType>{
    return this.http.get<IServiceEntity[]>(`${this.resourceUrl}/${id}/serviceEntities`,{observe:'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
