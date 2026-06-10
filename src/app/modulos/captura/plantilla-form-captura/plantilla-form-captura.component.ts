import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PlantillaFormCapturaService } from './plantilla-form-captura.service';
import { Constants } from '../../../utilidades/constants';
import { MessageUtil } from '../../../utilidades/message.util';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { VisorComponent } from './visor/visor.component';

@Component({
  selector: 'frm-plantilla-form-captura',
  imports: [MatCardModule, RouterModule, VisorComponent],
  templateUrl: './plantilla-form-captura.component.html',
  styleUrl: './plantilla-form-captura.component.scss',
})
export class PlantillaFormCapturaComponent {

  public mensaje: string = '';
  public formulario?: FormularioJSONEntity;
  @Input() public id?: string;
  @Input() public modo?: string;

  constructor(
    protected plantillaFormCapturaService: PlantillaFormCapturaService,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {}

  public ngOnInit(): void {
    console.debug('Modo recibido:', this.modo);
    if (!this.modo) {
      this.modo = 'ver'; // Valor predeterminado si no se proporciona un modo
      console.debug('Modo no proporcionado, se establece el modo predeterminado:', this.modo);
    }
    this.consultarFormulario();
  }

  public consultarFormulario(): void {
    if (!this.id) {
      console.error('No se proporcionó un ID de formulario.');
      return;
    }

    this.plantillaFormCapturaService.getFormulario(this.id).subscribe({
      next: (response) => {
        this.formulario = this.parseFormularioResponse(this.extractPayload(response));
        console.debug('Formulario cargado:', this.formulario?.titulo);
        console.debug('Secciones', this.formulario?.seccionesFormulario);
      },
      error: (error) => {
        console.error('Error al cargar el formulario:', error);
        this.formulario = undefined;
        this.mensaje = MessageUtil.buildErrorMessageFrmResponse(
          Constants.ERR_VER_FORMULARIO,
          error,
        );
      },
    });
  }

  private extractPayload(response: unknown): unknown {
    if (response && typeof response === 'object' && 'respuesta' in response) {
      return (response as Record<string, unknown>)['respuesta'];
    }

    return response;
  }

  private parseFormularioResponse(payload: unknown): FormularioJSONEntity {
    if (typeof payload === 'string') {
      return JSON.parse(payload) as FormularioJSONEntity;
    }

    if (this.isFormularioPayload(payload)) {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      const nestedPayload =
        (payload as Record<string, unknown>)['formulario'] ??
        (payload as Record<string, unknown>)['data'] ??
        (payload as Record<string, unknown>)['resultado'];

      if (this.isFormularioPayload(nestedPayload)) {
        return nestedPayload;
      }
    }

    throw new TypeError('Respuesta de formulario inválida');
  }

  private isFormularioPayload(payload: unknown): payload is FormularioJSONEntity {
    return !!payload && typeof payload === 'object' && 'seccionesFormulario' in payload;
  }

  public limpiarFormulario() {
   /* if (this.formulario)  {
  
     for (seccionEntry of  this.formulario?.seccionesFormulario | keyvalue: keepOrder; track seccionEntry.key) {
        const seccion = seccionEntry.value;
        for (campoEntry of seccion.campos | keyvalue: keepOrder; track campoEntry.key) {
          const campo = campoEntry.value;
  }}}*/
  }
}
