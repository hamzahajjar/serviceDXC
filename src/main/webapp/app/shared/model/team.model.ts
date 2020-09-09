import { IUser } from 'app/core/user/user.model';

export interface ITeam {
  id?: number;
  name?: string;
  users?:IUser[];
  leader?:IUser;
}

export class Team implements ITeam {
  constructor(public id?: number, public name?: string,public users?:IUser[],public leader?:IUser) {}
}
