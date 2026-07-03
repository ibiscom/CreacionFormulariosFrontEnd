import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormDetalleComponent } from './plantilla-form-detalle.component';

describe('PlantillaFormDetalleComponent', () => {
  let component: PlantillaFormDetalleComponent;
  let fixture: ComponentFixture<PlantillaFormDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
