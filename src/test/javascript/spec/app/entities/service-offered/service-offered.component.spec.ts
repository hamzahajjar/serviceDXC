import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserTestTestModule } from '../../../test.module';
import { ServiceOfferedComponent } from 'app/entities/service-offered/service-offered.component';
import { ServiceOfferedService } from 'app/entities/service-offered/service-offered.service';
import { ServiceOffered } from 'app/shared/model/service-offered.model';

describe('Component Tests', () => {
  describe('ServiceOffered Management Component', () => {
    let comp: ServiceOfferedComponent;
    let fixture: ComponentFixture<ServiceOfferedComponent>;
    let service: ServiceOfferedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceOfferedComponent],
      })
        .overrideTemplate(ServiceOfferedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceOfferedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceOfferedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceOffered(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceOffereds && comp.serviceOffereds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
