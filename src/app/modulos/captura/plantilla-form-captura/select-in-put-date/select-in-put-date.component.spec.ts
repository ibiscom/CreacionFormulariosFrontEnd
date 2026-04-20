import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInPutDateComponent } from './select-in-put-date.component';

describe('SelectInPutDateComponent', () => {
  let component: SelectInPutDateComponent;
  let fixture: ComponentFixture<SelectInPutDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectInPutDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInPutDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
