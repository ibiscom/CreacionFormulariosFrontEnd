import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormularioNormalHtmComponent } from './plantilla-formulario-normal-htm.component';

describe('PlantillaFormularioNormalHtmComponent', () => {
  let component: PlantillaFormularioNormalHtmComponent;
  let fixture: ComponentFixture<PlantillaFormularioNormalHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormularioNormalHtmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormularioNormalHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
