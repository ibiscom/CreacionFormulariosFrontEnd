import { TestBed } from '@angular/core/testing';

import { VerFormularioService } from './ver-formulario.service';

describe('VerFormularioService', () => {
  let service: VerFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
