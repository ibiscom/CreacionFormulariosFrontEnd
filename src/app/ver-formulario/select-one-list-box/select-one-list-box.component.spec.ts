import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOneListBoxComponent } from './select-one-list-box.component';

describe('SelectOneListBoxComponent', () => {
  let component: SelectOneListBoxComponent;
  let fixture: ComponentFixture<SelectOneListBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOneListBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectOneListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
