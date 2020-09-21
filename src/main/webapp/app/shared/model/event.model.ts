import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import {EventType} from 'app/shared/model/enumerations/event-type.model';
import {EventStatus} from 'app/shared/model/enumerations/event-status.model';
import { IServiceOffered } from './service-offered.model';
import { IAffectation } from './affectation.model';

export interface IEvent {
  id?: number;
  title?: string;
  type?:EventType;
  serviceOffered?:IServiceOffered;
  status?:EventStatus;
  claimer?:IUser;
  description?: string;
  affectations?:IAffectation[];
  createdAt?: Moment;
  startDate?: Moment;
  endDate?: Moment;
}

export class Event implements IEvent {
  constructor(
    public id?: number,
    public title?: string,
    public type?: EventType,
    public serviceOffered?: IServiceOffered,
    public status?:EventStatus,
    public claimer?:IUser,
    public description?: string,
    public affectations?:IAffectation[],
    public createdAt?: Moment,
    public startDate?: Moment,
    public endDate?: Moment
  ) {}
}
