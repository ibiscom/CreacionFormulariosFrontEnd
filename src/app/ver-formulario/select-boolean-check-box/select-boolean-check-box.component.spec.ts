import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBooleanCheckBoxComponent } from './select-boolean-check-box.component';

describe('SelectBooleanCheckBoxComponent', () => {
  let component: SelectBooleanCheckBoxComponent;
  let fixture: ComponentFixture<SelectBooleanCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBooleanCheckBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectBooleanCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
