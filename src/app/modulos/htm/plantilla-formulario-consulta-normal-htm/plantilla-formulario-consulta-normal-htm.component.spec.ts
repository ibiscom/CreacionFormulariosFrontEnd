import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioConsultaNormalHtmComponent } from './plantilla-formulario-consulta-normal-htm.component';

describe('PlantillaFormularioConsultaNormalHtmComponent', () => {
  let component: PlantillaFormularioConsultaNormalHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioConsultaNormalHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioConsultaNormalHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioConsultaNormalHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
