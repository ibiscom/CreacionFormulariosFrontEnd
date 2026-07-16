import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocarFormularioEvtInicioComponent } from './invocar-formulario-evt-inicio.component';

describe('InvocarFormularioEvtInicioComponent', () => {
  let component: InvocarFormularioEvtInicioComponent;
  let fixture: ComponentFixture<InvocarFormularioEvtInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvocarFormularioEvtInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvocarFormularioEvtInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
