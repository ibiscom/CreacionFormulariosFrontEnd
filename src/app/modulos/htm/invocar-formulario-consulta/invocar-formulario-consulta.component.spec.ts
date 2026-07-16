import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocarFormularioConsultaComponent } from './invocar-formulario-consulta.component';

describe('InvocarFormularioConsultaComponent', () => {
  let component: InvocarFormularioConsultaComponent;
  let fixture: ComponentFixture<InvocarFormularioConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvocarFormularioConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvocarFormularioConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
