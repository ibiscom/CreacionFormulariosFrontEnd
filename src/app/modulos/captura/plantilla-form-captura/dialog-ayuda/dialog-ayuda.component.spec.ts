import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAyudaComponent } from './dialog-ayuda.component';

describe('DialogAyudaComponent', () => {
  let component: DialogAyudaComponent;
  let fixture: ComponentFixture<DialogAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
