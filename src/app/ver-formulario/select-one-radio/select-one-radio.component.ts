import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VerFormularioComponent } from '../ver-formulario.component';
import { ValorStringEntity } from '../../entities/ver-formulario/valor-string.entity';
import { SelectOneRadioEntity } from '../../entities/ver-formulario/select-one-radio.entity';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { ColumnasMostrablesSeleccionadasEntry } from '../../entities/ver-formulario/columnas-mostrables-seleccionadas.type';

@Component({
  selector: 'frm-select-one-radio',
  imports: [FormsModule, MatFormFieldModule, MatRadioModule,KeyValuePipe,],
  templateUrl: './select-one-radio.component.html',
  styleUrl: './select-one-radio.component.scss',
})
export class SelectOneRadioComponent {
  @Input() public selectOneRadioEntity?: SelectOneRadioEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;


    public constructor() {}

    public ngOnInit(): void {
      console.log('SelectOneRadio:', this.selectOneRadioEntity);
    }
    public selected(opcion?: ColumnasMostrablesSeleccionadasEntry): boolean {
      return this.selectOneRadioEntity?.valor[''] === opcion?.string;
    }

    // Mantiene el orden de las entradas que llega del servicio
    public keepOrder = (_a: KeyValue<string, any>, _b: KeyValue<string, any>): number => 0;
}

