import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura/plantilla-form-captura.component';

@Component({
  selector: 'app-diligenciar-form-captura',
  imports: [PlantillaFormCapturaComponent],
  templateUrl: './diligenciar-form-captura.component.html',
  styleUrl: './diligenciar-form-captura.component.scss',
})
export class DiligenciarFormCapturaComponent {
  public modo: string = 'diligenciar';
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
