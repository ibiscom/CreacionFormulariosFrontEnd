import { TestBed } from '@angular/core/testing';

import { PlantillaFormularioNormalHtmService } from './plantilla-formulario-normal-htm.service';

describe('PlantillaFormularioNormalHtmService', () => {
  let service: PlantillaFormularioNormalHtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaFormularioNormalHtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
