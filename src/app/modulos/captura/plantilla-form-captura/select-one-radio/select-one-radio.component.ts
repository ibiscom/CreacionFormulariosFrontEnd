import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SelectOneRadioEntity } from '../../../../entidades/forms-captura/select-one-radio.entity';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'frm-select-one-radio',
  imports: [FormsModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './select-one-radio.component.html',
  styleUrl: './select-one-radio.component.scss',
})
export class SelectOneRadioComponent implements OnChanges {
  @Input() public selectOneRadioEntity?: SelectOneRadioEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  public radioOptions: Array<{ label: string; value: string }> = [];

  public constructor() {}

  public ngOnInit(): void {
    this.radioOptions = this.resolveOptions();
    console.debug('SelectOneRadio:', this.selectOneRadioEntity);
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    this.radioOptions = this.resolveOptions();
  }

  public selected(option?: { label: string; value: string }): boolean {
    return this.selectOneRadioEntity?.valor?.[''] === option?.value;
  }

  private resolveOptions(): Array<{ label: string; value: string }> {
    const entity = this.selectOneRadioEntity as Record<string, unknown> | undefined;
    if (!entity) {
      return [];
    }

    return this.fromItems(entity['items']);
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
    return this.fromArrayEntries(objectValues);
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
        options.push(...this.fromArrayEntries(nestedValues));
        continue;
      }

      if (typeof item === 'string' || typeof item === 'number') {
        const text = String(item);
        options.push({ label: text, value: text });
      }
    }

    return options;
  }

  private splitCsvLike(input: string): string[] {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
