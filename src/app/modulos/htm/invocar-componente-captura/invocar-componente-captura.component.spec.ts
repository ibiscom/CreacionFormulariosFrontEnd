import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocarComponenteCapturaComponent } from './invocar-componente-captura.component';

describe('InvocarComponenteCapturaComponent', () => {
  let component: InvocarComponenteCapturaComponent;
  let fixture: ComponentFixture<InvocarComponenteCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvocarComponenteCapturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvocarComponenteCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
