import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CargaMasivaEntity } from '../../../../entidades/forms-captura/carga-masiva.entity';

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

  constructor() {}

  public ngOnInit(): void {
    console.debug('Carga Masiva Entity:', this.cargaMasivaEntity);
  }

  public cargarArchivos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivos = Array.from(input.files);
      console.debug('Se seleccionaron archivos');
    }
  }

  public subirArchivos(): void {
    console.debug('Archivos para subir...');
    console.debug(
      'Archivos seleccionados:',
      this.archivos?.map((archivo) => archivo.name).join(', '),
    );
  }
}
