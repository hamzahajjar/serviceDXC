import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserTestTestModule } from '../../../test.module';
import { DiagnosticComponent } from 'app/entities/diagnostic/diagnostic.component';
import { DiagnosticService } from 'app/entities/diagnostic/diagnostic.service';
import { Diagnostic } from 'app/shared/model/diagnostic.model';

describe('Component Tests', () => {
  describe('Diagnostic Management Component', () => {
    let comp: DiagnosticComponent;
    let fixture: ComponentFixture<DiagnosticComponent>;
    let service: DiagnosticService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [DiagnosticComponent],
      })
        .overrideTemplate(DiagnosticComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiagnosticComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiagnosticService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Diagnostic(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diagnostics && comp.diagnostics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
