import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioEvtInicioHtmComponent } from './plantilla-formulario-evt-inicio-htm.component';

describe('PlantillaFormularioEvtInicioHtmComponent', () => {
  let component: PlantillaFormularioEvtInicioHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioEvtInicioHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioEvtInicioHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioEvtInicioHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
