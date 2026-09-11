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
  public editingRowIndex: number | null = null;

  public constructor() {}

  ngOnInit(): void {
    this.headerColumns = this.resolveHeaderColumns();
    console.debug('Table Details:', this.tableDetailsEntity);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.headerColumns = this.resolveHeaderColumns();
  }

  public getGridColumns(): string {
    const dataColumnsCount = this.resolveColumnCount();
    if (dataColumnsCount > 0) {
      const colCount = dataColumnsCount + 1;
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
      let headers: string[] = nombresOrganizados;
      let headersWithDisplayNames = headers.map((header) => this.tableDetailsEntity?.nombresColumnas?.[header.trim()]?.toString() ?? header.trim());
      console.log('Headers with display names:', headersWithDisplayNames);
      return headersWithDisplayNames;
    }

    if (typeof nombresOrganizados === 'string') {
       let headers = this.splitHeaders(nombresOrganizados);
       let headersWithDisplayNames = headers.map((header) => this.tableDetailsEntity?.nombresColumnas?.[header.trim()]?.toString() ?? header.trim());
       console.log('Headers with display names:', headersWithDisplayNames);
       return headersWithDisplayNames;
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

    let headersWithDisplayNames = headers.map((header) => this.tableDetailsEntity?.nombresColumnas?.[header.trim()]?.toString() ?? header.trim());
    console.log('Headers with display names:', headersWithDisplayNames);
    return headersWithDisplayNames;

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
    if (!this.tableDetailsEntity) {
      return;
    }

    if (!Array.isArray(this.tableDetailsEntity.columnas)) {
      this.tableDetailsEntity.columnas = [];
    }

    const columnCount = this.resolveColumnCount();
    const newRow = {
      valores: Array(columnCount).fill(''),
    };

    this.tableDetailsEntity.columnas.push(newRow);
    this.editingRowIndex = this.tableDetailsEntity.columnas.length - 1;
  }

  public search(): void {
    // TODO: implementar búsqueda cuando se conecte con backend o filtros locales.
  }

  public deleteRow(row: { valores: string[] }): void {
    const rows = this.tableDetailsEntity?.columnas;

    if (!rows || !Array.isArray(rows)) {
      return;
    }

    const rowIndex = rows.indexOf(row);
    if (rowIndex < 0) {
      return;
    }

    rows.splice(rowIndex, 1);

    if (this.editingRowIndex === rowIndex) {
      this.editingRowIndex = null;
      return;
    }

    if (this.editingRowIndex !== null && this.editingRowIndex > rowIndex) {
      this.editingRowIndex -= 1;
    }
  }

  public editRow(row: { valores: string[] }): void {
    const rows = this.tableDetailsEntity?.columnas;

    if (!rows || !Array.isArray(rows)) {
      return;
    }

    const rowIndex = rows.indexOf(row);
    this.editingRowIndex = rowIndex >= 0 ? rowIndex : null;
  }

  public saveRow(): void {
    this.editingRowIndex = null;
  }

  public updateCellValue(row: { valores: string[] }, columnIndex: number, value: string): void {
    if (!Array.isArray(row.valores)) {
      row.valores = [];
    }

    while (row.valores.length <= columnIndex) {
      row.valores.push('');
    }

    row.valores[columnIndex] = value;
  }

  public getDisplayCellCount(row: { valores: string[] }): number {
    const rowValuesCount = Array.isArray(row.valores) ? row.valores.length : 0;
    return Math.max(this.resolveColumnCount(), rowValuesCount);
  }

  public getColumnIndexes(row: { valores: string[] }): number[] {
    return Array.from({ length: this.getDisplayCellCount(row) }, (_, index) => index);
  }

  public getCellValue(row: { valores: string[] }, columnIndex: number): string {
    if (!Array.isArray(row.valores)) {
      return '';
    }

    return row.valores[columnIndex] ?? '';
  }

  private resolveColumnCount(): number {
    if (this.headerColumns.length > 0) {
      return this.headerColumns.length;
    }

    const firstRow = this.tableDetailsEntity?.columnas?.[0];
    if (firstRow?.valores?.length) {
      return firstRow.valores.length;
    }

    return 1;
  }
}
