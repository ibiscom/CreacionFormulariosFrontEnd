import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { ListaCompuestaEntity } from '../../../../entidades/forms-captura/lista-compuesta.entity';

@Component({
  selector: 'frm-lista-compuesta',
  imports: [MatTableModule],
  templateUrl: './lista-compuesta.component.html',
  styleUrl: './lista-compuesta.component.scss',
})
export class ListaCompuestaComponent implements OnInit {
  @Input() public listaCompuestaEntity?: ListaCompuestaEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  displayedColumns: string[] = [];
  dataSource: Record<string, string>[] = [];

  public constructor() {}

  ngOnInit(): void {
    const tableHtml = this.listaCompuestaEntity?.textoHTMLTabla;

    if (!tableHtml) {
      return;
    }

    this.parseTableHtml(tableHtml);
  }

  private parseTableHtml(tableHtml: string): void {
    if (typeof DOMParser === 'undefined') {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(tableHtml, 'text/html');
    const tableElement = doc.querySelector('table');

    if (!tableElement) {
      return;
    }

    const rowsSource = Array.from(tableElement.querySelectorAll('tr'));

    if (rowsSource.length === 0) {
      return;
    }

    const headerRow = rowsSource[0];
    let columns = Array.from(headerRow.querySelectorAll('th, td')).map((cell) =>
      (cell.textContent ?? '').trim(),
    );

    if (columns.length === 0) {
      return;
    }

    columns = columns.map((column, index) => column || `Columna ${index + 1}`);

    const dataRows = rowsSource.slice(1);

    this.displayedColumns = columns;
    this.dataSource = dataRows.map((row) => {
      const cellValues = Array.from(row.querySelectorAll('td, th')).map((cell) =>
        (cell.textContent ?? '').trim(),
      );
      const rowData: Record<string, string> = {};

      columns.forEach((column, index) => {
        rowData[column] = cellValues[index] ?? '';
      });

      return rowData;
    });
  }
}
