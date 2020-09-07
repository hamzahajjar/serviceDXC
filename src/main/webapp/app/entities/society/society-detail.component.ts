import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISociety } from 'app/shared/model/society.model';

@Component({
  selector: 'jhi-society-detail',
  templateUrl: './society-detail.component.html',
})
export class SocietyDetailComponent implements OnInit {
  society: ISociety | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ society }) => (this.society = society));
  }

  previousState(): void {
    window.history.back();
  }
}
