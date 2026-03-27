import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VerFormularioService } from './ver-formulario.service';
import { Constants } from '../utils/constants';
import { MessageUtil } from '../utils/message.util';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormularioJSONEntity } from '../entities/ver-formulario/formulario-json.entity';

@Component({
  selector: 'frm-ver-formulario',
  imports: [MatCardModule, RouterModule],
  templateUrl: './ver-formulario.component.html',
  styleUrl: './ver-formulario.component.scss',
})
export class VerFormularioComponent {
  public mensaje: string = '';
  public formulario?: FormularioJSONEntity;
  public id: string = '';

  constructor(
    private verFormularioService: VerFormularioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.consultarFormulario();
  }

  public consultarFormulario(): void {
    this.id = this.route.snapshot.paramMap.get('id') || 'Formulario sin ID';
    this.verFormularioService.getFormulario(this.id).subscribe({
      next: (response) => {
        this.formulario = this.parseFormularioResponse(this.extractPayload(response));
        console.log('Formulario cargado:', this.formulario?.titulo);
        console.log('Secciones', this.formulario?.seccionesFormulario);
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
}
