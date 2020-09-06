import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { CatalogServiceDetailComponent } from 'app/entities/catalog-service/catalog-service-detail.component';
import { CatalogService } from 'app/shared/model/catalog-service.model';

describe('Component Tests', () => {
  describe('CatalogService Management Detail Component', () => {
    let comp: CatalogServiceDetailComponent;
    let fixture: ComponentFixture<CatalogServiceDetailComponent>;
    const route = ({ data: of({ catalogService: new CatalogService(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [CatalogServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CatalogServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CatalogServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load catalogService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.catalogService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
