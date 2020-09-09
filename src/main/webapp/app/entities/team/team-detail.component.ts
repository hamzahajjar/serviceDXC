import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { IUser } from 'app/core/user/user.model';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'jhi-team-detail',
  templateUrl: './team-detail.component.html',
})
export class TeamDetailComponent implements OnInit {
  team: ITeam | null = null;
  users: IUser[] = [];
  teamLeader!:IUser;

  constructor(protected activatedRoute: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.team = team;
      console.warn("team=" + this.team);
      this.teamService.getUsersTeam(team.id)
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            (res.body) ? this.users = res.body : null;
            console.warn("users=" + res.body);
          }
          )).subscribe();
      if (this.team?.id) {
        this.teamService.getTeamLeader(this.team?.id).pipe(
          map((res:HttpResponse<IUser>) =>{
            if(res.body){
              (res.body)? this.teamLeader=res.body : null;
              console.warn("teamlead="+this.teamLeader);
            }
          })
        ).subscribe();

      }
    }


    );
  }

  selectLeader(id: number | undefined, leaderLogin: string | undefined): void {
    if (id && leaderLogin) {
      this.teamService.setTeamLeader(id, leaderLogin).subscribe();
      window.location.reload();
    }

  }

  previousState(): void {
    window.history.back();
  }
}
