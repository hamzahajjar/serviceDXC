import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { SocietyDetailComponent } from 'app/entities/society/society-detail.component';
import { Society } from 'app/shared/model/society.model';

describe('Component Tests', () => {
  describe('Society Management Detail Component', () => {
    let comp: SocietyDetailComponent;
    let fixture: ComponentFixture<SocietyDetailComponent>;
    const route = ({ data: of({ society: new Society(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [SocietyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SocietyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SocietyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load society on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.society).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
