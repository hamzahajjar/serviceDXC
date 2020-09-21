import { IUser } from 'app/core/user/user.model';
import { IEvent } from './event.model';

export interface IDiagnostic {
  id?: number;
  description?: string;
  event?:IEvent;
  users?:IUser[];
  

}

export class Diagnostic implements IDiagnostic {
  constructor(
    public id?: number, 
    public description?: string,
    public event?:IEvent,
    public users?:IUser[],
    ) {}
}
