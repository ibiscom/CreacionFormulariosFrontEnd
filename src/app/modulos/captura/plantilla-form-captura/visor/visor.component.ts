import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SeccionComponent } from '../seccion/seccion.component';
import { FormularioJSONEntity } from '../../../../entidades/forms-captura/formulario-json.entity';
import { VerFormularioService } from '../plantilla-form-captura.service';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'frm-visor',
  imports: [FormsModule, FormularioComponent],
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss',
})
export class VisorComponent {
  @Input() public formulario?: FormularioJSONEntity;

  constructor(public parent: PlantillaFormCapturaComponent) {}

  ngOnInit(): void {}
}
