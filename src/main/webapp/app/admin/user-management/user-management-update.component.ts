import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';
import { HttpResponse } from '@angular/common/http';
import { ISociety } from 'app/shared/model/society.model';
import { SocietyService } from 'app/entities/society/society.service';
import { UserType } from 'app/shared/model/enumerations/user-type.model';
import { Authority } from 'app/shared/constants/authority.constants';
import { IServiceEntity } from 'app/shared/model/service-entity.model';

type SelectableEntityTeam = ITeam;
type SelectableEntitySociety =ISociety;
type SelectableEntityServiceEntity =IServiceEntity;

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
})
export class UserManagementUpdateComponent implements OnInit {
  user!: User;
  authorities: string[] = [];
  isSaving = false;
  teams: ITeam[] = [];
  societies: ISociety[] = [];
  serviceEntities:IServiceEntity[]=[]
  userTypes:UserType[]=[];

  defaultAuthorities:string[]=[];
  internAuthorities:string[]=[Authority.ADMIN,Authority.MANAGER,Authority.AGENT,Authority.USER,Authority.LEVEL_1,Authority.LEVEL_2];
  externAuthorities:string[]=[Authority.CUSTOMER,Authority.USER];
  societyTemp!: ISociety;

  editForm = this.fb.group({
    id: [],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    tel: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    type:[],
    team: [],
    society: [],
    serviceEntity:[],
    activated: [],
    langKey: [],
    authorities: [],
  });

  constructor(private userService: UserService, protected teamService: TeamService, protected societyService: SocietyService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          this.user.activated = true;
        }
        this.updateForm(user);

      }
      this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => {

        this.teams = res.body || [];
      });
      
      

      this.societyService.query().subscribe((res: HttpResponse<ISociety[]>) => {

        this.societies = res.body || [];
      });
 
      this.userTypes.push(UserType.INTERN);
      this.userTypes.push(UserType.EXTERN);
      this.onTypeSelected();
     


      
      this.userService.authorities().subscribe(authorities => {
        this.defaultAuthorities = authorities;
      });
    });

  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.user.langKey = 'en';
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
    { { this.user } };
    console.warn("editfrom="+this.editForm.get(['type'])?.value);
  }

  private updateForm(user: User): void {
    if(user.society){this.onSocietySelected(user.society);}
    
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tel: user.tel,
      team: user.team,
      type: user.type,
      society: user.society,
      serviceEntity:user.serviceEntity,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities,
    });
  }

  private updateUser(user: User): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.tel = this.editForm.get(['tel'])!.value;
    user.type =this.editForm.get(['type'])!.value;
    user.team = this.editForm.get(['team'])!.value;
    user.society = this.editForm.get(['society'])!.value;
    user.serviceEntity=this.editForm.get(['serviceEntity'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
  trackTeamById(index: number, team: SelectableEntityTeam): any {
    return team.id;
  }
  trackSocietyById(index: number, society: SelectableEntitySociety): any {
    return society.id;
  }
  trackServiceEntityById(index: number,serviceEntity: SelectableEntityServiceEntity):any{
    return serviceEntity.id;
  }
  onTypeSelected():void{
    if(this.editForm.get(['type'])?.value === UserType.INTERN){
      this.editForm.get(['society'])?.disable();
      this.editForm.get(['serviceEntity'])?.disable();
      this.editForm.get(['society'])?.setValue(null)
      this.editForm.get(['serviceEntity'])?.setValue(null);

      this.editForm.get(['team'])?.enable();
      this.authorities=this.internAuthorities;
    }
    else if(this.editForm.get(['type'])?.value === UserType.EXTERN){
      this.editForm.get(['team'])?.disable();
      this.editForm.get(['team'])?.setValue(null);
      this.editForm.get(['society'])?.enable();
      this.editForm.get(['serviceEntity'])?.enable();
      this.authorities=this.externAuthorities;

    }
    else{
      this.editForm.get(['team'])?.setValue(null);
      this.editForm.get(['society'])?.setValue(null);
      this.editForm.get(['serviceEntity'])?.setValue(null);


      this.editForm.get(['team'])?.disable();
      this.editForm.get(['society'])?.disable();
      this.editForm.get(['serviceEntity'])?.disable();
      this.authorities=[];
    }
  }
  onSocietySelected(society:ISociety):void{
    if(society.serviceEntities){
      this.serviceEntities=society.serviceEntities;
    }
    else{
      this.serviceEntities=[];
    }
  }
}
