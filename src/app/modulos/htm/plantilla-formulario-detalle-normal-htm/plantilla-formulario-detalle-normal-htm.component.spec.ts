import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioDetalleNormalHtmComponent } from './plantilla-formulario-detalle-normal-htm.component';

describe('PlantillaFormularioDetalleNormalHtmComponent', () => {
  let component: PlantillaFormularioDetalleNormalHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioDetalleNormalHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioDetalleNormalHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioDetalleNormalHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
