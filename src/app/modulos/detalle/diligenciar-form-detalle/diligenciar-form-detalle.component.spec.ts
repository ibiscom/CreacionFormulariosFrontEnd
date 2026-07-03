import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiligenciarFormDetalleComponent } from './diligenciar-form-detalle.component';

describe('DiligenciarFormDetalleComponent', () => {
  let component: DiligenciarFormDetalleComponent;
  let fixture: ComponentFixture<DiligenciarFormDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiligenciarFormDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiligenciarFormDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
