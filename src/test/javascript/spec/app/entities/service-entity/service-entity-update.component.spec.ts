import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { ServiceEntityUpdateComponent } from 'app/entities/service-entity/service-entity-update.component';
import { ServiceEntityService } from 'app/entities/service-entity/service-entity.service';
import { ServiceEntity } from 'app/shared/model/service-entity.model';

describe('Component Tests', () => {
  describe('ServiceEntity Management Update Component', () => {
    let comp: ServiceEntityUpdateComponent;
    let fixture: ComponentFixture<ServiceEntityUpdateComponent>;
    let service: ServiceEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [ServiceEntityUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ServiceEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceEntity(123);
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
        const entity = new ServiceEntity();
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
