import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectOneListBoxEntity } from '../../entities/ver-formulario/select-one-list-box.entity';
import { VerFormularioComponent } from '../ver-formulario.component';
import { ValorStringEntity } from '../../entities/ver-formulario/valor-string.entity';
import { MatSelectModule } from '@angular/material/select';
import { KeyValue, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'frm-select-one-list-box',
  imports: [MatOptionModule, MatFormFieldModule, FormsModule, MatSelectModule, KeyValuePipe],
  templateUrl: './select-one-list-box.component.html',
  styleUrl: './select-one-list-box.component.scss',
})
export class SelectOneListBoxComponent {
  @Input() public selectOneListBoxEntity?: SelectOneListBoxEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  public ngOnInit(): void {
    console.log('SelectOneListBox:', this.selectOneListBoxEntity);
  }

  public selected(opcion: any): boolean {
    const opc:boolean = (opcion?.string === this.selectOneListBoxEntity?.valor?.['']);
    return opc;
  }

  // Evita que el pipe keyvalue reordene las opciones y mantiene el orden del backend
  public keepOrder = (_a: KeyValue<string, any>, _b: KeyValue<string, any>): number => 0;
}
