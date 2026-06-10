import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { InPutTextAreaEntity } from '../../../../entidades/forms-captura/in-put-text-area.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../../utilidades/field-value.util';

@Component({
  selector: 'frm-in-put-text-area',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './in-put-text-area.component.html',
  styleUrl: './in-put-text-area.component.scss',
})
export class InPutTextAreaComponent {
  @Input() public inPutTextAreaEntity?: InPutTextAreaEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Input Text Area:', this.inPutTextAreaEntity);
    this.colocarValorInicial();
  }

  public get valorInput(): string {
    return String(getFieldPayloadValue(this.inPutTextAreaEntity?.valor) ?? '');
  }

  public updateValue(value: string): void {
    if (!this.inPutTextAreaEntity) {
      return;
    }

    const nuevoValor = setFieldPayloadValue(this.inPutTextAreaEntity.valor, value);
    if (nuevoValor !== this.inPutTextAreaEntity.valor) {
      (this.inPutTextAreaEntity as any).valor = nuevoValor;
    }
  }

  private colocarValorInicial(): void {
    if (!this.inPutTextAreaEntity) {
      return;
    }

    const valorActual = getFieldPayloadValue(this.inPutTextAreaEntity.valor);
    if (valorActual !== undefined) {
      return;
    }

    const valorInicial = getFieldPayloadValue(this.inPutTextAreaEntity.valorDefecto) ?? '';
    const nuevoValor = setFieldPayloadValue(this.inPutTextAreaEntity.valor, valorInicial);
    if (nuevoValor !== this.inPutTextAreaEntity.valor) {
      (this.inPutTextAreaEntity as any).valor = nuevoValor;
    }
  }
}
