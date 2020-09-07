import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { SocietyUpdateComponent } from 'app/entities/society/society-update.component';
import { SocietyService } from 'app/entities/society/society.service';
import { Society } from 'app/shared/model/society.model';

describe('Component Tests', () => {
  describe('Society Management Update Component', () => {
    let comp: SocietyUpdateComponent;
    let fixture: ComponentFixture<SocietyUpdateComponent>;
    let service: SocietyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [SocietyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SocietyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SocietyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SocietyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Society(123);
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
        const entity = new Society();
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
