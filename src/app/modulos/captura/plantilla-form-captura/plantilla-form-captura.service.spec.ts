import { TestBed } from '@angular/core/testing';

import { PlantillaFormCapturaService } from './plantilla-form-captura.service';

describe('PlantillaFormCapturaService', () => {
  let service: PlantillaFormCapturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaFormCapturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
