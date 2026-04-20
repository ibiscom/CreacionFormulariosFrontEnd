import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantillaFormCapturaComponent } from './plantilla-form-captura.component';

describe('PlantillaFormCapturaComponent', () => {
  let component: PlantillaFormCapturaComponent;
  let fixture: ComponentFixture<PlantillaFormCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormCapturaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillaFormCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
