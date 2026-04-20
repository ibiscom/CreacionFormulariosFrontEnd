import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiligenciarFormCapturaComponent } from './diligenciar-form-captura.component';

describe('DiligenciarFormCapturaComponent', () => {
  let component: DiligenciarFormCapturaComponent;
  let fixture: ComponentFixture<DiligenciarFormCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiligenciarFormCapturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiligenciarFormCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
