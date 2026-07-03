import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormConsultaComponent } from './plantilla-form-consulta.component';

describe('PlantillaFormConsultaComponent', () => {
  let component: PlantillaFormConsultaComponent;
  let fixture: ComponentFixture<PlantillaFormConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
