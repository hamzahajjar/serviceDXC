import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserTestTestModule } from '../../../test.module';
import { CatalogServiceUpdateComponent } from 'app/entities/catalog-service/catalog-service-update.component';
import { CatalogServiceService } from 'app/entities/catalog-service/catalog-service.service';
import { CatalogService } from 'app/shared/model/catalog-service.model';

describe('Component Tests', () => {
  describe('CatalogService Management Update Component', () => {
    let comp: CatalogServiceUpdateComponent;
    let fixture: ComponentFixture<CatalogServiceUpdateComponent>;
    let service: CatalogServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserTestTestModule],
        declarations: [CatalogServiceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CatalogServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CatalogServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CatalogServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CatalogService(123);
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
        const entity = new CatalogService();
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
