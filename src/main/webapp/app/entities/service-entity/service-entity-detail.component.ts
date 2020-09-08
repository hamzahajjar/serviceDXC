import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceEntity } from 'app/shared/model/service-entity.model';

@Component({
  selector: 'jhi-service-entity-detail',
  templateUrl: './service-entity-detail.component.html',
})
export class ServiceEntityDetailComponent implements OnInit {
  serviceEntity: IServiceEntity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntity }) => (this.serviceEntity = serviceEntity));
  }

  previousState(): void {
    window.history.back();
  }
}
