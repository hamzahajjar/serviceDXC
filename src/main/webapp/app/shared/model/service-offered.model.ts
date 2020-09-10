import { ICatalogService } from './catalog-service.model';

export interface IServiceOffered {
  id?: number;
  name?: string;
  catalogServices?:ICatalogService[],
}

export class ServiceOffered implements IServiceOffered {
  constructor(public id?: number, public name?: string,public catalogServices?: ICatalogService[]) {}
}
