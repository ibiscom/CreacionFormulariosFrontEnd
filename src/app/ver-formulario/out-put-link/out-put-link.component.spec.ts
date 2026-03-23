import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutPutLinkComponent } from './out-put-link.component';

describe('OutPutLinkComponent', () => {
  let component: OutPutLinkComponent;
  let fixture: ComponentFixture<OutPutLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutPutLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutPutLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
