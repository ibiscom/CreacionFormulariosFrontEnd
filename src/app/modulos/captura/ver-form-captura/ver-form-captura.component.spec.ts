import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFormCapturaComponent } from './ver-form-captura.component';

describe('VerFormCapturaComponent', () => {
  let component: VerFormCapturaComponent;
  let fixture: ComponentFixture<VerFormCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerFormCapturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerFormCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
