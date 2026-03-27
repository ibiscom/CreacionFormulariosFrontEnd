import { TestBed } from '@angular/core/testing';

import { ListaFormulariosService } from './lista-formularios.service';

describe('ListaFormulariosService', () => {
  let service: ListaFormulariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaFormulariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
