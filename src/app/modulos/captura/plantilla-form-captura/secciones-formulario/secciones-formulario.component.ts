import { Component, Input } from '@angular/core';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { SeccionComponent } from '../seccion/seccion.component';
import { SeccionesFormularioEntity } from '../../../../entidades/forms-captura/secciones-formulario.entity';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';

@Component({
  selector: 'frm-secciones-formulario',
  imports: [SeccionComponent, KeyValuePipe],
  templateUrl: './secciones-formulario.component.html',
  styleUrl: './secciones-formulario.component.scss',
})
export class SeccionesFormularioComponent {
  @Input() public seccionesFormulario?: SeccionesFormularioEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug(this.seccionesFormulario);
  }

  // Mantiene el orden original entregado por el backend
  public keepOrder = (_a: KeyValue<string, any>, _b: KeyValue<string, any>): number => 0;
}
