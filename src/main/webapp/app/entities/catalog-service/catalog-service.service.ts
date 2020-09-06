import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatalogService } from 'app/shared/model/catalog-service.model';

type EntityResponseType = HttpResponse<ICatalogService>;
type EntityArrayResponseType = HttpResponse<ICatalogService[]>;

@Injectable({ providedIn: 'root' })
export class CatalogServiceService {
  public resourceUrl = SERVER_API_URL + 'api/catalog-services';

  constructor(protected http: HttpClient) {}

  create(catalogService: ICatalogService): Observable<EntityResponseType> {
    return this.http.post<ICatalogService>(this.resourceUrl, catalogService, { observe: 'response' });
  }

  update(catalogService: ICatalogService): Observable<EntityResponseType> {
    return this.http.put<ICatalogService>(this.resourceUrl, catalogService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatalogService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatalogService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
