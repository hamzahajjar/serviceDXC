import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserTestTestModule } from '../../../test.module';
import { ServiceEntityComponent } from 'app/entities/service-entity/service-entity.component';
import { ServiceEntityService } from 'app/entities/service-entity/service-entity.service';
import { ServiceEntity } from 'app/shared/model/service-entity.model';

describe('Component Tests', () => {
  describe('ServiceEntity Management Component', () => {
    let comp: ServiceEntityComponent;
    let fixture: ComponentFixture<ServiceEntityComponent>;
    let service: ServiceEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceEntityComponent],
      })
        .overrideTemplate(ServiceEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceEntity(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceEntities && comp.serviceEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
