import { TestBed } from '@angular/core/testing';

import { InvocarComponenteCapturaService } from './invocar-componente-captura.service';

describe('InvocarComponenteCapturaService', () => {
  let service: InvocarComponenteCapturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvocarComponenteCapturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
