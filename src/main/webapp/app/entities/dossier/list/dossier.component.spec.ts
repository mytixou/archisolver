import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DossierService } from '../service/dossier.service';

import { DossierComponent } from './dossier.component';

describe('Dossier Management Component', () => {
  let comp: DossierComponent;
  let fixture: ComponentFixture<DossierComponent>;
  let service: DossierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DossierComponent],
    })
      .overrideTemplate(DossierComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DossierComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DossierService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.dossiers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
