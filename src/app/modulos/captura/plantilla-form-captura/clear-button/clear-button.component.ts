import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { ClearButtonEntity } from '../../../../entidades/forms-captura/clear-button.entity';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clear-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './clear-button.component.html',
  styleUrl: './clear-button.component.scss',
})
export class ClearButtonComponent {
  @Input() public clearButtonEntity?: ClearButtonEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Clear Button', this.clearButtonEntity);
  }

  public click() {
    console.debug(
      'Click en Clear Button. Accion:',
      this.clearButtonEntity?.expresionLogicaFiltro,
    );
    if(this.verFormularioCmp?.modo === 'diligenciar') {
      console.debug('El formulario está en modo diligenciar. Se recargará el formulario para reflejar los cambios realizados.');
      this.verFormularioCmp.limpiarFormulario();
    }
  }
}
