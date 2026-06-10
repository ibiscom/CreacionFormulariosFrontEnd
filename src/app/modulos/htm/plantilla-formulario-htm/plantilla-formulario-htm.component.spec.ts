import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioHtmComponent } from './plantilla-formulario-htm.component';

describe('PlantillaFormularioHtmComponent', () => {
  let component: PlantillaFormularioHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
