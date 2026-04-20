import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SaveButtonEntity } from '../../../../entidades/forms-captura/save-button.entity';

@Component({
  selector: 'frm-save-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Input() public saveButtonEntity?: SaveButtonEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Save Button', this.saveButtonEntity);
  }

  public click() {
    console.debug('Click en Save Button. Accion:', this.saveButtonEntity?.expresionLogicaFiltro);
  }
}
