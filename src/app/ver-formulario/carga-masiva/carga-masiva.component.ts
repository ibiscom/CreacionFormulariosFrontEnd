import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { CargaMasivaEntity } from '../../entities/ver-formulario/carga-masiva.entity.';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'frm-carga-masiva',
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
})
export class CargaMasivaComponent {
  @Input() public cargaMasivaEntity?: CargaMasivaEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;
  public archivos?: File[] = [];

  constructor() {}

  public ngOnInit(): void {
    console.log('Carga Masiva Entity:', this.cargaMasivaEntity);
  }

  public cargarArchivos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivos = Array.from(input.files);
      console.log('Se seleccionaron archivos');
    }
  }

  public subirArchivos(): void {
    console.log('Archivos para subir...');
    console.log(
      'Archivos seleccionados:',
      this.archivos?.map((archivo) => archivo.name).join(', '),
    );
  }
}
