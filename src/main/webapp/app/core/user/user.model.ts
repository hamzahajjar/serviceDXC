import { ITeam } from 'app/shared/model/team.model';
import { ICatalogService } from 'app/shared/model/catalog-service.model';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: any;
  team?: ITeam;
  catalogServices?: ICatalogService[];
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public tel?:any,
    public team?: ITeam,
    public catalogServices?: ICatalogService[],
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string
  ) {}
}
