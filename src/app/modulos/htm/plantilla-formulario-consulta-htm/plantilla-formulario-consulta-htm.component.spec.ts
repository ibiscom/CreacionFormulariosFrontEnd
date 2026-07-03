import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioConsultaHtmComponent } from './plantilla-formulario-consulta-htm.component';

describe('PlantillaFormularioConsultaHtmComponent', () => {
  let component: PlantillaFormularioConsultaHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioConsultaHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioConsultaHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioConsultaHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
