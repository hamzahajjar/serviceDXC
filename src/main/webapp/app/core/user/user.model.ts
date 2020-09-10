import { ITeam } from 'app/shared/model/team.model';
import { ICatalogService } from 'app/shared/model/catalog-service.model';
import { ISociety } from 'app/shared/model/society.model';
import {UserType} from '../../shared/model/enumerations/user-type.model'
import { IServiceEntity } from 'app/shared/model/service-entity.model';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: any;
  team?: ITeam;
  society?:ISociety;
  serviceEntity?:IServiceEntity;
  type?:UserType;
  catalogServices?: ICatalogService[];
  serviceEntities?:IServiceEntity[];
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
    public type?: UserType,
    public society?:ISociety,
    public serviceEntity?:IServiceEntity,
    public catalogServices?: ICatalogService[],
    public serviceEntities?:IServiceEntity[],
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
