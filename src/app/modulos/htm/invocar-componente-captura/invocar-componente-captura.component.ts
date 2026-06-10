import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PlantillaFormularioHtmComponent } from '../plantilla-formulario-htm/plantilla-formulario-htm.component';

@Component({
  selector: 'htm-invocar-componente-captura',
  imports: [FormsModule, PlantillaFormularioHtmComponent],
  templateUrl: './invocar-componente-captura.component.html',
  styleUrl: './invocar-componente-captura.component.scss',
})
export class InvocarComponenteCapturaComponent {
  field1 = '';
  field8 = '';
  field9 = '';

  validationStatus = '';

  private readonly blockedPasswords = new Set(['password', 'PASSWORD', '1234567', '0123456']);

  get isPasswordShort(): boolean {
    return this.field8.length > 0 && this.field8.length < 7;
  }

  get isPasswordBlocked(): boolean {
    return this.blockedPasswords.has(this.field8);
  }

  get isPasswordEqualToName(): boolean {
    return this.field8.length > 0 && this.field1.length > 0 && this.field8 === this.field1;
  }

  get isPasswordConfirmMismatch(): boolean {
    return this.field9.length > 0 && this.field8 !== this.field9;
  }

  get hasLegacyPasswordError(): boolean {
    return this.isPasswordShort || this.isPasswordBlocked || this.isPasswordEqualToName;
  }

  onFormValidate(form: NgForm): void {
    this.validationStatus = `validation callback for form 'presentacionFormulario': result = ${form.valid}`;
  }

  onSubmit(form: NgForm): void {
    this.onFormValidate(form);
    if (form.invalid || this.hasLegacyPasswordError || this.isPasswordConfirmMismatch) {
      return;
    }

    // Punto de extension: enviar datos al backend o continuar el flujo.
  }

}
