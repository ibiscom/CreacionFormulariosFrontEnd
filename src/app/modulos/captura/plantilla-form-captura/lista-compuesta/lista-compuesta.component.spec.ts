import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompuestaComponent } from './lista-compuesta.component';

describe('ListaCompuestaComponent', () => {
  let component: ListaCompuestaComponent;
  let fixture: ComponentFixture<ListaCompuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCompuestaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCompuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
