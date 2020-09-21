import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { AffectationDetailComponent } from 'app/entities/affectation/affectation-detail.component';
import { Affectation } from 'app/shared/model/affectation.model';

describe('Component Tests', () => {
  describe('Affectation Management Detail Component', () => {
    let comp: AffectationDetailComponent;
    let fixture: ComponentFixture<AffectationDetailComponent>;
    const route = ({ data: of({ affectation: new Affectation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [AffectationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AffectationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AffectationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load affectation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.affectation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
