import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSQLQueryComponent } from './table-s-q-l-query.component';

describe('TableSQLQueryComponent', () => {
  let component: TableSQLQueryComponent;
  let fixture: ComponentFixture<TableSQLQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSQLQueryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSQLQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
