import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { ServiceEntityDetailComponent } from 'app/entities/service-entity/service-entity-detail.component';
import { ServiceEntity } from 'app/shared/model/service-entity.model';

describe('Component Tests', () => {
  describe('ServiceEntity Management Detail Component', () => {
    let comp: ServiceEntityDetailComponent;
    let fixture: ComponentFixture<ServiceEntityDetailComponent>;
    const route = ({ data: of({ serviceEntity: new ServiceEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ServiceEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceEntity on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
