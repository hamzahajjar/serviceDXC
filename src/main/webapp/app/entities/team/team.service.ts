import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITeam } from 'app/shared/model/team.model';
import { IUser } from 'app/core/user/user.model';

type EntityResponseType = HttpResponse<ITeam>;
type EntityArrayResponseType = HttpResponse<ITeam[]>;

@Injectable({ providedIn: 'root' })
export class TeamService {
  public resourceUrl = SERVER_API_URL + 'api/teams';

  constructor(protected http: HttpClient) {}

  create(team: ITeam): Observable<EntityResponseType> {
    return this.http.post<ITeam>(this.resourceUrl, team, { observe: 'response' });
  }

  update(team: ITeam): Observable<EntityResponseType> {
    return this.http.put<ITeam>(this.resourceUrl, team, { observe: 'response' });
  }

  setTeamLeader(id:number,leaderLogin:string):Observable<EntityResponseType>{
    return this.http.post<any>(`${this.resourceUrl}/${id}/leader?leaderLogin=${leaderLogin}`,{ observe: 'response' });
  }

  getTeamLeader(id:number):Observable<EntityResponseType>{
    return this.http.get<IUser>(`${this.resourceUrl}/${id}/leader`,{observe:'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  getUsersTeam(id: number):Observable<EntityArrayResponseType>{
    return this.http.get<IUser[]>(`${this.resourceUrl}/${id}/users`,{observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
