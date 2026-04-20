import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOneListBoxCustomizedComponent } from './select-one-list-box-customized.component';

describe('SelectOneListBoxCustomizedComponent', () => {
  let component: SelectOneListBoxCustomizedComponent;
  let fixture: ComponentFixture<SelectOneListBoxCustomizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOneListBoxCustomizedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectOneListBoxCustomizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
