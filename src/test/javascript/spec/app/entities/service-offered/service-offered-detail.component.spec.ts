import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { ServiceOfferedDetailComponent } from 'app/entities/service-offered/service-offered-detail.component';
import { ServiceOffered } from 'app/shared/model/service-offered.model';

describe('Component Tests', () => {
  describe('ServiceOffered Management Detail Component', () => {
    let comp: ServiceOfferedDetailComponent;
    let fixture: ComponentFixture<ServiceOfferedDetailComponent>;
    const route = ({ data: of({ serviceOffered: new ServiceOffered(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceOfferedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ServiceOfferedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceOfferedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceOffered on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceOffered).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
