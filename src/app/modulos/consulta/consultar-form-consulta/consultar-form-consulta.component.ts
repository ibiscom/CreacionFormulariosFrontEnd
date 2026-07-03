import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from "../plantilla-form-captura/plantilla-form-captura.component";
import { ActivatedRoute } from '@angular/router';
import { PlantillaFormConsultaComponent } from '../plantilla-form-consulta/plantilla-form-consulta.component';

@Component({
  selector: 'frm-consultar-form-consulta',
  imports: [PlantillaFormConsultaComponent],
  templateUrl: './consultar-form-consulta.component.html',
  styleUrl: './consultar-form-consulta.component.scss',
})
export class ConsultarFormConsultaComponent {
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
