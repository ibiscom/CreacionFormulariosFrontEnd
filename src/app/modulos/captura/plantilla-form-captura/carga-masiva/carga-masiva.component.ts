import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CargaMasivaEntity } from '../../../../entidades/forms-captura/carga-masiva.entity';
import { ComponenteBaseEntity } from '../../../../entidades/forms-captura/componente-base.entity';

@Component({
  selector: 'frm-carga-masiva',
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
})
export class CargaMasivaComponent {
  @Input() public cargaMasivaEntity?: CargaMasivaEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  public archivos?: File[] = [];
  public uploadedFiles: Record<string, string> = {};

  constructor() {}

  public ngOnInit(): void {
    console.debug('Carga Masiva Entity:', this.cargaMasivaEntity);
  }

  public onFileSelected(componente: CargaMasivaEntity, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.uploadedFiles[this.componentKey(componente)] = file?.name ?? '';

    if (file) {
      console.debug(`Archivo seleccionado para ${componente.nombre}: ${file.name}.`);
    }
  }

  public componentKey(componente: CargaMasivaEntity): string {
      return componente.id ?? componente.nombre;
  }
}
