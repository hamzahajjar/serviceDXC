import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserTestTestModule } from '../../../test.module';
import { CatalogServiceComponent } from 'app/entities/catalog-service/catalog-service.component';
import { CatalogServiceService } from 'app/entities/catalog-service/catalog-service.service';
import { CatalogService } from 'app/shared/model/catalog-service.model';

describe('Component Tests', () => {
  describe('CatalogService Management Component', () => {
    let comp: CatalogServiceComponent;
    let fixture: ComponentFixture<CatalogServiceComponent>;
    let service: CatalogServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [CatalogServiceComponent],
      })
        .overrideTemplate(CatalogServiceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CatalogServiceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CatalogServiceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CatalogService(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.catalogServices && comp.catalogServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
