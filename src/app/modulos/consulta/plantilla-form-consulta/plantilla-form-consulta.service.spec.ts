import { TestBed } from '@angular/core/testing';

import { PlantillaFormConsultaService } from './plantilla-form-consulta.service';

describe('PlantillaFormConsultaService', () => {
  let service: PlantillaFormConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaFormConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
