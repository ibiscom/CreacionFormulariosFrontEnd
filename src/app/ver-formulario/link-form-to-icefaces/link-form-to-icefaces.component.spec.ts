import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFormToIcefacesComponent } from './link-form-to-icefaces.component';

describe('LinkFormToIcefacesComponent', () => {
  let component: LinkFormToIcefacesComponent;
  let fixture: ComponentFixture<LinkFormToIcefacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkFormToIcefacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkFormToIcefacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
