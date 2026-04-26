import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { InPutTextEntity } from '../../../../entidades/forms-captura/in-put-text.entity';
@Component({
  selector: 'frm-in-put-text',
  imports: [MatFormField, MatInputModule],
  templateUrl: './in-put-text.component.html',
  styleUrl: './in-put-text.component.scss',
})
export class InPutTextComponent {
  @Input() public inPutTextEntity?: InPutTextEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Input Text:', this.inPutTextEntity);
    this.colocarValorInicial();
  }

  public get matLabelClasses(): string {
    return this.obtenerColumnClasses()[0] ?? '';
  }

  public get matInputClasses(): string {
    const classes = this.obtenerColumnClasses();
    // Backward compatibility: if only one class is sent, keep applying it to input.
    return classes[1] ?? classes[0] ?? '';
  }

  public get valorInput(): unknown {
    if (!this.inPutTextEntity) {
      return '';
    }

    return this.obtenerValorNormalizado(this.inPutTextEntity.valor) ?? '';
  }

  private colocarValorInicial(): void {
    if (!this.inPutTextEntity) {
      return;
    }

    const valorActual = this.obtenerValorNormalizado(this.inPutTextEntity.valor);

    // Solo inicializa cuando realmente no hay valor.
    if (valorActual !== undefined) {
      return;
    }

    const valorPorDefecto = this.obtenerValorNormalizado(this.inPutTextEntity.valorDefecto);
    this.asignarValorNormalizado(valorPorDefecto ?? '');
  }

  private obtenerColumnClasses(): string[] {
    const columnClasses = this.inPutTextEntity?.columnClasses;

    if (!columnClasses) {
      return [];
    }

    return columnClasses
      .split(',')
      .map((cssClass) => cssClass.trim())
      .filter((cssClass) => cssClass.length > 0);
  }

  private obtenerValorNormalizado(valor: unknown): unknown {
    if (valor === null || valor === undefined) {
      return undefined;
    }

    if (Array.isArray(valor)) {
      return valor[0];
    }

    if (typeof valor === 'object') {
      return (valor as Record<string, unknown>)[''];
    }

    return valor;
  }

  private asignarValorNormalizado(valor: unknown): void {
    if (!this.inPutTextEntity) {
      return;
    }

    const valorActual = this.inPutTextEntity.valor as unknown;

    if (Array.isArray(valorActual)) {
      valorActual[0] = valor;
      return;
    }

    if (valorActual !== null && typeof valorActual === 'object') {
      (valorActual as Record<string, unknown>)[''] = valor;
      return;
    }

    // Compatibilidad con payloads donde valor llega como tipo básico.
    (this.inPutTextEntity as any).valor = valor;
  }
}
