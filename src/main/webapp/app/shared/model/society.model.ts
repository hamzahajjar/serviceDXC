import { IUser } from 'app/core/user/user.model';

export interface ISociety {
  id?: number;
  name?: string;
  description?: string;
  users?:IUser[];
}

export class Society implements ISociety {
  constructor(public id?: number, public name?: string, public description?: string,public users?:IUser[]) {}
}
