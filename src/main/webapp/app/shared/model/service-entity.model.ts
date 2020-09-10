import { IUser } from 'app/core/user/user.model';
import { ISociety } from './society.model';

export interface IServiceEntity {
  id?: number;
  name?: string;
  user?:IUser;
  society?:ISociety;
}

export class ServiceEntity implements IServiceEntity {
  constructor(public id?: number, public name?: string,public user?:IUser,public society?:ISociety) {}
}
