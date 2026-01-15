import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToAFormComponent } from './link-to-a-form.component';

describe('LinkToAFormComponent', () => {
  let component: LinkToAFormComponent;
  let fixture: ComponentFixture<LinkToAFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkToAFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkToAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
