import { ICatalogService } from './catalog-service.model';
import { IServiceEntity } from './service-entity.model';

export interface IServiceOffered {
  id?: number;
  name?: string;
  catalogServices?:ICatalogService[],
  
}

export class ServiceOffered implements IServiceOffered {
  constructor(public id?: number, public name?: string,public catalogServices?: ICatalogService[]) {}
}
