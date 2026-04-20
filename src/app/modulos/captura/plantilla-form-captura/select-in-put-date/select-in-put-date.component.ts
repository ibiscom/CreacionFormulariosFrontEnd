import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SelectInPutDateEntity } from '../../../../entidades/forms-captura/select-in-put-date.entity';
import { FormsModule } from '@angular/forms';
import { CustomDateAdapter } from '../../../../utilidades/custom-date-adapter';

// Configuración del formato de fecha
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'frm-select-in-put-date',
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './select-in-put-date.component.html',
  styleUrl: './select-in-put-date.component.scss',
})
export class SelectInPutDateComponent {
  @Input() public selectInPutDateEntity?: SelectInPutDateEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  public dateValue: Date | null = null;

  public constructor() {}

  public ngOnInit(): void {
    const dateString =
      this.selectInPutDateEntity?.valor?.[''] ||
      this.selectInPutDateEntity?.valorDefecto?.[''] ||
      null;
    this.dateValue = dateString ? this.parseDate(dateString) : null;
    console.debug('Initial date string value:', dateString);
    console.debug('Initial date value:', this.dateValue);
    console.debug('Select InPut Date:', this.selectInPutDateEntity);
  }

  public updateDateValue(event: any) {
    if (this.selectInPutDateEntity && this.selectInPutDateEntity.valor) {
      this.selectInPutDateEntity.valor[''] = this.dateValue
        ? this.formatToISO8601(this.dateValue)
        : '';
    }
    console.debug('Updated date value:', this.selectInPutDateEntity?.valor?.['']);
  }

  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    try {
      // Manejar formatos como "2025-11-10 21:24:02.139 CET" - quitar zona horaria y milisegundos primero
      let cleanDateString = dateString.trim();

      // Remover información de zona horaria (como CET, UTC, etc.)
      cleanDateString = cleanDateString.replace(/\s+(CET|UTC|GMT|EST|PST|[A-Z]{3,4})$/i, '');

      // Manejar formato con milisegundos (YYYY-MM-DD HH:mm:ss.SSS)
      if (cleanDateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{1,3}$/)) {
        // Remover milisegundos para análisis más simple
        cleanDateString = cleanDateString.replace(/\.\d{1,3}$/, '');
      }

      // Intentar parsear formato YYYY-MM-DD HH:mm:ss
      if (cleanDateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        const date = new Date(cleanDateString);
        if (!isNaN(date.getTime())) return date;
      }

      // Intentar parsear formato ISO8601 con T
      if (dateString.includes('T') || dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;
      }

      // Último intento: conversión directa
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.warn('Failed to parse date:', dateString, error);
      return null;
    }
  }

  private formatToISO8601(date: Date): string {
    // Formatear a cadena de fecha tipo ISO8601 sin T (YYYY-MM-DD HH:mm:ss)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
