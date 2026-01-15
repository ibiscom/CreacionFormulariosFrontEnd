import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesFormularioComponent } from './secciones-formulario.component';

describe('SeccionesFormularioComponent', () => {
  let component: SeccionesFormularioComponent;
  let fixture: ComponentFixture<SeccionesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionesFormularioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
