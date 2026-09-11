import { TestBed } from '@angular/core/testing';

import { PlantillaFormularioHtmService } from './plantilla-formulario-htm.service';

describe('PlantillaFormularioHtmService', () => {
  let service: PlantillaFormularioHtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaFormularioHtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
