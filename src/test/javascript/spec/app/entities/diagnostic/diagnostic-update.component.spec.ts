import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { DiagnosticUpdateComponent } from 'app/entities/diagnostic/diagnostic-update.component';
import { DiagnosticService } from 'app/entities/diagnostic/diagnostic.service';
import { Diagnostic } from 'app/shared/model/diagnostic.model';

describe('Component Tests', () => {
  describe('Diagnostic Management Update Component', () => {
    let comp: DiagnosticUpdateComponent;
    let fixture: ComponentFixture<DiagnosticUpdateComponent>;
    let service: DiagnosticService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [DiagnosticUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiagnosticUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiagnosticUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiagnosticService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Diagnostic(123);
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
        const entity = new Diagnostic();
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
