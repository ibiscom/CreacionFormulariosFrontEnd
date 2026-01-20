import { Component, Input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { SeccionComponent } from '../seccion/seccion.component';
import { SeccionesFormularioEntity } from '../../entities/ver-formulario/secciones-formulario.entity';
import { VerFormularioComponent } from '../ver-formulario.component';

@Component({
  selector: 'frm-secciones-formulario',
  imports: [SeccionComponent, KeyValuePipe],
  templateUrl: './secciones-formulario.component.html',
  styleUrl: './secciones-formulario.component.scss',
})
export class SeccionesFormularioComponent {
  @Input() public seccionesFormulario?: SeccionesFormularioEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  // Mantiene el orden original al usar el pipe keyvalue
  public mantenerOrden = () => 0;

  public constructor() {}

  ngOnInit(): void {
    console.log(this.seccionesFormulario);
  }
}
