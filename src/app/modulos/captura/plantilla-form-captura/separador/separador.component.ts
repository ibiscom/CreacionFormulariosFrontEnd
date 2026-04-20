import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SeparadorEntity } from '../../../../entidades/forms-captura/separador.entity';

@Component({
  selector: 'frm-separador',
  imports: [],
  templateUrl: './separador.component.html',
  styleUrl: './separador.component.scss',
})
export class SeparadorComponent {
  @Input() public separadorEntity?: SeparadorEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Separador:', this.separadorEntity);
  }
}
