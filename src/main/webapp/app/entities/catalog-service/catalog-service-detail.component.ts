import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICatalogService } from 'app/shared/model/catalog-service.model';

@Component({
  selector: 'jhi-catalog-service-detail',
  templateUrl: './catalog-service-detail.component.html',
})
export class CatalogServiceDetailComponent implements OnInit {
  catalogService: ICatalogService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ catalogService }) => (this.catalogService = catalogService));
  }

  previousState(): void {
    window.history.back();
  }
}
