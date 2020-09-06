import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';
import { HttpResponse } from '@angular/common/http';

type SelectableEntity = ITeam;

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
})
export class UserManagementUpdateComponent implements OnInit {
  user!: User;
  authorities: string[] = [];
  isSaving = false;
  teams: ITeam[] = [];

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
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    tel: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
    team:[],
    activated: [],
    langKey: [],
    authorities: [],
  });

  constructor(private userService: UserService, protected teamService: TeamService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          this.user.activated = true;
        }
        this.updateForm(user);
        
      }
      this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) =>{

        this.teams = res.body || [];
      } );

      this.userService.authorities().subscribe(authorities => {
        this.authorities = authorities;
      });
    });
    console.warn("route="+this.route.data);
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
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tel: user.tel,
      team: user.team,
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
    user.team = this.editForm.get(['team'])!.value ;
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
  trackById(index: number, team: SelectableEntity): any {
    return team.id;
  }
}
