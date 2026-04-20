import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableDetailsEntity } from '../../../../entidades/forms-captura/table-details.entity';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'frm-table-details',
  imports: [MatInputModule],
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.scss',
})
export class TableDetailsComponent implements OnChanges {
  @Input() public tableDetailsEntity?: TableDetailsEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public rowsPerPage: number = 5;
  public headerColumns: string[] = [];

  public constructor() {}

  ngOnInit(): void {
    this.headerColumns = this.resolveHeaderColumns();
    console.debug('Table Details:', this.tableDetailsEntity);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.headerColumns = this.resolveHeaderColumns();
  }

  public getGridColumns(): string {
    if (this.headerColumns.length > 0) {
      const colCount = this.headerColumns.length + 1;
      return Array(colCount).fill('1fr').join(' ');
    }

    return '1fr 1fr'; //  se generan minimo 2 columnas
  }

  private resolveHeaderColumns(): string[] {
    const nombresOrganizados = this.tableDetailsEntity?.nombresOrganizados;

    if (!nombresOrganizados) {
      return [];
    }

    if (Array.isArray(nombresOrganizados)) {
      return nombresOrganizados.map((item) => String(item));
    }

    if (typeof nombresOrganizados === 'string') {
      return this.splitHeaders(nombresOrganizados);
    }

    const values = Object.values(nombresOrganizados as Record<string, unknown>);
    const headers: string[] = [];

    for (const value of values) {
      if (Array.isArray(value)) {
        headers.push(...value.map((item) => String(item)));
        continue;
      }

      if (typeof value === 'string') {
        headers.push(...this.splitHeaders(value));
      }
    }

    return headers;
  }

  private splitHeaders(rawHeaders: string): string[] {
    const trimmed = rawHeaders.trim();

    if (!trimmed) {
      return [];
    }

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item));
        }
      } catch {}
    }

    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  public addRow(): void {
    throw new Error('Method not implemented.');
  }

  public search(): void {
    throw new Error('Method not implemented.');
  }

  public deleteRow(_t23: { valores: string[] }): void {
    throw new Error('Method not implemented.');
  }

  public editRow(_t23: { valores: string[] }): void {
    throw new Error('Method not implemented.');
  }
}
