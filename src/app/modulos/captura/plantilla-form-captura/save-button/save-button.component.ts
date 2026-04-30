import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SaveButtonEntity } from '../../../../entidades/forms-captura/save-button.entity';
import { PlantillaFormCapturaService } from '../plantilla-form-captura.service';

@Component({
  selector: 'frm-save-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Input() public saveButtonEntity?: SaveButtonEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor(private plantillaFormCapturaService: PlantillaFormCapturaService) {}

  ngOnInit(): void {
    console.debug('Save Button', this.saveButtonEntity);
  }

  public click() {
    console.debug('Click en Save Button. Accion:', this.saveButtonEntity?.expresionLogicaFiltro);
    if(this.verFormularioCmp?.modo === 'diligenciar') {
      console.debug('El formulario está en modo diligenciar');
      console.debug('Se ejecutará la acción de guardado definida en la expresión lógica del botón de guardar.');
      this.plantillaFormCapturaService.guardarFormulario(this.verFormularioCmp.formulario!).subscribe({
        next: (response) => {
          console.debug('Formulario guardado exitosamente. Respuesta del servidor:', response);
        },
        error: (error) => {
          console.error('Error al guardar el formulario:', error);
        },
      });
    }
  }


}
