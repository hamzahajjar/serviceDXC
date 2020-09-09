import { IUser } from 'app/core/user/user.model';
import { IServiceEntity } from './service-entity.model';

export interface ICatalogService {
  id?: number;
  sla?: number;
  user?: IUser;
  serviceEntity?:IServiceEntity;
}

export class CatalogService implements ICatalogService {
  constructor(public id?: number, public sla?: number,public user?:IUser,public serviceEntity?:IServiceEntity) {}
}
