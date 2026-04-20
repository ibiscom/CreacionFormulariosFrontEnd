import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPutTextComponent } from './in-put-text.component';

describe('InPutTextComponent', () => {
  let component: InPutTextComponent;
  let fixture: ComponentFixture<InPutTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InPutTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InPutTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
