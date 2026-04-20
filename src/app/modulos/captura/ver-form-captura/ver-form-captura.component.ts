import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from "../plantilla-form-captura/plantilla-form-captura.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-form-captura',
  imports: [PlantillaFormCapturaComponent],
  templateUrl: './ver-form-captura.component.html',
  styleUrl: './ver-form-captura.component.scss',
})
export class VerFormCapturaComponent {
  public modo: string = 'ver';
  public idFormulario: string = '';

  constructor(private route: ActivatedRoute) {
    this.idFormulario = this.route.snapshot.paramMap.get('id') || 'Formulario sin ID';
    if (this.idFormulario === 'Formulario sin ID') {
      var mensajeError:string = 'No se proporcionó un ID de formulario. Verifique la ruta y los parámetros.';
      console.error(mensajeError);
      throw new Error(mensajeError);
    }
  }
}
