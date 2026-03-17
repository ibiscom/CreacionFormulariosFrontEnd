import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { CargaMasivaEntity } from '../../entities/ver-formulario/carga-masiva.entity.';

@Component({
  selector: 'frm-carga-masiva',
  imports: [],
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
})
export class CargaMasivaComponent {
  @Input() public cargaMasivaEntity?: CargaMasivaEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;
}
