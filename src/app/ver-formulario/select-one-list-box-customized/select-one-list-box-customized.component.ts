import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { VerFormularioComponent } from '../ver-formulario.component';
import { SelectOneListBoxCustomizedEntity } from '../../entities/ver-formulario/select-one-list-box-customized.entity';

@Component({
  selector: 'frm-select-one-list-box-customized',
  imports: [MatOptionModule, MatFormFieldModule, FormsModule, MatSelectModule],
  templateUrl: './select-one-list-box-customized.component.html',
  styleUrl: './select-one-list-box-customized.component.scss',
})
export class SelectOneListBoxCustomizedComponent {
  @Input() public selectOneListBoxCustomizedEntity?: SelectOneListBoxCustomizedEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  public selected(opcion: any): boolean {
    return this.selectOneListBoxCustomizedEntity?.valor === opcion;
  }
}
