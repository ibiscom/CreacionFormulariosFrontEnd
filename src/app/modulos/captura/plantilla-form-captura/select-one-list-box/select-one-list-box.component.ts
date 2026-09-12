import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectOneListBoxEntity } from '../../../../entidades/forms-captura/select-one-list-box.entity';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatSelectModule } from '@angular/material/select';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../../utilidades/field-value.util';

@Component({
  selector: 'frm-select-one-list-box',
  imports: [MatOptionModule, MatFormFieldModule, FormsModule, MatSelectModule],
  templateUrl: './select-one-list-box.component.html',
  styleUrl: './select-one-list-box.component.scss',
})
export class SelectOneListBoxComponent implements OnChanges {
  @Input() public selectOneListBoxEntity?: SelectOneListBoxEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  public options: Array<{ label: string; value: string }> = [];

  public constructor() {}

  public ngOnInit(): void {
    this.options = this.resolveOptions();
    console.debug('SelectOneListBox:', this.selectOneListBoxEntity);
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    this.options = this.resolveOptions();
  }

  public selected(opcion?: { label: string; value: string }): boolean {
    return opcion?.value === this.selectedValue;
  }

  public get selectedValue(): string {
    return String(getFieldPayloadValue(this.selectOneListBoxEntity?.valor) ?? '');
  }

  public updateValue(value: string): void {
    if (!this.selectOneListBoxEntity) {
      return;
    }

    const nuevoValor = setFieldPayloadValue(this.selectOneListBoxEntity.valor, value);
    if (nuevoValor !== this.selectOneListBoxEntity.valor) {
      (this.selectOneListBoxEntity as any).valor = nuevoValor;
    }
  }

  public get selectOneListBoxEntityVisible(): boolean {
    return !!(this.selectOneListBoxEntity && (this.selectOneListBoxEntity.visible === true || this.selectOneListBoxEntity.visible === 'true'));
  }

  private resolveOptions(): Array<{ label: string; value: string }> {
    const entity = this.selectOneListBoxEntity as Record<string, unknown> | undefined;
    if (!entity) {
      return [];
    }

    const fromItems = this.fromItems(entity['items']);
    if (  fromItems.length > 0) {
      return fromItems;
    }

    const fromColumnas = this.fromColumnasMostrables(entity['columnasMostrablesSeleccionadas']);
    if (fromColumnas.length > 0) {
      return fromColumnas;
    }

    const fromOpciones = this.fromItems(entity['opciones']);
    if (fromOpciones.length > 0) {
      return fromOpciones;
    }

    return this.fromLabelIdentifierLists(entity['listaLabels'], entity['listaIdentificadores']);
  }

  private fromItems(raw: unknown): Array<{ label: string; value: string }> {
    const normalizedRaw = this.normalizeItemsRaw(raw);
    if (!normalizedRaw) {
      return [];
    }

    if (Array.isArray(normalizedRaw)) {
      return this.fromArrayEntries(normalizedRaw);
    }

    const objectValues = Object.values(normalizedRaw as Record<string, unknown>);
    const mappedFromObjectValues = this.fromArrayEntries(objectValues);
    if (mappedFromObjectValues.length > 0) {
      return mappedFromObjectValues;
    }

    return [];
  }

  private normalizeItemsRaw(raw: unknown): unknown {
    if (!raw) {
      return undefined;
    }

    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (!trimmed) {
        return undefined;
      }

      try {
        return JSON.parse(trimmed);
      } catch {
        return this.splitCsvLike(trimmed);
      }
    }

    return raw;
  }

  private fromArrayEntries(entries: unknown[]): Array<{ label: string; value: string }> {
    const options: Array<{ label: string; value: string }> = [];
    for (const item of entries) {
      if (Array.isArray(item)) {
        options.push(...this.fromArrayEntries(item));
        continue;
      }

      if (item && typeof item === 'object') {
        const entry = item as Record<string, unknown>;
        const label = String(
          entry['label'] ??
            entry['string'] ??
            entry['descripcion'] ??
            entry['text'] ??
            entry['value'] ??
            '',
        );
        const value = String(
          entry['value'] ??
            entry['id'] ??
            entry['codigo'] ??
            entry['string'] ??
            entry['label'] ??
            '',
        );
        if (label || value) {
          options.push({ label, value });
          continue;
        }

        const nestedValues = Object.values(entry);
        const nestedOptions = this.fromArrayEntries(nestedValues);
        if (nestedOptions.length > 0) {
          options.push(...nestedOptions);
        }
        continue;
      }

      if (typeof item === 'string' || typeof item === 'number') {
        const text = String(item);
        options.push({ label: text, value: text });
      }
    }

    return options;
  }

  private fromColumnasMostrables(raw: unknown): Array<{ label: string; value: string }> {
    if (!raw || typeof raw !== 'object') {
      return [];
    }

    const options: Array<{ label: string; value: string }> = [];
    const values = Object.values(raw as Record<string, unknown>);
    for (const value of values) {
      if (!Array.isArray(value)) {
        continue;
      }

      for (const item of value) {
        if (!item || typeof item !== 'object') {
          continue;
        }

        const text = String((item as Record<string, unknown>)['string'] ?? '');
        if (text) {
          options.push({ label: text, value: text });
        }
      }
    }

    return options;
  }

  private fromLabelIdentifierLists(
    labelsRaw: unknown,
    identifiersRaw: unknown,
  ): Array<{ label: string; value: string }> {
    if (typeof labelsRaw !== 'string') {
      return [];
    }

    const labels = this.splitCsvLike(labelsRaw);
    const identifiers = typeof identifiersRaw === 'string' ? this.splitCsvLike(identifiersRaw) : [];

    return labels.map((label, index) => ({
      label,
      value: identifiers[index] ?? label,
    }));
  }

  private splitCsvLike(input: string): string[] {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
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
    const columnClasses = this.selectOneListBoxEntity?.columnClasses;

    if (!columnClasses) {
      return [];
    }

    return columnClasses
      .split(',')
      .map((cssClass) => cssClass.trim())
      .filter((cssClass) => cssClass.length > 0);
  }

}
