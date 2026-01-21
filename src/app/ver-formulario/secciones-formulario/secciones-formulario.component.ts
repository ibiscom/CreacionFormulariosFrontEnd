import { Component, Input } from '@angular/core';
import { KeyValue, KeyValuePipe } from '@angular/common';
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

  public constructor() {}

  ngOnInit(): void {
    console.log(this.seccionesFormulario);
  }

  // Mantiene el orden original entregado por el backend
  public keepOrder = (_a: KeyValue<string, any>, _b: KeyValue<string, any>): number => 0;
}
