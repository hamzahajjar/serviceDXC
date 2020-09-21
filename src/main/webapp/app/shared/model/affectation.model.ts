import { Moment } from 'moment';
import { IEvent } from './event.model';
import { ITeam } from './team.model';

export interface IAffectation {
  id?: number;
  event?: IEvent;
  team?: ITeam;
  startDate?: Moment;
  endDate?: Moment;
}

export class Affectation implements IAffectation {
  constructor(public id?: number,public event?:IEvent,public team?: ITeam, public startDate?: Moment, public endDate?: Moment) {}
}
