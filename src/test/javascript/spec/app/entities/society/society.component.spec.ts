import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserTestTestModule } from '../../../test.module';
import { SocietyComponent } from 'app/entities/society/society.component';
import { SocietyService } from 'app/entities/society/society.service';
import { Society } from 'app/shared/model/society.model';

describe('Component Tests', () => {
  describe('Society Management Component', () => {
    let comp: SocietyComponent;
    let fixture: ComponentFixture<SocietyComponent>;
    let service: SocietyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [SocietyComponent],
      })
        .overrideTemplate(SocietyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SocietyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SocietyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Society(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.societies && comp.societies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
