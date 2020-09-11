import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import {EventType} from 'app/shared/model/enumerations/event-type.model';

export interface IEvent {
  id?: number;
  title?: string;
  type?:EventType;
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
    public type?: EventType,
    public claimer?:IUser,
    public description?: string,
    public createdAt?: Moment,
    public startDate?: Moment,
    public endDate?: Moment
  ) {}
}
