import { Component, Input } from '@angular/core';
import { SeccionesFormularioComponent } from '../secciones-formulario/secciones-formulario.component';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { FormularioJSONEntity } from '../../../../entidades/forms-captura/formulario-json.entity';

@Component({
  selector: 'frm-formulario',
  imports: [SeccionesFormularioComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent {
  @Input() public formulario?: FormularioJSONEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  constructor() {}

  ngOnInit(): void {}
}
