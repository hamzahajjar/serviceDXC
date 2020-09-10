import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { ServiceOfferedUpdateComponent } from 'app/entities/service-offered/service-offered-update.component';
import { ServiceOfferedService } from 'app/entities/service-offered/service-offered.service';
import { ServiceOffered } from 'app/shared/model/service-offered.model';

describe('Component Tests', () => {
  describe('ServiceOffered Management Update Component', () => {
    let comp: ServiceOfferedUpdateComponent;
    let fixture: ComponentFixture<ServiceOfferedUpdateComponent>;
    let service: ServiceOfferedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceOfferedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ServiceOfferedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceOfferedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceOfferedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceOffered(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceOffered();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
