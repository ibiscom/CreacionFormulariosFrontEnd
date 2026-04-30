import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RefreshButtonEntity } from '../../../../entidades/forms-captura/refresh-button.entity';

@Component({
  selector: 'frm-refresh-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './refresh-button.component.html',
  styleUrl: './refresh-button.component.scss',
})
export class RefreshButtonComponent {
  @Input() public refreshButtonEntity?: RefreshButtonEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Refresh Button', this.refreshButtonEntity);
  }

  public click() {
    console.debug(
      'Click en Refresh Button. Accion:',
      this.refreshButtonEntity?.expresionLogicaFiltro,
    );
    if(this.verFormularioCmp?.modo === 'diligenciar') {
      console.debug('El formulario está en modo diligenciar. Se recargará el formulario para reflejar los cambios realizados.');
      this.verFormularioCmp.consultarFormulario();
    }
  }
}
