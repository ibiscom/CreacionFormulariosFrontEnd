import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFormConsultaComponent } from './consultar-form-consulta.component';

describe('ConsultarFormConsultaComponent', () => {
  let component: ConsultarFormConsultaComponent;
  let fixture: ComponentFixture<ConsultarFormConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarFormConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarFormConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
