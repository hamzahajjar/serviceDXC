import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IServiceEntity } from 'app/shared/model/service-entity.model';

import { IServiceOffered } from 'app/shared/model/service-offered.model';

@Component({
  selector: 'jhi-service-offered-detail',
  templateUrl: './service-offered-detail.component.html',
})
export class ServiceOfferedDetailComponent implements OnInit {
  serviceOffered: IServiceOffered | null = null;
  serviceEntities: IServiceEntity[] | undefined = [] ;
  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceOffered }) => {
      this.serviceOffered = serviceOffered;
    }
    );
  }

  previousState(): void {
    window.history.back();
  }
}
