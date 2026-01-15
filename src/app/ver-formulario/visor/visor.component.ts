import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { SeccionComponent } from '../seccion/seccion.component';
import { FormularioJSONEntity } from '../../entities/ver-formulario/formulario-json.entity';
import { VerFormularioService } from '../ver-formulario.service';
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

  constructor(public parent: VerFormularioComponent) {}

  ngOnInit(): void {}
}
