import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPutTextAreaComponent } from './in-put-text-area.component';

describe('InPutTextAreaComponent', () => {
  let component: InPutTextAreaComponent;
  let fixture: ComponentFixture<InPutTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InPutTextAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InPutTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
