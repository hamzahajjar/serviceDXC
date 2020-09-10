import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IEvent {
  id?: number;
  title?: string;
  claimer?:IUser;
  description?: string;
  createdAt?: Moment;
  startDate?: Moment;
  endDate?: Moment;
}

export class Event implements IEvent {
  constructor(
    public id?: number,
    public title?: string,
    public claimer?:IUser,
    public description?: string,
    public createdAt?: Moment,
    public startDate?: Moment,
    public endDate?: Moment
  ) {}
}
