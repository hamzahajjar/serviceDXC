import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { DiagnosticDetailComponent } from 'app/entities/diagnostic/diagnostic-detail.component';
import { Diagnostic } from 'app/shared/model/diagnostic.model';

describe('Component Tests', () => {
  describe('Diagnostic Management Detail Component', () => {
    let comp: DiagnosticDetailComponent;
    let fixture: ComponentFixture<DiagnosticDetailComponent>;
    const route = ({ data: of({ diagnostic: new Diagnostic(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [DiagnosticDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiagnosticDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiagnosticDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diagnostic on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diagnostic).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
