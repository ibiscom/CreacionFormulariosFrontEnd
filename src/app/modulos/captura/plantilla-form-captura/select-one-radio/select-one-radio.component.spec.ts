import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOneRadioButtonComponent } from './select-one-radio.component';

describe('SelectOneRadioButtonComponent', () => {
  let component: SelectOneRadioButtonComponent;
  let fixture: ComponentFixture<SelectOneRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOneRadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectOneRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
