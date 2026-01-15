import { Component, Input } from '@angular/core';
import { SeccionesFormularioComponent } from '../secciones-formulario/secciones-formulario.component';
import { FormularioJSONEntity } from '../../entities/ver-formulario/formulario-json.entity';
import { VerFormularioComponent } from '../ver-formulario.component';

@Component({
  selector: 'frm-formulario',
  imports: [SeccionesFormularioComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent {
  @Input() public formulario?: FormularioJSONEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  constructor() {}

  ngOnInit(): void {}
}
