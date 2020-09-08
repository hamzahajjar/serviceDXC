import { IUser } from 'app/core/user/user.model';
import { IServiceEntity } from './service-entity.model';

export interface ISociety {
  id?: number;
  name?: string;
  description?: string;
  users?:IUser[];
  serviceEntities?:IServiceEntity[];
}

export class Society implements ISociety {
  constructor(public id?: number, public name?: string, public description?: string,public users?:IUser[],public serviceEnitities?:IServiceEntity[]) {}
}
