import { ICatalogService } from './catalog-service.model';
import { IEvent } from './event.model';

export interface IServiceOffered {
  id?: number;
  name?: string;
  catalogServices?:ICatalogService[],
  events?:IEvent[],
  
}

export class ServiceOffered implements IServiceOffered {
  constructor(public id?: number, public name?: string,public catalogServices?: ICatalogService[],public events?:IEvent[]) {}
}
