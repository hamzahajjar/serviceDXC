import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiagnostic } from 'app/shared/model/diagnostic.model';

type EntityResponseType = HttpResponse<IDiagnostic>;
type EntityArrayResponseType = HttpResponse<IDiagnostic[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosticService {
  public resourceUrl = SERVER_API_URL + 'api/diagnostics';

  constructor(protected http: HttpClient) {}

  create(diagnostic: IDiagnostic): Observable<EntityResponseType> {
    return this.http.post<IDiagnostic>(this.resourceUrl, diagnostic, { observe: 'response' });
  }

  update(diagnostic: IDiagnostic): Observable<EntityResponseType> {
    return this.http.put<IDiagnostic>(this.resourceUrl, diagnostic, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiagnostic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiagnostic[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
