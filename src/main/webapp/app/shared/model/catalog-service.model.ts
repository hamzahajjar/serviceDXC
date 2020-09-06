import { IUser } from 'app/core/user/user.model';

export interface ICatalogService {
  id?: number;
  sla?: number;
  user: IUser;
}

export class CatalogService implements ICatalogService {
  constructor(public id: number, public sla: number,public user: IUser) {}
}
