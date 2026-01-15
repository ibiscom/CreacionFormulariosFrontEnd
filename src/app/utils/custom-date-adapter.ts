import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

// Adaptador de fecha personalizado que fuerza el formato YYYY-MM-DD
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return super.format(date, displayFormat);
  }
}