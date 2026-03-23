import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToDifferentFormComponent } from './link-to-different-form.component';

describe('LinkToDifferentFormComponent', () => {
  let component: LinkToDifferentFormComponent;
  let fixture: ComponentFixture<LinkToDifferentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkToDifferentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkToDifferentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
