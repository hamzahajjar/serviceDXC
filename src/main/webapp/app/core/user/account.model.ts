import { ITeam } from 'app/shared/model/team.model';
import { ISociety } from 'app/shared/model/society.model';
import { ICatalogService } from 'app/shared/model/catalog-service.model';
import { IServiceEntity } from 'app/shared/model/service-entity.model';

export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public tel:any,
    public team:ITeam,
    public society:ISociety,
    public catalogueServices:ICatalogService[],
    public serviceEntities:IServiceEntity[],
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public imageUrl: string
  ) {}
}
