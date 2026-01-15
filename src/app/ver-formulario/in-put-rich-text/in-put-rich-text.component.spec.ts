import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPutRichTextComponent } from './in-put-rich-text.component';

describe('InPutRichTextComponent', () => {
  let component: InPutRichTextComponent;
  let fixture: ComponentFixture<InPutRichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InPutRichTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InPutRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
