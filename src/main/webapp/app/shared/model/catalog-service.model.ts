import { IUser } from 'app/core/user/user.model';
import { IServiceOffered } from './service-offered.model';

export interface ICatalogService {
  id?: number;
  sla?: number;
  user?: IUser;
  serviceOffered?:IServiceOffered;
}

export class CatalogService implements ICatalogService {
  constructor(public id?: number, public sla?: number,public user?:IUser,public serviceOffered?:IServiceOffered) {}
}
