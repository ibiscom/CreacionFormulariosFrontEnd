import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SelectOneListBoxCustomizedEntity } from '../../../../entidades/forms-captura/select-one-list-box-customized.entity';

@Component({
  selector: 'frm-select-one-list-box-customized',
  imports: [MatOptionModule, MatFormFieldModule, FormsModule, MatSelectModule],
  templateUrl: './select-one-list-box-customized.component.html',
  styleUrl: './select-one-list-box-customized.component.scss',
})
export class SelectOneListBoxCustomizedComponent {
  @Input() public selectOneListBoxCustomizedEntity?: SelectOneListBoxCustomizedEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  public selected(opcion: any): boolean {
    return this.selectOneListBoxCustomizedEntity?.valor === opcion;
  }

  
  public get matLabelClasses(): string {
    return this.obtenerColumnClasses()[0] ?? '';
  }

  public get matInputClasses(): string {
    const classes = this.obtenerColumnClasses();
    // Backward compatibility: if only one class is sent, keep applying it to input.
    return classes[1] ?? classes[0] ?? '';
  }

  
  private obtenerColumnClasses(): string[] {
    const columnClasses = this.selectOneListBoxCustomizedEntity?.columnClasses;

    if (!columnClasses) {
      return [];
    }

    return columnClasses
      .split(',')
      .map((cssClass) => cssClass.trim())
      .filter((cssClass) => cssClass.length > 0);
  }
}
